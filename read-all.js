module.exports = path => {
  return new Promise((done, fail) => {
    const fs = require('fs');
    fs.readdir(path, (err, files) => {
      if (err) {
        fail(err);
      } else {
        const conf = {encoding: 'utf8'};
        const result = files.map(name => {
          const content = fs.readFileSync(`${path}${name}`, conf);
          return {name, content};
        });        
        done(result);
      }
    });
  });
};
