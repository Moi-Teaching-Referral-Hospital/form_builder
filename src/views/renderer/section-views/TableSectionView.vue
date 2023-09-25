<template>
  <div class="table-section">

    <div class="headline-block p5" v-show="section.isShowHeadline">
      <h2 :class="section.headlineAdditionalClass" v-text="section.headline"></h2>
      <p :class="section.subHeadlineAdditionalClass" v-text="section.subHeadline"></p>
    </div>

  
    <div class="table-wrapper">
      <FullTableRowRenderView :key="'123'" :section="section" :parent="parent" :reference="reference" :loaded="loaded"
      :dataInput="dataInput"
        :valueContainer="valueContainer" @items="loadItems" :readOnly="readonly" />
    </div>
  </div>
</template>

<script>
import { SECTION_VIEW_MIXINS } from "@/mixins/section-view-mixins";
import { STYLE_INJECTION_MIXIN } from "@/mixins/style-injection-mixin";
import AddRowControl from "@/views/builder/add-controls/AddRowControl";
import FullTableRowRenderView from "@/views/builder/row-views/FullTableRowRenderView";
import { RENDERER_SECTION_VIEW_MIXIN } from "@/mixins/renderer-section-view-mixin";
import {
  getList,
} from "@/services/frappe";

export default {
  name: "TableSectionView",
  components: { FullTableRowRenderView, AddRowControl },
  mixins: [SECTION_VIEW_MIXINS, STYLE_INJECTION_MIXIN, RENDERER_SECTION_VIEW_MIXIN],
  methods: {
    getTableData() {
      const doctype = "Form Repository";
      const parent_repo = this.parent;
      const form_name = this.section.referenceTable;
      let formData = {
        doctype,
        filters: { parent_repo, form_name },
        fields: ["*"],
        order_by: "creation desc",
        page: 1,
        start: 0,
        limit: 200,
      };
      getList(formData).then((response) => {
        this.loaded = response.message.map(item => {
          let formResponse = JSON.parse(item.form_content);
          formResponse.rowId = item.name;
          return formResponse;
        });
      });
    }, loadItems(val) {
      this.section.childTable = val;
    }
  },
  props: {
    parent: String,
    dataInput: Object,
  },
  data() {
    return {
      loaded: []
    }
  },
  mounted() {
    if (this.dataInput != null && this.dataInput[this.section.referenceTable]) {
      this.loaded = this.dataInput;
    }

    if (this.parent) {
      this.getTableData();
    }


  },
};
</script>

<style scoped></style>
