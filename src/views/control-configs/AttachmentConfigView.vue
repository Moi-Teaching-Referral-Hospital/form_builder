<template>
    <div>   
        <div :class="styles.FORM.FORM_GROUP" >
            <label>Document</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.document">
        </div>

         <div :class="styles.FORM.FORM_GROUP" >
            <label>Document name</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.documentName">
        </div>

    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "AttachmentConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>