<template>
  <div>

    <h1 class="title is-4 my-4">Editando el curso: {{ editarForm.nombre }}</h1>
    <div id="edit-form">
      <b-field  label="Nombre" horizontal>
        <b-input v-model="editarForm.nombre" placeholder="Nombre del curso" size="is-small" ></b-input>
      </b-field>
      <b-field label="Imagen" horizontal>
        <b-input v-model="editarForm.imagen" placeholder="URL de la imagen" size="is-small" ></b-input>
      </b-field>
      <b-field label="Cupos" horizontal>
        <b-input type="number" v-model="editarForm.cupos" placeholder="Cupos del curso" size="is-small" ></b-input>
      </b-field>
      <b-field label="Inscritos" horizontal>
        <b-input v-model="editarForm.inscritos" placeholder="Inscritos en el curso" size="is-small" type="number"></b-input>
      </b-field>
      <b-field label="Duración" horizontal>
        <b-input v-model="editarForm.duracion" placeholder="Duración del curso" size="is-small"></b-input>
      </b-field>
      <b-field label="Costo" horizontal>
        <b-input type="number" v-model="editarForm.costo" placeholder="Costo del curso" size="is-small" ></b-input>
      </b-field>
      <b-field label="Código" horizontal>
        <b-input v-model="editarForm.codigo" placeholder="Código del curso" size="is-small" ></b-input>
      </b-field>
      <b-field label="Descripción del curso" horizontal>
        <b-input v-model="editarForm.descripcion" maxlength="200" type="textarea" ></b-input>
      </b-field>
      <div class=" is-flex is-justify-content-space-around is-align-content-center">
        <b-field label="Fecha" horizontal>
          <b-datepicker position="is-top-right" icon="calendar-today" size="is-small" v-model="editarForm.fecha"></b-datepicker>
        </b-field >
        <b-field class="has-text-left">
        <b-switch v-model="editarForm.estado" type="is-info">
          <span>Terminado: </span> <span v-if="editarForm.estado">Si</span>
          <span v-else>No</span>
        </b-switch>
        </b-field>
      </div>  
      <div class="edit-btns my-4">
        <b-button type="is-success" class="mx-2" @click="editar">Editar</b-button>
        <b-button type="is-light" class="mx-2" @click="limpiar">Limpiar campos</b-button>
        <b-button type="is-light" class="mx-2" @click="regresar">Regresar</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: ["curso"],
  data() {
    return {
      editarForm: {
        nombre: "",
        imagen: "",
        cupos: "",
        inscritos: "",
        duracion: "",
        costo: "",
        codigo: "",
        descripcion: "",
        fecha: new Date(),
        estado: false,
      },
    };
  },

  mounted() {
    this.editarForm = this.curso.data;
    this.editarForm.fecha = new Date(this.editarForm.fecha.seconds * 1000);
  },

  methods: {
    ...mapActions(['editarCurso']),
    regresar() {
      this.$router.push({ name: "administrar" });
    },

    editar(){
      const curso = this.editarForm;
      const cursoID = this.curso.id;
      this.$buefy.dialog.confirm({
        message: 'Se editará el curso. Desea continuar?',
        confirmText: 'Si',
        cancelText: 'Cancelar',
        hasIcon: true,
        icon: 'pencil-alt',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        type: 'is-success',
        onConfirm: async () =>{
          if( this.editarForm.nombre == "" || this.editarForm.imagen == "" || this.editarForm.cupos == "" ||
          this.editarForm.inscritos == "" || this.editarForm.duracion == "" || this.editarForm.costo == "" ||
          this.editarForm.codigo == "" || this.editarForm.descripcion == "" || this.editarForm.fecha == ""){
            this.$buefy.toast.open({
              duration: 2000,
              message: "Debe llenar todos los campos",
              position: 'is-bottom',
              type: "is-danger",
            });
          }
          else{
            await this.editarCurso({ curso , cursoID });
            this.$router.push({ name: "administrar" });
            this.$buefy.toast.open({
              duration:2000,
              message: 'Curso actualizado',
              position: 'is-bottom',
            });
          }
        } 
      })
    },

    limpiar(){
      this.editarForm.nombre = "";
      this.editarForm.imagen = "";
      this.editarForm.cupos = "";
      this.editarForm.inscritos = "";
      this.editarForm.duracion = "";
      this.editarForm.costo = "";
      this.editarForm.codigo = "";
      this.editarForm.descripcion = "";
      this.editarForm.fecha = new Date();
    }
  },
};
</script>

<style scoped>
#edit-form {
  width: 40rem;
  margin: auto;
}
</style>