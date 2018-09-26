<template>
  <div class="informesBox">
    <template v-if="!dateSelected">
      <div class="dateOptionsBox">
        <div class="circleBtn">
          <div class="btnIcon">
            <fontawesome icon="calendar-check" />
          </div>
          <div class="label">
            Hoy
          </div>
        </div>
        <div class="circleBtn">
          <div class="btnIcon">
            <fontawesome icon="calendar-check" />
          </div>
          <div class="label">
            Ayer
          </div>
        </div>
        <div class="circleBtn">
          <div class="btnIcon">
            <fontawesome icon="calendar-check" />
          </div>
          <div class="label">
            Seleccionar
          </div>
        </div>
      </div>
      <!-- Dialog -->
      <el-dialog
        title="Seleccionar fecha"
        :visible.sync="selectingDate"
        width="30%">
        <div>
          <input v-model="selectedDate" type="date">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectingDate = false">Cancelar</el-button>
          <el-button type="primary" @click="setDate()">Aceptar</el-button>
        </span>
      </el-dialog>
    </template>
    <template v-else>
      <div class="indexGrid">
        <Toolbar/>
        <Table/>
        <Sidebar/>
      </div>
    </template>
  </div>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Table from "./Table.vue";
import Sidebar from "./Sidebar.vue";
import { mapState } from "Vuex";
import { totals as types } from "../../../store/vuexTypes";

export default {
  name: "informes",
  components: {
    Toolbar,
    Table,
    Sidebar
  },
  computed: mapState({
    isLoading: state => state.Totals.loading
  }),
  data: () => ({
    dateSelected: false,
    selectingDate: false,
    selectedDate: null
  }),
  methods: {
    setIndex(index) {
      this.$store.dispatch(types.setCierreIndex, index);
    },
    setDate() {
      let newDate = this.selectedDate.split("-");
      newDate[1]--;
      this.$store.dispatch(types.setDate, new Date(...newDate)).then(() => {
        this.$store.dispatch(types.load);
        this.selectingDate = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.informesBox {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .dateOptionsBox {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: row;
    .circleBtn {
      width: 25vw;
      height: 25vw;
      background: red;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .btnIcon {
        // flex: 1;
        color: white;
        font-size: 8em;
      }
      .label {
        // flex: 1;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        color: white;
        font-size: 20pt;
        font-weight: bold;
      }
    }
  }
  .indexGrid {
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 100px 1fr;
    grid-template-columns: 3fr 1fr;
    grid-template-areas: "toolbar toolbar" "table sidebar";
    overflow: hidden;
    padding: 20px 40px;
  }
}
</style>