<template>
  <div class="mainFrame">
    <div class="outterFrame">
      <div class="windowButtons">
        <button @click="outterFrameUtils(1)"
          class="md-icon-button">
            <md-icon style="color:black;">
              details
            </md-icon>
        </button>
          <button @click="outterFrameUtils(3)"
            class="md-icon-button">
              <md-icon style="color:black;">
                close
              </md-icon>
          </button>
      </div>
    </div>
    <div class="appFrame">
      <div class="appMenuBar">
        <md-button
          @click="toggleMenu"
          class="md-icon-button">
            <md-icon style="color:white;" >
              menu
            </md-icon>
        </md-button>
      </div>
      <div class="appView">
        <div v-show="showMenu" class="appMenu">
          <router-link to="/stock" class="route">
            Stock
          </router-link>
          <router-link to="/egreso" class="route">
            Egreso
          </router-link>
          <router-link to="/ingreso" class="route">
            Ingreso
          </router-link>
        </div>
        <div class="appContent">
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app-frame',
    methods: {
      toggleMenu(){
        this.showMenu = !this.showMenu
      },
      outterFrameUtils(type){
        switch(type){
          case 1:
            this.$electron.remote.BrowserWindow.getFocusedWindow().minimize()
            break;
          case 3:
          this.$electron.remote.BrowserWindow.getFocusedWindow().close();
            break;
        }
      }
    },
    data: () => ({
      showMenu: false
    })
  }
</script>

<style lang="scss" scoped>
.mainFrame {
  background-color: #fbfbfb;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 0px 15px 12px 15px;
  overflow: hidden;
  .outterFrame {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
    button {
      padding: 0;
      margin: 0;
      font-weight: 900;
      background: transparent;
      text-decoration: none;
      border: none;
      -webkit-app-region: no-drag;
      transition: 0ms !important;
      cursor: pointer;
      :hover {
        color: #e5bf8d !important;
      }
    }
  }
  .appFrame {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: 7px;
    background-color: #d8dfe2;
    overflow: hidden;
    .appMenuBar {
      background-color: #f0c4b8;
      height: 40px;
    }
    .appView {
      flex-grow: 1;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .appMenu {
        flex: 2;
        background-color: #f8d8ad;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }
      a.route {
        display: flex;
        align-items: center;
        height: 50px;
        width: 100%;
        padding-left: 10%;
        font-size: 20px;
        transition: 0.2s;
        cursor: pointer;
        color: black;
        text-decoration: none;
        &:hover {
          background-color: #eeca9c;
          padding-left: 15%;
        }
      }
      a.router-link-active {
        background-color: #eeca9c;
        padding-left: 15%;
      }
      .appContent {
        flex: 8;
      }
    }
  }
}
</style>