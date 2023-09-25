<template>
  <div>
  
    <b-button v-if="false" @click="start"> start</b-button>
    <div class="demo-instance">
      <div class="demo">
        <div class="demo-search">
          <input
            :id="control.uniqueId"
            type="text"
            autocomplete="off"
            :data-ctw-ino="modalId"
            class="ctw-input form-control md-field"
            :value="value"
            :name="control.name || control.uniqueId"
            :placeholder="control.placeholderText"
          />
        </div>
        <!-- <div v-show="false" id="demo-selected"> -->
        <!-- example of an extra input element for testing the Embedded Coding Tool select entity function -->
        <!-- Your selection is: <span id="demo-paste-selected"></span> -->
        <!-- </div> -->
      </div>

      <!-- div element used for showing the search results -->
      <div class="ctw-window" :data-ctw-ino="modalId"></div>
    </div>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";
import * as ECT from "@whoicd/icd11ect";
// import "@whoicd/qicd11ect/style.css";

export default {
  name: "Icd11Control",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  mounted() {
    this.start();
  },
  data() {
    return {
      modalId: "1",
    };
  },
  methods: {
    start() {
      this.modalId = `${this.getRandomInt(1, 100)}`;
      const mySettings = {
        apiServerUrl: "https://icd.mtrh.go.ke",
        apiSecured:true,
        autoBind: false,
        popupMode: true,
        wordsAvailable: false,
      };

      const myCallbacks = {
        selectedEntityFunction: (selectedEntity) => {
          const fullCode =
            selectedEntity.code + " - " + selectedEntity.bestMatchText;
          this.updateValue(fullCode);
          this.clear();
       
        },
      };

      ECT.Handler.configure(mySettings, myCallbacks);
      ECT.Handler.bind("1"); //
    },
    clear() {
      ECT.Handler.clear("1");
    },
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
  },
};
</script>

<style scoped></style>
