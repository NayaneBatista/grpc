const UserService = require('../services/users');

module.exports = async (req, res, next) => {
  try {
    const response = await new Promise((resolve, reject) => {
      UserService.authenticate(
        { token: req.headers.authorization },
        (err, response) => {
          if (err || response.error) {
            reject(err || response);
          } else {
            req.userId = response.user.id;
            resolve(response);
          }
        }
      );
    });

    req.userId = response.user.id;

    next();
  } catch (err) {
    return res.status(401).send(err);
  }
};
