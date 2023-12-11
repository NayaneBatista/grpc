export default {
  GetUserById(call, callback) {
    // Consultar banco e retornar
    const { id } = call.request;
  },

  RegisterUser(call, callback) {
    // Registrar no banco e retornar ID do user
    const { email, username, password } = call.request;
  },

  LoginUser(call, callback) {
    // Consultar banco, verificar credenciais e retornar o token ou erro
    const { email, password } = call.request;
  },
};

// abre o terminal com /sdtrab/micro-grpc/users
