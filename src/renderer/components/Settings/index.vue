<template>
  <div class="mainGrid">
    <template v-if="stage == 1">
      <b-field label="Password">
          <b-input v-model="password"></b-input>
      </b-field>
      <el-button @click="login()" type="primary" plain>Ingresar</el-button>
    </template>
    <template v-if="stage == 2">
      <b-field label="Direccion de la base de datos">
          <b-input v-model="src"></b-input>
      </b-field>
      <el-button @click="saveSrc()" type="primary" plain>Guardar</el-button>
    </template>
    <template v-if="stage == 3">
      success! route: {{src}}
    </template>
  </div>
</template>

<script>
import { settings as db } from "../../store/backendish/datastore.js";
export default {
  name: "settings-page",
  methods: {
    login() {
      if (this.password == "123456") {
        this.stage = 2;
      }
    },
    saveSrc() {
      db.insert({ _id: 1, src: this.src }, (err, doc) => {
        if (err) throw err;
        this.stage = 3;
      });
    }
  },
  data: () => ({
    password: null,
    src: null,
    stage: 1
  })
};
</script>

<style lang="scss" scoped>
</style>