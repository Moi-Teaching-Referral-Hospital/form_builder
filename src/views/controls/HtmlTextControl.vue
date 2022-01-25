<template>
<div>
  <div  v-if="!readonly" :style="{  'min-height': ((control.height+130 )||330 ) + 'px' } ">
    <vue-editor
      
      :value="value"
       v-model="value"
      :id="control.uniqueId"
      type="text"
      :name="control.name || control.uniqueId"  
      :placeholder="control.placeholderText"
      :editor-toolbar="customToolbar"
      :style="{  'height': (control.height ||200 ) + 'px', 'max-height': ((control.height*3) ||600 ) + 'px'  }"
    />
  
  </div>
  <div v-if="readonly" v-html="value"> </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from "vue2-editor";

import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "HtlmTextControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
       customToolbar: [
      ["bold", "underline"],
      [{ list: "ordered" }],
      []
    ]
    }
  },
  components: {
    VueEditor,
  },
 
 watch: {
   value(al){
     this.updateValue(al)
   }
 },
};
</script>

<style scoped></style>
