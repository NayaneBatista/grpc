const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('./schema/User');

module.exports = {
  async GetUserById(call, callback) {
    // Consultar banco e retornar
    const { id } = call.request;
    const user = await User.findById(id);

    if (!user) {
      return callback(null, { error: 'User not found' });
    }

    return callback(null, {
      user: { ...user.toObject(), id: user._id, password: undefined },
    });
  },

  async RegisterUser(call, callback) {
    // Registrar no banco e retornar ID do user
    const { email, username, password } = call.request.user;
    const user = await User.create({ email, username, password });

    return callback(null, { user: { ...user.toObject(), id: user._id } });
  },

  async LoginUser(call, callback) {
    // Consultar banco, verificar credenciais e retornar o token ou erro
    const { email, password } = call.request.user;
    const user = await User.findOne({ email });

    if (!user) {
      return callback(null, { error: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return callback(null, { error: 'Invalid password' });
    }

    return callback(null, {
      token: User.generateToken(user),
    });
  },

  async authenticate(call, callback) {
    const { token: fullToken } = call.request;

    if (!fullToken) {
      callback({ error: 'No token provided' });
    }

    const parts = fullToken.split('');

    if (!parts.length == 2) {
      return callback(null, { error: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return callback(null, { error: 'Token malformatted' });
    }

    try {
      const decoded = await promisify(jwt.verify)(token, 'trab');

      const user = await User.findById(decoded.id);

      return callback(null, { user: { ...user.toObject(), id: user._id } });
    } catch (err) {
      callback(null, { error: 'Token invalid' });
    }
  },
};
