// Serviço de autenticação para manipular o token JWT
export const AuthService = {
  getToken() {
    return localStorage.getItem('jwt');
  },
  setToken(token) {
    localStorage.setItem('jwt', token);
  },
  removeToken() {
    localStorage.removeItem('jwt');
  },
  isAuthenticated() {
    return !!localStorage.getItem('jwt');
  },
};
