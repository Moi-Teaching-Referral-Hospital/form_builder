<template>
    <div class="section-container">
 

        <component :is="sectionViewComponent"
                   :section="section"
                   :rows="rows"
                   :readonly="readonly"
                   :controls="controls"
                   :parent ="parent"
                   :reference="reference"
                   :key="section.uniqueId"
                   :value-container="valueContainer"
                   :validation-errors="validationErrors"
        />

    </div>
</template>

<script>
    import {SECTION_TYPES} from "@/configs/section";

    export default {
        
        name: "SectionContainer",

        props: {
            section: Object,
            rows: Object,
            controls: Object,
            valueContainer: Object,
            validationErrors: Object,
            readonly:{type:Boolean,default:true},
            reference:Object,
            parent:{type:String, default:"no parent"},
        },

        computed: {
            sectionViewComponent() {
                this.section.parent = this.parent;
                return SECTION_TYPES[this.section.type].rendererView
            }
        },
    }
</script>

<style scoped>
</style>