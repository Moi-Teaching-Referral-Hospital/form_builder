<template>
  <div :id="`parent-${control.uniqueId}`">
    <div>
      <v-select v-model="searchValue" :options="searchResults" label="name" :filterable="false" @search="onSearch"
        placeholder="Search">
        <template #selected-option="{ value }">
          <div style="display: flex; align-items: baseline">
            <strong>{{ value }}</strong>
          </div>
        </template>
        <template slot="selected-option" slot-scope="option">
          <div class="selected d-center">
            {{ option.value }}
          </div>
        </template>

        <template slot="option" slot-scope="option">
          <div class="d-center">
            {{ option.value }}
          </div>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";


export default {
  name: "LinkControl",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue: { value: this.value },
      linkControl: null,
      linkFilters: {},
      parentData: null,
      searchTerm: "",
      selectedItem: null,
      searchResults: [],
      parentData: "",
    };
  },
  mounted() {
    this.preload()
  },
  watch: {
    searchValue(o, n) {
      this.updateValue(o.value)
    },
    valueContainer: {
      handler(newData, oldData) {
        if (this.control.parentData != null && newData[this.control.parentData] != null

        ) {
          this.parentData = newData[this.control.parentData]
        }
      },
      deep: true,

    },
    value(val) {
      if (!val || !val.length) {

      } else {
        this.searchValue = { value: val, description: "" }

      }
    },
  },
  methods: {
    openConfig(){
      console.log(this.formData);
    },
    preload() {
      let me = this;
      let condition = me.control.searchFilters
      let parentData = me.control.parentData
      let parentConcept = me.control.parentConcept;

      if (parentConcept != null && parentConcept.length > 0) {
        // const parentKey = `parent_${this.control.searchDocument.toLowerCase()}`
        this.linkFilters = { parent_residence: parentConcept }

      }

      if (parentData != null && parentData.length > 0) {
        const parentKey = `parent_${this.control.searchDocument.toLowerCase()}`
        this.linkFilters[parentKey] = this.valueContainer[parentData]

      }

      if (condition != null && condition.length > 0) {
        this.linkFilters = JSON.parse(condition)
      }
    },
    fetchData(loading, search, context) {

      frappe.call({
        method: "frappe.desk.search.search_link",
        args: {
          txt: search,
          doctype: context.control.searchDocument,
          reference_doctype: "",
          filters: context.linkFilters,
        }
      }).then(response => {
        loading(false)
        this.$set(this, "searchResults", response.results);
      });
    },
    handleSelect(value) {
      this.selectedItem = this.searchResults.find((item) => item.id === value);
    },
    onSearch(search, loading) {
      let me = this;
      let condition = me.control.searchFilters
      let parentData = me.control.parentData
      let parentConcept = me.control.parentConcept;

      if (parentConcept != null && parentConcept.length > 0) {
        this.linkFilters = { parent_residence: parentConcept }

      }

      if (parentData != null && parentData.length > 0) {
        this.linkFilters = { parent_residence: this.valueContainer[parentData] }
      }

      if (condition != null && condition.length > 0) {
        this.linkFilters = JSON.parse(condition)
      }

      if (search.length) {
        loading(true);
        this.fetchData(loading, search, this);
      }
    },

  },
};
</script>

<style scoped></style>
