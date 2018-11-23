const fs = require('fs');
const path = require('path');
const fileUrl = './test.1.json'
const file = path.join(__dirname, fileUrl);
let jsonStr = null;

// 写入文件
function writeJSONFile() {
  // 读取json文件并获取数据
  fs.readFile(file, 'utf8', (err, data) => {
    let json = JSON.parse(data);
    let townList = json['features'];
    loopSplitList(townList);
    jsonStr = JSON.stringify(json);
    let edit = new Promise(editMainFile);
    edit.then((result) => {
      console.log(result);
    });
    edit.catch((reason) => {
      console.log(`错误：${reason}`);
    });
  });
}

// 修改主文件
function editMainFile(resolve, reject) {
  fs.writeFile(fileUrl, jsonStr, function (err) {
    if (err) {
      return reject(err);
    }
    resolve('文件已保存');
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

writeJSONFile(fileUrl);