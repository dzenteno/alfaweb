<template>
  <div>

    <div class="card m-auto p-0" style="width: 18rem">
      <div class="card-image">
        <figure class="image is-4by3">
          <img
            :src="curso.data.imagen"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-6">{{curso.data.nombre}}</p>
          </div>
        </div>
        <div class="content">
          <p class="has-text-left"><b>Información: </b></p>
          <div class="columns">
            <div class="column m-auto has-text-left is-one-fifth">
              <p><i class="fas fa-chevron-right"></i></p>
              <p><i class="fas fa-chevron-right"></i></p>
              <p><i class="fas fa-chevron-right"></i></p>
              <p><i class="fas fa-chevron-right"></i></p>
            </div>
            <div class="column has-text-left is-size-7">
              <p><b>Costo:</b> ${{curso.data.costo}} <br/>
              <b>Duración:</b> {{curso.data.duracion}}</p>
              <p><b>Cupos:</b> {{curso.data.cupos}} <br/>
              <b>Completado:</b> {{curso.data.estado}}</p>
              <p><b>Fecha de registro:</b> {{ new Date(curso.data.fecha.seconds * 1000).toLocaleDateString()}} <br/></p>
              <p><b>Descripción:</b> {{ curso.data.descripcion}} <br/></p>
            </div>
          </div>
            
        </div>
      </div> 
    </div>

  </div>
</template>

<script>
export default {
  props: ["curso"],
};
</script>
