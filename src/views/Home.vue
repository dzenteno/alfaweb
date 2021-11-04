<template>
  <div class="home">

    <h1 class="title is-2 my-6">Lista de cursos</h1>
    <div class="columns is-flex-wrap-wrap m-auto p-0 lista-cursos">
      <div class="column is-4 px-0" v-for="(curso, i) in cursosDisponibles" :key="i">
        <cards :curso="curso"/>
      </div>
    </div>

    
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Cards from '../components/Cards.vue';

export default {
  data() {
    return {}
  },
  name: "Home",
  components: {Cards},

  computed: {
    ...mapGetters(["cursosDisponibles"]),
  },
};
</script>

<style scoped>
.lista-cursos{
  width: 60rem;
}
</style>
