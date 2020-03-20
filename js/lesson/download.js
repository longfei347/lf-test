/*this.$axios({
    method: 'get',
    url: row.src,
    responseType: 'blob'  //这个不能少,让response二进制形式,如果你按照网上教程不设置这个将返回值进行BLOB([])进行处理可能会出现解析错误
}).then(response => {
    const href = URL.createObjectURL(response.data); //根据二进制对象创造新的链接
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('download', row.title);
    a.click();
    URL.revokeObjectURL(href);
}*/
//原理和ajax一模一样
function request(url) {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: '<请求参数：json字符串>',
  })
    .then(res => res.blob())
    .then(data => {
      let blobUrl = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.download = '<文件名>';
      a.href = blobUrl;
      a.click();
    });
}
// request('url');
