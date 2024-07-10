const config = require("../../config");

const run = (app) => {
  app.listen(config.port, () => {
    console.log(+config.port);
  });
};

module.exports = run;