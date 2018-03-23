module.exports = (path, callback) => {

  const fs = require('fs');
  let err;
  let info = {path: path};

  try {
  	
    fs.stat(path, (err, stats) => {

      if (err) {
        throw err;
      }

      if (stats.isFile()) {
        info.type = 'file';
        info.childs = 'undefined';
        const conf = {encoding: 'utf8'};
        info.content = fs.readFileSync(path, conf);
        callback(err, info);
      }

      if (stats.isDirectory()) {
        fs.readdir(path, (err, files) => {
          
          if (err) {
            throw err;
          } else {
            info.type = 'directory';
            info.content = 'undefined';
            info.childs = files;
          }

          callback(err, info);
          
        });
      }      

    });

  } catch(e) {
    err = e;
    info = 'undefined';
    callback(err, info);
  }

};
