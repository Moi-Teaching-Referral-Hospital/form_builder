<template>
  <div>
    <div>

      <b-table
        style="width: 100%"
        :empty-text="`Items will be show here x`"
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
        small
        @row-selected="onRowSelected"
        select-mode="single"
        hover
      >
        <template #head()="data">
          <span v-if="data.label">{{ data.label.split("-")[1] }}</span>
        </template>
      </b-table>
    </div>

    <b-modal id="bv-modal-example" hide-footer size="xl">
      <FormRenderer :form-configuration="formData" v-model="formInputData" />
      <b-button variant="primary" class="mt-3" block @click="getSave()">
        Save
      </b-button>
    </b-modal>
    <div style="width:100%">
      <div>
  <b-button
        variant="primary"
        id="show-btn"
        @click="$bvModal.show('bv-modal-example')"
    
        size="sm"
        >Add Row</b-button
      >

        <b-button
        variant="danger"
        id="show-btn"
        @click="$bvModal.show('bv-modal-example')"
    
        size="sm"
        >Clear </b-button
      >
      </div>
    
    </div>
  </div>
</template>

<script>
import { TABLE_VIEW_MIXIN } from "@/mixins/table-view-mixin";
import { getFormConfiguration, saveFormData } from "@/services/frappe";
import AddControlControl from "@/views/builder/add-controls/AddControlControl";

export default {
  name: "TableRowView",
  components: { AddControlControl },
  mixins: [TABLE_VIEW_MIXIN],
//    v-if="!readOnly"
  methods: {
    getSave() {
      const data = this.formInputData;

       let isValid = true;
        Object.keys(this.formData.controls).forEach(key => {
          if (this.formData.controls[key] != null && this.formData.controls[key].validations != null && isValid) {
            this.formData.controls[key].validations.forEach(validation => {

              if (validation.ruleType == 'required' && this.formInputData[key] == null) {
                frappe.show_alert(`Field ${this.formData.controls[key].label} is required`)
                isValid = false
              }

              if (validation.ruleType == 'min' && `${this.formInputData[key]}`.length < validation.additionalValue) {
                frappe.show_alert(`Field ${this.formData.controls[key].label} is need at least ${validation.additionalValue} characters`)
                isValid = false
              }

              if (validation.ruleType == 'max' && `${this.formInputData[key]}`.length > validation.additionalValue) {
                frappe.show_alert(`Field ${this.formData.controls[key].label} can only have a max of ${validation.additionalValue} characters`)
                isValid = false
              }

            })
          } 

        })
        
         if (!isValid) {
          return;
        }

      const returnedTarget = Object.assign({}, data);
      this.items.unshift(returnedTarget);
      this.clearData();
    },
    setValues(val) {
      this.$set(this, "formInputData", val);
    },
    clearData() {
      const val = {};
      const keys = Object.keys(this.formInputData);
      keys.forEach((key) => {
        val[key] = "";
      });

      this.setValues(val);
    },
    onRowSelected(val) {
      alert(JSON.stringify(val))
    },
   
    getForm(name) {
      getFormConfiguration({ name }).then((config) => {
        const formStringConfig = config.formdata;
        const configObject = JSON.parse(formStringConfig);
        this.configuration = formStringConfig;
        this.formName = config.name;
        this.formData = configObject;
        this.originalConfig = configObject;
      });
    },
    saveForm(formData) {
      saveFormData(formData).then((saved) => {});
    },

    save() {
      let form_content = this.formInputData;
      form_content = JSON.stringify(form_content);
      const form_name = this.formName;
      const reference_doctype = this.selectedDoctype;
      const reference_doctype_id = this.selectedDoctypeReference;
      let doctype = "Form Repository";
      let formData = {
        doctype,
        form_content,
        form_name,
        reference_doctype,
        reference_doctype_id,
      };

       if(this.reference){
       formData.reference_doctype= this.reference.doctype
       formData.reference_doctype_id= this.reference.doctype_id 
      }
      this.saveForm({ formData });
    },
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
      formInputData: {},
    };
  },
};
</script>

<style scoped></style>
