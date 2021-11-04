<template>
  <div>
    <b-navbar type="is-light" class="px-6" centered fixed-top>
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <h1 class="title is-4">AlfaWeb ⚡</h1>
        </b-navbar-item>
      </template>
      <template #start>
        
      </template>
      <template #end>
        <b-navbar-item tag="div">
          <b-navbar-item v-if="user != ''" tag="router-link" :to="{name: 'Home'}"> Cursos </b-navbar-item>
          <b-navbar-item v-if="user != ''" tag="router-link" :to="{name: 'administrar'}"> Administración </b-navbar-item>
          <div class="buttons">
            <h4 v-if="user != ''" class="email-navbar button is-success">{{user}}</h4>
            <a v-if="btnCerrar" class="button is-danger" @click="cerrarSesion">
              <strong>Cerrar sesión</strong>
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template> 

<script>
import firebase from 'firebase/compat/app'

export default {
  data(){
    return{
      user: '',
      btnCerrar: false,
    }
  },

  mounted(){
    firebase.auth().onAuthStateChanged( (user) =>{
      if(user){
        this.btnCerrar = true;
        this.user = user.email;
      }
    });
  },

  methods:{
    cerrarSesion(){
      firebase.auth().signOut()
        .then(
          ()=>{
            this.btnCerrar = false;
            this.user = '';
            this.$router.push({name: 'login'});
          },
          ()=>{
            this.$buefy.toast.open({
              duration: 2000,
              message: 'Error al cerrar sesión',
              position: 'is-bottom',
            })
          }
        );
    },
  }
}

</script>

<style scoped>
.email-navbar{
  text-transform: uppercase;
  margin-right: 1rem;
}
</style>