<template>
  <div>
    <md-dialog md-active class="dialog">
      <md-dialog-title>{{title}}</md-dialog-title>

      <md-content class="content">
        <md-progress-bar
          v-bind:class="{ 'md-accent': color}"
          :md-mode="mode" :md-value="percentage"></md-progress-bar>
      </md-content>

    </md-dialog>
  </div>
</template>

<script>
export default {
  name: "auto-updater",
  data: () => ({
    title: "Buscando actualizaciones...",
    percentage: 0,
    mode: "indeterminate",
    color: true
  }),
  mounted() {
    this.$electron.ipcRenderer.on("updates-reply", (event, res) => {
      switch (res.type) {
        case "downloaded":
          this.color = false;
          this.mode = "indeterminate";
          this.title = "Instalando";
          this.$electron.ipcRenderer.send("installUpdates");
          break;
        case "available":
          console.log(1);
          this.color = false;
          this.mode = "determinate";
          this.title = "Descargando actualizacion";
          break;
        case "progress":
          this.percentage = res.payload.percent;
          break;
        case "not-available":
        case "error":
        default:
          this.color = false;
          this.mode = "determinate";
          this.percentage = 100;
          this.title = "Peach! esta actualizado a la ultima version";
          setTimeout(() => {
            this.$router.replace({ path: "stock" });
          }, 400);
      }
    });
    this.$electron.ipcRenderer.send("checkForUpdates");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
* {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
  .dialog {
    width: 50vw;
    height: 20vh;
    .content {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .md-progress-bar {
        flex: 1;
        height: 30px;
      }
    }
  }
}
</style>