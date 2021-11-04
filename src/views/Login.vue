<template>
  <div>
    <div class="login card m-auto p-0" style="width: 18rem">
      <div class="card-content">
        <div class="m-auto is-flex is-flex-direction-column">
          <b-field>
            <b-input placeholder="Correo electrónico" v-model="formLogIn.user"></b-input>
          </b-field>
          <b-field>
            <b-input type="password" placeholder="Contraseña" v-model="formLogIn.password"></b-input>
          </b-field>
          <b-button class="is-success" @click="login(formLogIn.user)">Ingresar</b-button>
          <a class="my-5" @click="modalRegistrar = true"> Registrarse </a>
        </div>
        <div class="media">
          <div class="media-content"></div>
        </div>
        <div class="content">
          <h1>AlfaWeb ⚡</h1>
        </div>
      </div>
    </div>

    <!-- Modal registrar -->
    <b-modal v-model="modalRegistrar" id="modal-add">
      <div class="card m-auto p-0" style="width: 18rem">
      <div class="card-content">
        <div class="m-auto is-flex is-flex-direction-column">
          <h1 class="has-text-weight-bold is-size-4 mb-4">Regístrate</h1>
          <b-field>
            <b-input placeholder="Correo electrónico" v-model="formRegistro.user"></b-input>
          </b-field>
          <b-field>
            <b-input type="password" placeholder="Contraseña" v-model="formRegistro.password"></b-input>
          </b-field>
          <b-button class="is-success" @click="registrar">Registrar cuenta</b-button>
        </div>
        <div class="media">
          <div class="media-content"></div>
        </div>
        <div class="content">
        </div>
      </div>
    </div>
    </b-modal>


  </div>
</template>

<script>
import firebase from 'firebase/compat/app';

export default {
    data(){
        return{
            modalRegistrar: false,
            formLogIn: {
                user: '',
                password: ''
            },
            formRegistro: {
              user: '',
              password: ''
            },
        }
    },
    methods:{
        login(){
            firebase.auth().signInWithEmailAndPassword(this.formLogIn.user, this.formLogIn.password)
                .then(
                    () => {
                        this.$router.push({name: "Home"});
                    },
                    () => {
                        this.formLogIn.password = '';
                        this.formLogIn.user = '';
                        this.$buefy.toast.open({
                            duration: 2000,
                            message: "El email o contraseña que ingresaste son incorrectas",
                            position: 'is-bottom',
                            type: "is-danger",
                        });
                    }
                );
        },

        registrar(){
          firebase.auth().createUserWithEmailAndPassword(this.formRegistro.user, this.formRegistro.password)
            .then(
              (userCredential)=>{
                let user = userCredential.user.email;
                this.modalRegistrar = false;
                this.$router.push({name: "Home"});
                this.$buefy.toast.open({
                  duration: 2000,
                  message: `Cuenta creada con éxito ${user}`,
                  position: 'is-bottom',
                  type: "is-success",
                });
              }
            );
        },
    },
};
</script>

<style scoped>
.login {
  width: 20rem;
  transform: translateY(10rem);
}
</style>