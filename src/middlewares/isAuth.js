const {checkToken} = require("../utils/jwt");

const isAuth = (req, res, next) => {
  if (!req.headers.token) return res.json({message: "Please register"});

  checkToken(req.headers.token, (err, data) => {
    if (err) return res.json({message:"Please login"});

    req.user = data;
    next();
  });
};

module.exports = isAuth;
