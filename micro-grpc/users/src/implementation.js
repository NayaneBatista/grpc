const User = require('./schema/User');

module.exports = {
  async GetUserById(call, callback) {
    // Consultar banco e retornar
    const { id } = call.request;
    const user = await User.findById(id);

    if (!user) {
      return callback({ error: 'User not found' });
    }

    return callback(null, { user });
  },

  async RegisterUser(call, callback) {
    // Registrar no banco e retornar ID do user
    const { email, username, password } = call.request;
    const user = await User.create({ email, username, password });
    return callback(null, { user });
  },

  async LoginUser(call, callback) {
    // Consultar banco, verificar credenciais e retornar o token ou erro
    const { email, password } = call.request;
    const user = await User.findOne({ email });

    if (!user) {
      return callback({ error: 'User not found' });
    }

    if (!(await user.compareHash(password))) {
      return callback({ error: 'Invalid password' });
    }

    return callback(null, {
      token: User.generateToken(user),
    });
  },
};
