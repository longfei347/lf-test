# -*- coding: utf-8 -*-

import configparser
import json
import os
import sys
import time
from datetime import datetime

import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By

import log_util
from email_util import AutoEmail
from sms_notify import send_sms_local
from win_notify import send_notifycation

cs_username = ''
cs_password = ''
email_to = ''
notify_mobile = ''
holiday_ary = ''

base_dir = ''
chrome_driver_path = ''


def init():
    config = configparser.ConfigParser()
    global base_dir
    if getattr(sys, 'frozen', False):
        base_dir = os.path.dirname(sys.executable)
    else:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    config.read(os.path.join(base_dir, 'config.ini'))

    global cs_username, cs_password, email_to, notify_mobile, holiday_ary, chrome_driver_path
    cs_username = config.get('common', 'cs_username')
    cs_password = config.get('common', 'cs_password')
    email_to = config.get('common', 'email_to').split(',')
    notify_mobile = config.get('common', 'notify_mobile')
    holiday_ary = config.get('common', 'holiday').split(',')
    chrome_driver_path = config.get('common', 'chrome_driver_path')

    log_util.info(
        '初始化完成, cs_username={}, '
        'notify_mobile={},'
        ' email_to={}, '
        'holiday_ary={}, '
        'chrome_driver_path={}'.format(cs_username,
                                       notify_mobile,
                                       email_to,
                                       holiday_ary,
                                       chrome_driver_path))


def login_and_get_token():
    # 创建一个 Chrome 浏览器实例
    options = webdriver.ChromeOptions()

    options.add_argument("--headless")  # 隐藏浏览器
    options.add_experimental_option('detach', True)

    driver_path = os.path.join(base_dir, 'chromedriver.exe')
    print(driver_path)

    driver = webdriver.Chrome(options=options, service=Service(chrome_driver_path))
    # 打开网站
    driver.get("https://ics.chinasoftinc.com/SignOnServlet")

    # 输入内容
    print('cs_username >>>' + cs_username)
    driver.find_element(By.NAME, "userName").send_keys(cs_username)
    password_input = driver.find_element(By.XPATH, '//*[@id="password"]')

    driver.find_element(By.XPATH, '//*[@id="password"]').click()
    time.sleep(0.5)  # 延迟等待元素加载
    driver.find_element(By.XPATH, '//*[@id="password"]').send_keys(cs_password)

    # 点击登录
    button = driver.find_element(By.CLASS_NAME, "button")
    button.click()

    # 获取响应内容
    # response = driver.page_source

    # 打印响应内容
    # log_util.info(response)

    time.sleep(3)
    # 个人考勤
    driver.find_element(By.XPATH, '//*[@id="app"]/div/div[2]/div[2]/a[4]').click()
    time.sleep(10)

    # 执行JavaScript代码，获取localstorage
    driver.get('https://yihr.chinasoftinc.com:18010/#/personal/index')
    user_token = driver.execute_script("return window.localStorage.getItem('UserToken');")
    # 输出localstorage
    log_util.info('UserToken >> ' + user_token)
    if not user_token:
        log_util.error('获取token 失败')
    else:
        log_util.info("获取token 成功, 即将查询打卡数据")
    return user_token


def query_dot_info(token):
    items = []
    if not token:
        return

    session = requests.session()
    headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "token": token,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }

    proxy = {
        "http": "http://proxy.huawei.com:8080",
        "https": "http://proxy.huawei.com:8080"
    }
    dt = time.strftime("%Y-%m")
    response = session.post(
        'https://yihr.chinasoftinc.com:18010/ehr_saas/web/icssAttEmpDetail/getLocSetDataByPage.empweb',
        headers=headers,
        data={
            'pageIndex': '1',
            'pageSize': '100',
            'search': '{"dt": ' + dt + '}'
        },
        proxies=proxy,
        verify=False,
        timeout=10)

    log_util.info(response)
    if response.status_code == 200:
        log_util.info('查询打点数据成功, result: {}'.format(response.text))
        items = json.loads(response.text)['result']['data']['page']['items']
    else:
        log_util.error('查询打点数据失败')
    log_util.info('result:' + response.text)  # Token不能为空

    return items


def is_holiday(current_date=None):
    if not current_date:
        current_date = json.dumps(datetime.now().date().strftime('%Y-%m-%d'))[1:11]

    return current_date in holiday_ary


def is_not_dot_today(items):
    if not items:
        log_util.info('查询打卡数据为空')
        return
    is_not_check = False
    current_date = str(datetime.now().date())
    log_util.info('currentDate >>>' + current_date)
    checktime_am_end = current_date + ' 09:00:00'
    checktime_pm_start = current_date + ' 18:00:00'

    checktime_am = next((item['checktime'] for item in items if item['dt'] == current_date and item['type'] == '1'),
                        '')

    log_util.info('checktime_am >>>' + checktime_am)

    checktime_pm = next((item['checktime'] for item in items if item['dt'] == current_date and item['type'] == '2'),
                        '')
    log_util.info('checktime_pm >>>' + checktime_pm)
    if datetime.now() <= datetime.strptime(checktime_am_end, '%Y-%m-%d %H:%M:%S') and not checktime_am:
        log_util.info('上班没打卡')
        is_not_check = True
        # 当前时间18:00 以后, 并且没有打下班卡或者 下班卡时间 < 下班时间(上班打2次卡，第二次就是下班卡)
    if datetime.now() >= datetime.strptime(checktime_pm_start, '%Y-%m-%d %H:%M:%S') and (
            not checktime_pm or datetime.strptime(checktime_pm, '%Y-%m-%d %H:%M:%S') < datetime.strptime(
        checktime_pm_start, '%Y-%m-%d %H:%M:%S')):
        log_util.info('下班没打卡')
        is_not_check = True

    return is_not_check


def win_notify():
    send_notifycation(content='当前未查询到打卡记录，数据可能存在延时，如已打卡请忽略。', title='未打卡提醒')


def send_mail():
    email = AutoEmail()
    email.add_text('当前未查询到打卡记录，数据可能存在延时，如已打卡请忽略。')
    email.send_mail()


def send_sms():
    send_sms_result = send_sms_local(notify_mobile)
    log_util.info('sms 发送结果{}'.format(send_sms_result))


def execute():
    if is_holiday():
        return
    init()
    token = login_and_get_token()
    dot_info = query_dot_info(token)
    not_dot = is_not_dot_today(dot_info)
    if not_dot:
        win_notify()
        send_mail()
        send_sms()


if __name__ == '__main__':
    log_util.info('main method started')
    execute()
