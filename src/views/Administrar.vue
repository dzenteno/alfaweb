<template>
  <div>
    <h1 class="title is-2 my-5">Administración</h1>

    <!-- Modal -->
    <b-modal v-model="isAddModalActive" id="modal-add">
      <div class="card m-auto" style="width: 30rem">
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-3">Agregando curso</p>
            </div>
          </div>
          <div class="content has-text-left m-auto" id="modal-content">
            <b-field>
              <b-input v-model="agregarForm.nombre" placeholder="Nombre del curso" size="is-small"></b-input>
            </b-field>
            <b-field>
              <b-input v-model="agregarForm.imagen" placeholder="URL de la imagen" size="is-small" ></b-input>
            </b-field>
            <b-field>
              <b-input type="number" v-model="agregarForm.cupos" placeholder="Cupos del curso" size="is-small"></b-input>
            </b-field>
            <b-field>
              <b-input v-model="agregarForm.inscritos" placeholder="Inscritos en el curso" size="is-small" type="number" ></b-input>
            </b-field>
            <b-field>
              <b-input v-model="agregarForm.duracion" placeholder="Duración del curso" size="is-small" ></b-input>
            </b-field>
            <b-field>
              <b-input type="number" v-model="agregarForm.costo" placeholder="Costo del curso" size="is-small" ></b-input>
            </b-field>
            <b-field>
              <b-input v-model="agregarForm.codigo" placeholder="Código del curso" size="is-small" ></b-input>
            </b-field>
            <b-field label="Descripción del curso">
              <b-input v-model="agregarForm.descripcion" maxlength="200" type="textarea" ></b-input>
            </b-field>
            <div class="modal-btns has-text-centered">
              <b-button type="is-success" @click="agregar(agregarForm)">Agregar</b-button>
              <b-button type="is-light" class="ml-3" @click="limpiar">Limpiar campos</b-button>
              <b-button type="is-light" class="ml-3" @click="btnCancelar">Cancelar</b-button>
            </div>
          </div>
        </div>
      </div>
    </b-modal>

    <!-- Table -->
    <b-table :data="cursos" class="m-auto has-text-left is-bordered tabla-cursos is-size-7">
      <b-table-column label="Curso" field="data.nombre" v-slot="props">{{props.row.data.nombre}}</b-table-column>
      <b-table-column centered label="Cupos" field="data.cupos" v-slot="props">{{props.row.data.cupos}}</b-table-column>
      <b-table-column centered label="Inscritos" field="data.inscritos" v-slot="props">{{props.row.data.inscritos}}</b-table-column>
      <b-table-column label="Duración" field="data.duracion" v-slot="props">{{props.row.data.duracion}}</b-table-column>
      <b-table-column label="Costo" field="data.costo" v-slot="props"><span class="button is-info is-size-7 p-2">${{props.row.data.costo}}</span></b-table-column>
      <b-table-column centered label="Estado (teminado)" field="data.estado" v-slot="props"><span v-if="props.row.data.estado" class="p-2 button is-success is-size-7">Si</span><span v-else class=" p-2 is-size-7 button is-dark">No</span></b-table-column>
      <b-table-column centered label="Fecha" field="data.fecha" v-slot="props" ><span class="button is-info is-size-7 p-2"> {{ new Date(props.row.data.fecha.seconds * 1000).toLocaleDateString() }}</span></b-table-column>
      <b-table-column centered label="Acciones" class="has-text-left" field="data.fecha" v-slot="props"><b-button class="button is-light m-0" size="is-small" @click="irEditar(props.row)"><i class="fas fa-pencil-alt" style="color: gray"></i> Editar</b-button>
        <b-button class="button mx-1" type="is-danger" size="is-small" @click="eliminar(props.row.id)"><i class="fas fa-trash-alt" style="color: white" ></i> Eliminar</b-button>
      </b-table-column>
    </b-table>
    <div class="has-text-center my-4">
      <b-button type="button is-success is-outlined" @click="isAddModalActive = true">Agregar curso</b-button>
    </div>

    <!-- Información -->
    <div class="columns info-section m-auto">
      <div class="column">
          <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad de alumnos permitidos: <strong>190</strong></p>
            </div>
          </article>
        </div>
      <div class="column">
        <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad total de alumnos inscritos: <strong>{{cantidadInscritos}}</strong></p>
            </div>
          </article></div>
      <div class="column">
        <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad total de cupos restantes: <strong>{{190 - cantidadInscritos}}</strong></p>
            </div>
          </article>
      </div>
    </div>
    <div class="columns info-section m-auto">
      <div class="column">
        <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad total de cursos terminados: <strong>{{cursos.length - cursosEstadoActivo.length}}</strong></p>
            </div>
          </article>
      </div>
      <div class="column">
        <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad total de cursos activos: <strong>{{cursosEstadoActivo.length}}</strong></p>
            </div>
          </article>
      </div>
      <div class="column">
        <article class="message is-dark">
            <div class="message-body">
              <p class="is-size-7">Cantidad total de cursos: <strong> {{cursos.length}} </strong></p>
            </div>
          </article>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"; 


export default {
  data() {
    return {
      isAddModalActive: false,
      agregarForm: {
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
  methods: {
    ...mapState(['cursos']),
    ...mapActions(["agregarCurso", 'eliminarCurso']),
    agregar(curso) {
      if( this.agregarForm.nombre == "" || this.agregarForm.imagen == "" || this.agregarForm.cupos == "" ||
      this.agregarForm.inscritos == "" || this.agregarForm.duracion == "" || this.agregarForm.costo == "" ||
      this.agregarForm.codigo == "" || this.agregarForm.descripcion == "" || this.agregarForm.fecha == ""){
        this.$buefy.toast.open({
          duration: 2000,
          message: "Debe llenar todos los campos",
          position: 'is-bottom',
          type: "is-danger",
        });
      } else{
        this.agregarCurso(curso);
        this.agregarForm.nombre = "";
        this.agregarForm.imagen = "";
        this.agregarForm.cupos = "";
        this.agregarForm.inscritos = "";
        this.agregarForm.duracion = "";
        this.agregarForm.costo = "";
        this.agregarForm.codigo = "";
        this.agregarForm.descripcion = "";
        this.agregarForm.fecha = new Date();
        this.$buefy.toast.open({
          duration: 2000,
          message: "Curso agregado exitosamente!",
          position: 'is-bottom',
          type: "is-success",
        });
        this.isAddModalActive = false;
      }

    },

    limpiar(){
      this.agregarForm.nombre = "";
      this.agregarForm.imagen = "";
      this.agregarForm.cupos = "";
      this.agregarForm.inscritos = "";
      this.agregarForm.duracion = "";
      this.agregarForm.costo = "";
      this.agregarForm.codigo = "";
      this.agregarForm.descripcion = "";
      this.agregarForm.fecha = "";
    },

    btnCancelar(){
      this.isAddModalActive = false;
    },

    eliminar(cursoID){
      this.$buefy.dialog.confirm({
        message: 'Se eliminará el curso. Desea continuar?', 
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        hasIcon: true,
        icon: 'trash-alt',
        iconPack: 'fa',
        ariaRole: 'alertdialog',
        type: 'is-danger',
        onConfirm: async () =>{
          await this.eliminarCurso(cursoID);
          this.$buefy.toast.open({
            duration:2000,
            message: 'Curso eliminado',
            position: 'is-bottom',
          })
        } 
       })
    },

    irEditar(curso){
      this.$router.push( { name:'editar', params: { curso: curso} });
    },

    formatPrecio(costo){
      return costo.toLocaleString('de-DE');
    },

  },

  computed: {
    ...mapState(["cursos"]),
    ...mapGetters(['cursosEstadoActivo', 'cantidadInscritos']),
  },
};
</script>

<style scoped>
#modal-content {
  width: 25rem;
}
.tabla-cursos{
  width: 64rem;
}
.info-section{
  width: 64rem;
}
</style>