<template>
  <div>

    <div v-if="section.sectionFormula && section.sectionFormula.length">
     <b-row  class = "my-2 mx-2" > 
      <b-col></b-col>
      <div class="my-1 mx-1" v-for = "formulaData in section.sectionFormula" :key = "formulaData">

      <b-input-group v-if="formulaData.outputField" :prepend="formulaData.outputField" >
       <b-form-input v-if="formulaData.formula" :value ="getFormulaValue(formulaData.formula)" > </b-form-input>
     </b-input-group>

      </div>
     
     </b-row>

    </div>
    <b-row>
  
      <b-table
        style="width: 100%"
        :empty-text="`Items will be show here`"
        :empty-filtered-text="`No items to show`"
        :show-empty="true"
        :items="items"
        striped
        outlined
        bordered
        head-row-variant="secondary"
        :sticky-header="'62vh'"
        responsive
        small
        ref="selectableTable"
        selectable
        @row-selected="onRowSelected"
        select-mode="single"
        hover
        foot-clone
      >
       <template #head()="data">
        <span  v-if="data.label">{{ data.label.split('-')[1] }}</span>
      </template>

       <template #cell(rowId)="data">
         <span v-if="false"> {{data}}</span>
      </template>
    
      <template #foot()="data">
        <span v-if="section.calculatedFields">
        
          <span class="text-danger" v-if="section.calculatedFields.split(',').includes(data.column)">{{ items.map(item => item[data.column]).reduce((partialSum, a) => partialSum + a, 0) }}</span>
        </span>
       
      </template>

       <template #foot(rowId)="data">
         <span v-if="false"> {{data}}</span>
          <span > Totals</span>
      </template>

      </b-table>
    </b-row>

    
    <b-modal :id="tableId" hide-footer size="xl">
      <FormRenderer :form-configuration="formData" v-model="formInputData" />

      <b-button variant="primary" class="mt-3" block @click="save()"
      size="sm"
      >
        Save
      </b-button>

    </b-modal>

    <div style="width:100%">
      <b-button
        variant="primary"
        id="show-btn"
        @click="$bvModal.show(tableId)"
        v-if="!readOnly && !readonly"
        >Add Row</b-button
      >
    
    </div>
  </div>
</template>

<script>
import { TABLE_VIEW_MIXIN } from "@/mixins/table-view-mixin";
import { getFormConfiguration, saveFormData, notify, deleteRepo } from "@/services/frappe";
import  AddControlControl from "@/views/builder/add-controls/AddControlControl";
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";

export default {
  name: "FullTableRowRenderView",
  components: { AddControlControl },
  mixins: [TABLE_VIEW_MIXIN, CONTROL_FIELD_EXTEND_MIXIN],
   data() {
    return {
      items: [],
      formData: {},
      formInputData: {},
      savedItems: [],
      calculatedFields: [],
      tableFormula : [],
    };
  },
  created() {
    if (this.section.referenceTable.length) {
      this.getForm(this.section.referenceTable);
    }
  },
  props: {
    reference: Object,
    parent: String,
    loaded: { type: Array, default: [] },
    readonly: {type: Boolean,default:false},
    valueContainer: { type: Object, required: false },
  },

  watch: {
    loaded(val) {
      if (val.length) {
        this.items = val;
      }
    },
  },
  methods: {
  getCalculatedFields() {
    this.calculatedFields = section.calculatedFields.split(",")
  },
  getFormulaValue(formula) {
   var text = formula
  var regex = /\[([^\][]*)]/g;
  var results=[], m;
  while ( m = regex.exec(text) ) {
    results.push(m[1]);
  }
  const operands = results;
    let resultFormula = formula;
    operands.forEach(operand => {
      const formattedOperand = `[${operand}]`;
      const calculatedValue = this.items.map(listItem => listItem[operand]).reduce((partialSum, a) => partialSum + a, 0)
      resultFormula = resultFormula.replaceAll(formattedOperand, calculatedValue)
    })
    return eval(resultFormula)
    
  }, 
  getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
   },
  getSave(savedId) {
      const data = this.formInputData;
      const returnedTarget = Object.assign({rowId : savedId}, data);
      returnedTarget.rowId = savedId;
      this.items.unshift(returnedTarget);
      this.map();
      this.$emit("items", { parent: this.parent, items : this.items });
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
      if(val.length < 1){
        return;
      }
      let size = val.length - 1;
      val = val[size];
       this.$bvModal.msgBoxConfirm(`Are you sure you want to remove row #${size + 1}?`)
          .then(value => {
           if(value) {
           
              this.items = this.items.filter(item => {
                  item.rowId != val.rowId;
             });
          
          
            deleteRepo({name : val.rowId}).then(reslt => {
               notify("Item removed");
            })

           }
          })
          .catch(err => {

          })
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
    list(key, formData) {
      const control = this.formData.controls[key];
      if (control && (control.type == "radio" || control.type == "dropDown")) {
        if (control.items.length) {
          const erpValue = items.find(item.value === this.formInputData[key]);
          const field = this.formData.controls[key].mappedField;
          if (field) {
            formData[field] = erpValue.erpValue;
          }
        }
      }
    },
    map() {
      if (this.formData.formConfig.mappedDoctype) {
        const keys = Object.keys(this.formInputData);
        let formData = {};

        keys.forEach((key) => {
          const control = this.formData.controls[key];
          if (
            control &&
            (control.type === "radio" ||
              control.type === "dropDown" ||
              control.type === "checkbox")
          ) {
            if (control.items.length) {
              const erpValueObject = control.items.find(
                (item) => item.value === this.formInputData[key]
              );
              const field = this.formData.controls[key].mappedField;
              if (field) {
                formData[field] = erpValueObject.erpValue;
              }
            }
          } else {
            const field = this.formData.controls[key].mappedField;
            if (field) {
              formData[field] = this.formInputData[key];
            }
          }
        });

        if (this.section.referenceTable.length) {
          let snake = null;

          if (this.section.tableReference) {
            snake = this.section.tableReference;
          } else {
            snake = this.section.referenceTable
              .replaceAll(" ", "_")
              .toLowerCase();
          }

          if (!this.valueContainer[snake]) {
            this.valueContainer[snake] = [];
          }

          const currentVal = this.valueContainer[snake];
          currentVal.push(formData);

          this.$set(this.valueContainer, snake, currentVal);
        }
      }
    },
    saveForm(formData) {
      saveFormData(formData).then((saved) => {
        this.getSave(saved.name);
        notify("Item saved " + saved.name);
        this.savedItems.push(saved.name)
      });
    },
    clearSavedData() {
        // clearChildTable({parent: this.parent} ).then(result => {
        //   this.items = [];
        // })
    },
    save() {
      let form_content = this.formInputData;
      form_content = JSON.stringify(form_content);
      const form_name = this.formName;
      let doctype = "Form Repository";
      const parent_repo = this.parent;
      
      let formData = {
        doctype,
        form_content,
        parent_repo,
        form_name,
         completion_status: "Completed",
         completed:1,
      };

      if(this.reference){
       formData.reference_doctype= this.reference.doctype
       formData.reference_doctype_id= this.reference.doctype_id 
      }

      this.saveForm({ formData });
    },
  },
  computed: {
    tableId() {
      const id = `${this.getRandomInt(1, 3000)}`;
      return id;
    },
  },
 
};
</script>

<style scoped></style>
