import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/compat/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: [],
  },
  mutations: {
    setCursos(state, cursos){
      state.cursos = cursos
    },
  },
  actions: {
    agregarCurso(context, curso){
      firebase
        .firestore()
        .collection('cursos')
        .add(curso)
    },

    eliminarCurso(context, cursoID){
      firebase
        .firestore()
        .collection('cursos')
        .doc(cursoID)
        .delete()
    },

    editarCurso(context, { curso, cursoID }){
      firebase
        .firestore()
        .collection('cursos')
        .doc(cursoID)
        .set(curso)
    },
    
    getCursos(context){
      firebase
       .firestore()
       .collection('cursos')
       .onSnapshot( ( snapShot )=>{
          const cursos = [];
          snapShot.forEach( (doc) => {
            cursos.push({ id: doc.id, data: doc.data() });
          });
          context.commit('setCursos', cursos)
       })
    },
  },
  getters:{
    cursosDisponibles(state){
      return state.cursos;
    },

    cursosEstadoActivo(state){
      return state.cursos.filter( curso => curso.data.estado == false );
    },

    cantidadInscritos(state){
      let inscritos = 0;
      state.cursos.forEach(curso => {
        inscritos += parseInt(curso.data.inscritos);
      });
      return inscritos;
    },
  },
})
