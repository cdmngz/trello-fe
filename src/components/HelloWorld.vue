<template>
  <v-parallax
    dark
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
    <v-row
      align="center"
      justify="center"
    >
  <v-carousel cycle interval="3000" :show-arrows="false" :hide-delimiter-background="true">
    <v-carousel-item>
      <div class="container d-flex justify-center align-center">
        <h1>Bienvenido</h1>
      </div>      
    </v-carousel-item>
    <v-carousel-item>
      <div class="container d-flex justify-center align-center">
        <h1>Agenda</h1>
      </div>
    </v-carousel-item>
    <v-carousel-item>
      <div class="container d-flex justify-center align-center">
        <h1>Tus tareas</h1>
      </div>
    </v-carousel-item>
  </v-carousel>
    </v-row>
  </v-parallax>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .container {
    position: relative;
    width: 100vw;
    height: 100%;
  }
  .container h1 {
    opacity: .8;
    font-size: 5em;
  }
</style>