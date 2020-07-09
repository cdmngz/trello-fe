<template>
  <div class="container">
    <!-- Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="px-8">
        <v-card-title>{{dialogForm.form}}</v-card-title>
        <v-text-field @keyup.enter="save(dialogForm.case)" :label="dialogForm.label1" outlined v-model="dialogForm.title"></v-text-field>  
        <v-text-field @keyup.enter="save(dialogForm.case)" v-if="dialogForm.description" :label="dialogForm.label2" outlined v-model="dialogForm.description"></v-text-field>  
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog=false">Cancelar</v-btn>
          <v-btn color="success" text @click="save(dialogForm.case)">Guardar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Mensaje si no tiene Listas -->
    <v-card v-if="arregloFinal.length===0" class="pa-6 mt-12 grey darken-3">
      <v-card-title class="white--text">Bienvenido</v-card-title>
      <v-card-text class="white--text">Aún no tienes listas.</v-card-text>
      <v-btn class="grey darken-4" dark block @click="[dialog=true, dialogForm = Object.assign({}, agregarLista)]">Agregar una lista</v-btn>
    </v-card>
    <!-- Todo el row -->
    <v-row class="pa-4">
      <v-col cols="4" v-for="(lista, i) of arregloFinal" :key="i">
        <v-card class="pa-4 grey darken-3" dark width="320">
          <v-row>
            <v-spacer></v-spacer>
            <v-btn @click="mostrarTareas = !mostrarTareas" icon small color="grey">
              <v-icon small>mdi-history</v-icon>
            </v-btn>
            <v-btn icon small color="purple" @click="[dialog = true, dialogForm = Object.assign({}, { case: 11, id: lista.id, title: lista.title, description: lista.description})]">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon small color="error" @click="[dialogForm = Object.assign({}, { case: 19, id: lista.id }), save(dialogForm.case)]">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </v-row>
          <v-card-title>
            {{lista.title}}
          </v-card-title>
        <v-card-text>{{lista.description}}</v-card-text>
        <!-- Tareas -->
        <v-card
          v-for="(tarea, j) of lista.tareas"
          :key="j"
          :class="tarea.status===1 ? 'grey darken-2 my-4' : 'grey darken-4 my-4'"
          v-show="tarea.status===1 || mostrarTareas===true"
          >
          <v-card-title class="body-2">
              {{tarea.title}}
          <v-spacer></v-spacer>
            <v-btn v-if="tarea.status===0" icon small color="grey">
              <v-icon small @click="[dialogForm = Object.assign({}, { case: 28, id: tarea.id }), save(dialogForm.case)]">mdi-history</v-icon>
            </v-btn>
            <v-btn v-if="tarea.status===1" icon small color="purple">
              <v-icon small @click="[dialog = true, dialogForm = Object.assign({}, { case: 21, id: tarea.id, title: tarea.title})]">mdi-pencil</v-icon>
            </v-btn>
            <v-btn v-if="tarea.status===1" icon small color="error">
              <v-icon small @click="[dialogForm = Object.assign({}, { case: 29, id: tarea.id }), save(dialogForm.case)]">mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
        </v-card>
        <v-btn
          block
          text
          color="primary"
          @click="[dialog=true, agregarTarea.id_padre = lista.id ,dialogForm = Object.assign({}, agregarTarea)]"
          ><v-icon>mdi-plus</v-icon></v-btn>
      
      </v-card>

      </v-col>
      <v-btn
        color="primary"
        @click="[dialog=true, dialogForm = Object.assign({}, agregarLista)]"
        fab
        large
        dark
        fixed
        bottom
        right
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data: () => ({
    mostrarTareas: false,
    arrayListas: [],
    arregloFinal: [],
    dialog: false,
    dialogForm: {},
    agregarLista: {
      case: 10,
      form: 'Agregar Lista',
      label1: 'Título de la nueva lista',
      title: '',
      label2: 'Añadir descripción',
      description: ''
    },
    agregarTarea: {
      case: 20,
      form: 'Agregar Tarea',
      label1: 'Título de la nueva tarea',
      title: '',
      id_padre: ''
    }
  }),
  computed: {
    ...mapState(['token']),
  },
  mounted() {
    this.generarArregloVista()
  },
  methods: {
    async obtenerListas() {
      await axios.get('/listas', {
        headers: {
          authorization: `Bearer ${this.token}`
        }
      })
        .then(res => {
          this.arrayListas = res.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    async generarArregloVista() {
      this.arregloFinal = []
      await this.obtenerListas()
      if(this.arrayListas.length > 0) {
        this.arrayListas.forEach(element => {
          this.obtenerTareas(element.id).then(res => {
            this.arregloFinal.push({
                id: element.id,
                title: element.title,
                description: element.description,
                tareas: res
              })
          })
        })
      }
    },
    async obtenerTareas(value) {
      let veamos = []
      await axios.get(`/tareas/${value}`)
        .then(res => veamos = res.data)
        .catch(error => console.log(error))
      return veamos
    },
    async save(key) {
      let body = {}
      switch (key) {
        case 10:
          body = {
            "title": this.dialogForm.title,
            "description": this.dialogForm.description
          }
          await axios.post('/listas', body, { headers: { authorization: `Bearer ${this.token}`}})
            .then(res => {
              console.log(res.data)
              this.dialog = false
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 11:
          body = {
            "title": this.dialogForm.title,
            "description": this.dialogForm.description
          }
          await axios.patch(`/listas/editar/${this.dialogForm.id}`, body, { headers: { authorization: `Bearer ${this.token}`}})
            .then(res => {
              console.log(res.data)
              this.dialog = false
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 19:
          await axios.patch(`/listas/eliminar/${this.dialogForm.id}`, { headers: { authorization: `Bearer ${this.token}`}})
            .then(res => {
              console.log(res.data)
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 20:
          body = {
            "title": this.dialogForm.title
          }
          await axios.post(`/tareas/${this.dialogForm.id_padre}`, body)
            .then(res => {
              console.log(res.data)
              this.dialog = false
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 21:
          body = {
            "title": this.dialogForm.title
          }
          await axios.patch(`/tareas/editar/${this.dialogForm.id}`, body)
            .then(res => {
              console.log(res.data)
              this.dialog = false
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 28:
          await axios.patch(`/tareas/devolver/${this.dialogForm.id}`)
            .then(res => {
              console.log(res.data)
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
        case 29:
          await axios.patch(`/tareas/eliminar/${this.dialogForm.id}`)
            .then(res => {
              console.log(res.data)
              this.generarArregloVista()
            })
            .catch(error => console.log(error))
          break;
      }
    }
  }
}
</script>

<style>

</style>