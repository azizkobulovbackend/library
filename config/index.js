const config = {
    port: process.env.PORT || 5000,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_SECRET_KEY_EXPIRATION
  };
  
  module.exports = config;
  