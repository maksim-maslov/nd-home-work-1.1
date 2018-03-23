const read = path => {
  return new Promise((done, fail) => {
    const fs = require('fs');
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

const write = (path, data) => {
  return new Promise((done, fail) => {
    const fs = require('fs');
    const conf = {encoding: 'utf8'};
    fs.writeFile(path, data, conf, err => {
      if (err) {
        fail(err);
      } else {
        done(path);
      }
    });
  });
};

module.exports = {
  read,
  write
};
