const fs = require('fs');
const path = require('path');

// 写入文件
function writeJSONFile(url) {
  let file = path.join(__dirname, url);
  // 读取json文件并获取数据
  fs.readFile(file, 'utf8', (err, data) => {
    let json = JSON.parse(data);
    let townList = json['features'];
    loopSplitList(townList);
    console.log('文件已保存！');
  });
}

// 拆分数据
function loopSplitList(arr) {
  fs.mkdir('./town', {
    recursive: true
  }, (err) => {
    if (err) throw err;
  });
  arr.forEach(item => {
    item['properties']['cp'] = eval(item['properties']['cp']);
    let fileJSON = {
      "type": "FeatureCollection",
      "features": [
        item
      ],
      "UTF8Encoding": true
    }
    fileJSON = JSON.stringify(fileJSON);
    fs.writeFile(`./town/${item['properties']['name']}.json`, fileJSON, (err) => {
      if (err) throw err;
    });
  });
}

writeJSONFile('./guangshan.json');