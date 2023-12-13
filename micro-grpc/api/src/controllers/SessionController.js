const { promisify } = require('util');

const UserService = require('../services/users');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const response = await promisify(UserService.loginUser)({
      email,
      password,
    });

    return res.json(response);
  }
}

module.exports = new SessionController();
