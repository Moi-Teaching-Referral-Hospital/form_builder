<template>
  <div>
    <div>
      <b-table
        style="width: 100%"
        :empty-text="`No items to show`"
        :empty-filtered-text="`No items to show`"
        :show-empty="true"
        :items="items"
        striped
        outlined
        bordered
        head-row-variant="secondary"
        :sticky-header="'62vh'"
        responsive
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        select-mode="single"
        hover
      />
    </div>

    <b-modal id="bv-modal-example" hide-footer size="xl">
      <template #modal-title> Add row Item </template>
      <b-button variant="primary" @click="getSave()" class="mt-3">
        save</b-button
      >
      <FormRenderer :form-configuration="formData" v-model="formInputData" />
      <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
        >Close Me</b-button
      >
    </b-modal>
    <div style="width:100%">
      <b-button
        variant="primary"
        id="show-btn"
        @click="$bvModal.show('bv-modal-example')"
        >Add Row</b-button
      >
    </div>
  </div>
</template>

<script>
import { ROW_VIEW_MIXIN } from "@/mixins/row-view-mixin";
import AddControlControl from "@/views/builder/add-controls/AddControlControl";

export default {
  name: "TableRowView",
  components: { AddControlControl },
  mixins: [ROW_VIEW_MIXIN],
  methods: {
    getSave() {
      const data = this.formInputData;
      const returnedTarget = Object.assign({}, data);
      this.items.unshift(returnedTarget);
    },
    onRowSelected(val){
        
    }
  },
  data() {
    return {
      items: [],
      formData: {
        formConfig: {
          headline: "",
          subHeadline: "",
          isShowHeadline: false,
          formula: [
            {
              name: "BMI formula",
              description: "Calculate the BMI",
              formula:
                "[DC-Weight-00067]  /  ( [DC-Height-00066]  *  [DC-Height-00066]  )",
              output: "DC-BMI-00068",
            },
          ],
          renderFormTag: false,
          formActionURL: "",
          formMethod: "POST",
        },
        sections: {
          "section-9eed1a21-b1c4-4c55-9012-1af4667732c4": {
            uniqueId: "section-9eed1a21-b1c4-4c55-9012-1af4667732c4",
            headline: "Patient Vitals",
            headlineAdditionalClass: "",
            subHeadline: "Sample vitals information",
            subHeadlineAdditionalClass: "",
            isShowHeadline: true,
            condition: '  [DC-Gender-00065] == "DC-Female-00064"',
            sortOrder: 1,
            type: "normal",
            rows: [],
            controls: [
              "DC-First Name-00061",
              "DC-Last Name-00062",
              "DC-Gender-00065",
              "DC-Height-00066",
              "DC-Weight-00067",
              "DC-BMI-00068",
            ],
          },
        },
        rows: {},
        controls: {
          "DC-First Name-00061": {
            uniqueId: "DC-First Name-00061",
            type: "input",
            name: "DC-First Name-00061",
            label: "First Name",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
          },
          "DC-Last Name-00062": {
            uniqueId: "DC-Last Name-00062",
            type: "input",
            name: "DC-Last Name-00062",
            label: "Last Name",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
          },
          "DC-Height-00066": {
            uniqueId: "DC-Height-00066",
            type: "input",
            name: "DC-Height-00066",
            label: "Height",
            subLabel: "in meters",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
          },
          "DC-Weight-00067": {
            uniqueId: "DC-Weight-00067",
            type: "input",
            name: "DC-Weight-00067",
            label: "Weigth",
            subLabel: "in Kgs",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
            depends: "",
            evaluatedVisibility: true,
          },
          "DC-BMI-00068": {
            uniqueId: "DC-BMI-00068",
            type: "input",
            name: "DC-BMI-00068",
            label: "BMI",
            subLabel: "In Kg/m2",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
            depends: "",
            evaluatedVisibility: true,
          },
          "DC-Gender-00065": {
            uniqueId: "DC-Gender-00065",
            type: "radio",
            name: "DC-Gender-00065",
            label: "Gender",
            subLabel: "Male or Female",
            isShowLabel: true,
            placeholderText: "",
            containerClass: "col-md-6 md-layout-item md-size-50",
            additionalContainerClass: "",
            additionalFieldClass: "",
            additionalLabelClass: "",
            defaultValue: "",
            validations: [],
            displayMode: "line",
            position: "left",
            items: [
              { text: "Male", value: "DC-Male-00063" },
              { text: "Female", value: "DC-Female-00064" },
            ],
          },
        },
      },
      formInputData:{},
    };
  },
};
</script>

<style scoped></style>
