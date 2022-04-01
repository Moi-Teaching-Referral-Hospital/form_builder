<template>
  <div>
    <b-row>
   <div ref="doctype" :id="`div-${control.uniqueId}`" class="ref-field-input">
      <img :src="control.imageUrl"  :style="[imageStyle]" />
    </div>
    </b-row>
    <b-row>
  <input
      v-show="true"
      :id="control.uniqueId"
      type="text"
      :class="controlFieldClass"
      :value="value"
      :name="control.name || control.uniqueId"
      :placeholder="control.placeholderText"
    />
 
    </b-row>
 
  
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "ImageSelectControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: "",
      linkControl: null,
      imageStyle: {width:`${this.control.width}px`, height:`${this.control.height}px`},
    };
  },
  mounted() {
    //this.makeSelectDoctypeControl();
  },
  watch: {
    value(val) {
      if (!val || !val.length) {
        this.linkControl.$input.val(" ");
      }else{
        this.linkControl.$input.val(val);
      }
    },
  },
  methods: {
   
  },
};
</script>

<style scoped></style>
