<template>
    <div>   
        <div :class="styles.FORM.FORM_GROUP" >
            <label>Search Document</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.searchDocument">
        </div>

         <div :class="styles.FORM.FORM_GROUP" >
            <label>Search document field</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.searchDocumentField">
        </div>

        <div :class="styles.FORM.FORM_GROUP" >
            <label>Parent</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.parentData">
        </div>

        <div :class="styles.FORM.FORM_GROUP" >
            <label>Static parent (If tree)</label>
            <input type="text" 
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.parentConcept">
        </div>

        <div :class="styles.FORM.FORM_GROUP" >
            <label>Search Filters</label>
            <textarea type="text"
            rows="6"
                   :class="styles.FORM.FORM_CONTROL"
                   v-model="control.searchFilters"></textarea>
        </div>
    </div>
</template>

<script>
    import {CONTROL_SPECIAL_CONFIG_MIXIN} from "@/mixins/control-special-config-mixin";

    export default {
        name: "LinkConfigView",
        mixins: [CONTROL_SPECIAL_CONFIG_MIXIN]
    }
</script>