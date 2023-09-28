<template>
  <div>
    <b-form-input :id="control.uniqueId" :value="value" @input="dataChanged" type="datetime-local">
    </b-form-input>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "DateTimeControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: "",
    };
  },

  methods: {
    dataChanged(val) {
      this.updateValue(val);
    },
  },
};
</script>

<style scoped></style>
