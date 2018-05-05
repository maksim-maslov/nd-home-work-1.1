const fs = require('fs');

module.exports = (path, callback) => {
  
  let err = null;
  let info = {};

  try {
  	
    fs.stat(path, (err, stats) => {

      if (err) {
        callback(err);
        return;
      }

      if (stats.isFile()) {
        read(path)
          .then(content => {
            info.path = path;
            info.type = 'file';
            info.childs = 'undefined';
            info.content = content;
            callback(err, info);
          })
          .catch(err => {
            callback(err);
            return;
          });
      }

      if (stats.isDirectory()) {
        fs.readdir(path, (err, files) => {
          
          if (err) {
            callback(err);
            return;
          } 

          info.path = path;
          info.type = 'directory';
          info.content = 'undefined';
          info.childs = files;
          callback(err, info);
          
        });
      }      

    });

  } catch(e) {}

};

const read = path => {
  return new Promise((done, fail) => {
    const conf = {encoding: 'utf8'};
    fs.readFile(path, conf, (err, content) => {
      if (err) {
        fail(err);
      } else {
        done(content);
      }
    });
  });
};
