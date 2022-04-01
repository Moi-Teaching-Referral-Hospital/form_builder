<template>
    <div>   
        <div :class="styles.FORM.FORM_GROUP" >
            <label>ImageUrl: </label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.imageUrl">
        </div>

         <div :class="styles.FORM.FORM_GROUP" >
            <label>Height: </label>
            <input type="number" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.height">
        </div>

          <div :class="styles.FORM.FORM_GROUP" >
            <label>Width: </label>
            <input type="number" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.width">
        </div>

      
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "ImageSelectConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>