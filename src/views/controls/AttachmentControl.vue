<template>
  <div>
  <label v-if="value">{{value.split("/")}}</label>
   <label v-if="url">{{url}}</label>
   <b-button :id="control.uniqueId"
            :class="buttonClasses"
            :name="control.name"
            v-text="url?'Show image':control.label"
            @click="clickedHandle"></b-button>
  
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "AttachmentControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      url:null
    }
  },
  computed: {
    urlVal(){
      if(this.value){
        const wordArray = this.value.split("/");
        if(wordArray.length){
           return wordArray[wordArray.length -1]
        }else{
          return"";
        }
      
      }
    }
  },
  methods: {
  clickedHandle() {
    const me = this;
      new frappe.ui.FileUploaderCustom({
        doctype: me.control.document,
        docname: me.documentName,
        on_success(file_doc) {
          const { file_url, filename } = file_doc;
           me.updateValue(file_url);
           me.url = file_url;
        },
      });
    },
  },
};
</script>

<style scoped></style>
