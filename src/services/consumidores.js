import { http } from "./config";

export default {
  listar: () => {
    return http.get("api/consumidor");
  },

  buscarPorCpf: (cpf) => {
    return http.get("api/consumidor/" + cpf);
  },

  inserir: (consumidor) => {
    return http.post("api/consumidor", consumidor);
  },

  alterar: (consumidor) => {
    return http.put("api/consumidor", consumidor);
  },

  delete: (cpf) => {
    return http.delete("api/consumidor/" + cpf);
  },

  logar: ({login, senha}) => {
    return new Promise((resolve, reject) => {
      http.post("api/login", {login, senha})
        .then((response) => {
          const { token, roles } = response.data;

          localStorage.setItem('@livres:token', token);
          localStorage.setItem('@livres:user', roles);
          http.defaults.headers.authorization = `Bearer ${token}`;

          resolve(response);
        })
        .catch(error => {
          reject(error);
        })
    })
  }
};
