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
          <div class="selected d-center" v-html="option.name">        
          </div>
        </template>

        <template slot="option" slot-scope="option">
          <div class="d-center"  v-html="option.name">
          </div>
        </template>
        
      </v-select>


    </div>
  </div>
</template>

<script>
import { CONTROL_FIELD_EXTEND_MIXIN } from "@/mixins/control-field-extend-mixin";
import { api } from "../../services/frappe";


export default {
  name: "Icd11Control",
  mixins: [CONTROL_FIELD_EXTEND_MIXIN],
  data() {
    return {
      searchValue:null,
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
      if(o != null && o.length >0 ){
        this.updateValue(o.replace(/<\/?[^>]+(>|$)/g, ""))
      }
   
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
        if(this.searchValue == null) {
          this.searchValue = val
        }

      }
    },
  },
  methods: {
   
    fetchData(loading, search, context) {

      api({
        method: "clinical.api.icd.auth.access_icd",
        args: {
          q: search,
        }
      }).then(response => {
        loading(false)
        const results = response.message.destinationEntities.map(item =>`${item.theCode}-${item.title}`)
        this.$set(this, "searchResults", results);
      });
    },
    handleSelect(value) {
      this.selectedItem = this.searchResults.find((item) => item.id === value);
    },
    onSearch(search, loading) {
      if (search.length) {
        loading(true);
        this.fetchData(loading, search, this);
      }
    },

  },
};
</script>

<style scoped></style>
