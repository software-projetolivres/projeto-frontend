<template>
  <div class="row">
    <div class="col-md-6 col-sm-12 offset-md-3">
      <div class="card">
        <div class="card-header">Login</div>
        <div class="card-body">
          <form id="formLogin">
            <div class="md-form">
              <input
                autocomplete="off"
                type="email"
                id="login"
                class="form-control"
                v-model.trim="consumidor.login"
              />
              <label for="login">E-mail</label>
            </div>

            <div class="md-form">
              <input
                autocomplete="off"
                type="password"
                id="senha"
                class="form-control"
                v-model.trim="consumidor.senha"
              />
              <label for="senha">Senha</label>
            </div>
            <div class="pt-3"></div>
            <router-link to="consumidores/cadastro">
                Criar Conta
            </router-link>
            <div class="pt-3"></div>

            <div class="row">
              <div class="col text-right">
                <button type="button" class="btn btn-primary pull-right" @click="logar()">
                  <i class="fa fa-floppy-o"></i> Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Consumidores from "../services/consumidores";

export default {
  data() {
    return {
      consumidor: {
        login: "",
        senha: "",
      },
    };
  },
  methods: {
    logar: function() {
        Consumidores.logar({login: this.consumidor.login, senha: this.consumidor.senha})
          .then(() => {
            this.$toaster.success("Login realizado com sucesso!");
            this.$router.push("/");
          })
          .catch(() => {
            this.$toaster.error("Usuário e/ou senha incorretos");
          });
    },
  },
};
</script>

