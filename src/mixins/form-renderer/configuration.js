/**
 * Form-Renderer Configuration Handler
 */
import { GLOBAL_CONFIG } from "@/configs/global";

const deepEqual = require("deep-equal"); // TO CHECK THE DEEPEST VALUES OF THE FORM...

const CONFIGURATION = {
  props: {
    formConfiguration: {
      type: Object,
      required: true,
    },
    parent: { type: String, default: "Parent" },
    reference: {type:Object,default:null},
    dataInput: {type:Array,default:null},
    readonly: {
      type: Boolean,
      required: false,
    },
  },

  watch: {
    /**
     * Watching the configuration, if user change it => need to re-updated the form itself
     */
    formConfiguration: {
      deep: true,
      handler(val) {
        if (deepEqual(val, this.formData)) {
          return;
        }

        this.mapping(val);
        this.createValueContainer(val);
      },
    },
  },

  created() {
    this.mapping(this.formConfiguration);
  },

  computed: {
    /**
     * Get the <form> id
     * @returns {string}
     */
    formTagId: () => GLOBAL_CONFIG.rendererFormId,
  },
};

export { CONFIGURATION };
