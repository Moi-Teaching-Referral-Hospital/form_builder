<template>

  <div :class="[styles.CONTAINER.FLUID, 'form-padding', 'vue-form-renderer']">
    
    
    <!-- Render Form Tag Or Not -->


    <form
      v-if="formData.formConfig.renderFormTag"
      :action="formData.formConfig.formActionURL"
      :method="formData.formConfig.formMethod"
      :id="formTagId"
      @submit.prevent
    >
      <!-- form headline -->
      <div
        class="form-headline-container"
        v-show="formData.formConfig.isShowHeadline"
      >
        <h1 v-text="formData.formConfig.headline"></h1>
        <p v-text="formData.formConfig.subHeadline"></p>
      </div>

      <!-- sections of the form -->
      <SectionContainer
        v-for="sectionData in sortedSections"
        :parent="parent"
        :section="sectionData"
        :readonly="readonly"
        :reference="reference"
        :rows="formData.rows"
        :controls="formData.controls"
        :key="sectionData.uniqueId"
        :value-container="valueContainer"
        :dataInput ="dataInput"
        :validation-errors="validationErrors"
      />
    </form>
    <template v-else>
      <!-- form headline -->
      <div
        class="form-headline-container"
        v-show="formData.formConfig.isShowHeadline"
      >
        <h1 v-text="formData.formConfig.headline"></h1>
        <p v-text="formData.formConfig.subHeadline"></p>
      </div>

      <!-- sections of the form -->
      <SectionContainer
        v-for="sectionData in sortedSections"
        :section="sectionData"
        :readonly="readonly"
        :reference="reference"
        :parent="parent"
        :rows="formData.rows"
        :controls="formData.controls"
        :key="sectionData.uniqueId"
        :value-container="valueContainer"
        :validation-errors="validationErrors"
        :dataInput ="dataInput"
      />

    </template>
  </div>
</template>

<script>
import FormRendererBusiness from "@/mixins/form-renderer-mixins";
import SectionContainer from "@/views/renderer/SectionContainer";

export default {
  name: "FormRenderer",
  components: { SectionContainer },
  mixins: FormRendererBusiness,
  data: () => ({
    formData: null,
  }),
};
</script>

<style scoped></style>
