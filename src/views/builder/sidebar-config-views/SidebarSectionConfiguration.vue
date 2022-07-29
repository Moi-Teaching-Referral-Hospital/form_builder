<template>
  <div class="sidebar-form-configuration">
    <h5>Section Configuration</h5>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Headline</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.headline"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.headlineAdditionalClass"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-Headline</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadline"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Sub-Headline Additional Class (CSS)</label>
      <input
        type="text"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.subHeadlineAdditionalClass"
      />
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>
        Show Section Headline?
        <input type="checkbox" v-model="sectionConfiguration.isShowHeadline" />
      </label>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label> Reference Table</label>
      <div ref="doctype" class="ref-field-input"></div>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label> Select Formula Controls </label>
      <select
        :class="controlFieldClass"
        @input="updateValue($event.target.value)"
      >
        <option
          v-for="optionObj in sectionConfiguration.controls"
          :key="optionObj"
          :value="optionObj"
          v-text="optionObj"
          :selected="value === optionObj"
        ></option>
      </select>
    </div>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Child Table Reference</label>
      <input
        type="text"
        placeholder="Write child references"
        :class="styles.FORM.FORM_CONTROL"
        v-model="sectionConfiguration.tableReference"
      />
    </div>
    
    <hr/>
    <div :class="styles.FORM.FORM_GROUP">
      <label>Evaluation visibility</label>
      <textarea
        type="text"
        placeholder="Write your formula here"
        :class="styles.FORM.FORM_CONTROL"
        rows="6"
        v-model="sectionConfiguration.condition"
      />
    </div>

    <hr/>

    <div :class="styles.FORM.FORM_GROUP">
      <label>Calculated Fields</label>
      <div ref="doctypex" class="ref-field-input"></div>
      <textarea
        type="text"
        placeholder="Calculated Fields"
        :class="styles.FORM.FORM_CONTROL"
        rows="6"
        v-model="sectionConfiguration.calculatedFields"
      />
    </div>
<hr/>
{{sectionConfiguration.sectionFormula}}
    <div :class="styles.FORM.FORM_GROUP">
      <label style="margin-right: 15px">Table Formula</label>
      <button :class="styles.BUTTON.PRIMARY" @click="addTableFormula()">Add Formula</button>
    </div>

    <div v-if = "currentFormula.length">
      <div v-for = "(item, index) in currentFormula " :key="index" :class="styles.FORM.FORM_GROUP">
       <label>Output Field Name {{index +1}}</label>
      <input
        type="text"
        placeholder="Output Field label"
        :class="styles.FORM.FORM_CONTROL"
        v-model = "currentFormula[index].outputField"
      />
      <label>Formula {{index +1}}</label>
       <textarea
        type="text"
        placeholder="Write your formula here"
       rows="6"
        :class="styles.FORM.FORM_CONTROL"
        v-model = "currentFormula[index].formula"
      />
       <br/>
       <button class="padding-top: 15px;" :class="styles.BUTTON.PRIMARY" @click="saveFormula(index, currentFormula[index])">Save</button>
       <hr/>
    </div>

    </div>

    <div class="buttons">
      <button :class="styles.BUTTON.PRIMARY" @click="save(false)">
        Save
      </button>
      <button :class="styles.BUTTON.INFO" @click="save(true)">
        Save & Close
      </button>
    </div>
  </div>
</template>

<script>
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import { SIDEBAR_BODY_MIXIN } from "@/mixins/sidebar-body-mixin";
import { SECTION_DEFAULT_DATA } from "@/configs/section";

export default {
  name: "SidebarSectionConfiguration",
  mixins: [STYLE_INJECTION_MIXIN, SIDEBAR_BODY_MIXIN],

  data: () => ({
    dataKey: "sectionConfiguration",
    sectionConfiguration: Object.assign({}, SECTION_DEFAULT_DATA),
    currentFormula : []
  }),

  created() {
    // retrieve the data from `GlobalSidebar` passed in
    this.sectionConfiguration = Object.assign(
      {},
      this.sectionConfiguration,
      this.dataPackage
    );
    
    if (this.sectionConfiguration.sectionFormula) {
      this.currentFormula = this.sectionConfiguration.sectionFormula;
    }
  },
  mounted() {
    if (window.frappe) {
      this.makeSelectDoctypeControl();
      this.makeSelectDoctypeControl2();
    }
  },
  methods: {
    updateValue(val) {
      const value = this.sectionConfiguration.condition + "  " + `[${val}] `;
      this.$set(this.sectionConfiguration, "condition", value);
    },
    makeSelectDoctypeControl() {
      let me = this;
      let customer_field = frappe.ui.form.make_control({
        df: {
          label: __("Reference"),
          fieldtype: "Link",
          fieldname: "reference",
          options: "Form Design",
          placeholder: "Options",
          onchange: function() {
            if (this.value) {
              me.sectionConfiguration.referenceTable = this.value;
            }
          },
        },
        parent: this.$refs["doctype"],
        render_input: true,
      });
      customer_field.toggle_label(false);
      customer_field.$input.val(me.sectionConfiguration.referenceTable);
      $("#modal-body")
        .find(".input-max-width")
        .removeClass("input-max-width");
    },
     makeSelectDoctypeControl2() {
      let me = this;
      let customer_field = frappe.ui.form.make_control({
        df: {
          label: __("Reference"),
          fieldtype: "Link",
          fieldname: "reference",
          options: "Dictionary Concept",
          placeholder: "Options",
          onchange: function() {
            if (this.value) {
             if(me.sectionConfiguration.calculatedFields ){
               var result = `${me.sectionConfiguration.calculatedFields},${this.value}`;
               me.$set(me.sectionConfiguration, "calculatedFields", result);
               
             } else {
              me.$set(me.sectionConfiguration, "calculatedFields", value);
             }
              
            }
          },
        },
        parent: this.$refs["doctypex"],
        render_input: true,
      });
      customer_field.toggle_label(false);
      // customer_field.$input.val(me.sectionConfiguration.referenceTable);
      $("#modal-body")
        .find(".input-max-width")
        .removeClass("input-max-width");
    },
    addTableFormula(){
       this.currentFormula.push({outputField: "", formula:""})    
    },
    saveFormula(index, data) {
      if(this.sectionConfiguration.sectionFormula) {
         this.sectionConfiguration.sectionFormula.push({})
         this.$set(this.sectionConfiguration, "sectionFormula", this.sectionConfiguration.sectionFormula);
         this.sectionConfiguration.sectionFormula.push({});
      } else {
         this.$set(this.sectionConfiguration, "sectionFormula", [{}]);
      }
      this.sectionConfiguration.sectionFormula[index] = data;
      this.$set(this.sectionConfiguration, "sectionFormula", this.sectionConfiguration.sectionFormula);
    }
  },
};
</script>
