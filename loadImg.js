const download = require('download');
const axios = require('axios');

let headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Safari/537.36'
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};

function sleep(time) {
  return new Promise(reslove => setTimeout(reslove, time));
}

async function load(skip = 0) {
  const data = await axios.get('http://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000000/vertical', {
      headers,
      params: {
        limit: 30, // 每页固定返回30条
        skip: skip,
        first: 0,
        order: 'hot',
      },
    }).then(res => {

      return res.data.res.vertical;
    })
    .catch(err => {
      console.log(err);
    });
  console.log('d:',data);
  await downloadFile(data);
  await sleep(3000);
  if (skip < 1000) {
    load(skip + 30);
  } else {
    console.log('下载完成');
  }
}

async function downloadFile(data) {
  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    // Path at which image will get downloaded
    const filePath = `${__dirname}/美女`;

    await download(item.wp, filePath, {
      filename: item.id + '.jpeg',
      headers,
    }).then(() => {
      console.log(`Download ${item.id} Completed`);
      return;
    });
  }
}

load();
