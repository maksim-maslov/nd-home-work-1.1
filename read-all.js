const fs = require('fs');

module.exports = path => {
  return readDir(path).then(files => Promise.all(files.map((el, index) => getContent(el, index, path))));
};

function readDir(path) {
  return new Promise((done, fail) => {    
    fs.readdir(path, (err, files) => {
      if (err) {
        fail(err);
      } else {
        done(files);
      }
    });
  });
}

function getContent(name, index, path) {  
  return new Promise((done, fail)=>{
    const conf = {encoding: 'utf8'};
    fs.readFile(`${path}${name}`, conf, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done({name, content});
      }
    });
  })
}



