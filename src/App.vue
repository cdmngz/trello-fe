<template>
  <v-app>
    <v-app-bar
      app
      class="grey darken-3"
      :absolute="currentRouteName === 'Home' ? true : false"
      dark
      :text="currentRouteName === 'Home' ? true : false"
    >
      <v-btn text class="d-flex align-center mx-1">
        <v-img
          class="shrink"
          contain
          height="50"
          data="https://www.flaticon.com/authors/freepik"
          title="Thanks www.freepik.com for the logo"
          src="@/assets/logo.svg"
          width="50"
        />
        <span class="ml-3 headline font-weight-medium">Trellou</span>
      </v-btn>

      <v-spacer></v-spacer>

      <div class="text-center" v-if="currentRouteName==='Home'" >
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" text>LogIn</v-btn>
          </template>
          <v-card class="pa-8">
            <v-text-field label="Username" outlined v-model="username"></v-text-field>
            <v-text-field
              :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="eyeIcon = !eyeIcon"
              outlined
              label="Password"
              :type="eyeIcon ? 'text' : 'password'"
              v-model="password"
            ></v-text-field>            
            <v-btn class="grey darken-3" dark block @click="logIn">LogIn</v-btn>
          </v-card>
        </v-menu>
      </div>
      <div class="text-center" v-if="currentRouteName==='Home'" >
        <v-menu offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" text @click="username='', password=''">SignUp</v-btn>
          </template>
          <v-card class="pa-8">
            <v-text-field label="Username" outlined v-model="username"></v-text-field>
            <v-text-field
              :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="eyeIcon = !eyeIcon"
              outlined
              label="Password"
              :type="eyeIcon ? 'text' : 'password'"
              v-model="password"
            ></v-text-field>
            <v-btn class="grey darken-3" dark block @click="signUp">SignUp</v-btn>
          </v-card>
        </v-menu>
      </div>
      <div v-if="currentRouteName==='Dashboard'" class="text-center">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" text><v-icon>mdi-dots-vertical</v-icon></v-btn>
          </template>
          <v-card class="pa-8 grey darken-4">
            <v-btn class="grey darken-3" dark block @click="logOut">LogOut</v-btn>
          </v-card>
        </v-menu>
      </div>

    </v-app-bar>

    <v-content class="grey darken-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import axios from 'axios'


export default {
  name: 'App',
  data: () => ({
    eyeIcon: false,
    username: 'Primero',
    password: '123'
  }),
  computed: {
      ...mapState(['token']),
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    ...mapMutations(['setToken', 'unsetToken']),
    async logIn() {
      const body = {
        "username": this.username,
        "password": this.password
      }
      await axios.post('/login', body)
        .then(res => {
          if(res.status===200) {
            this.setToken(res.data.accessToken)
            this.$router.push({ path: '/dashboard'})
          } else {
            console.log(res.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    async signUp() {
      const body = {
        "username": this.username,
        "password": this.password
      }
      await axios.post('/signup', body)
        .then(res => {
          if(res.status===201) {
            this.setToken(res.data.accessToken)
            this.$router.push({ path: '/dashboard'})
          } else {
            console.log(res.data)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    logOut() {
      this.unsetToken()
      this.$router.go()
    }
  }
};
</script>
