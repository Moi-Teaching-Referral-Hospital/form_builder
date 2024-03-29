/**
 * Supported Controls in Vue-Form-Builder
 * @author Phat Tran
 */
import { STYLES } from "@/configs/styles";
import { HELPER } from "@/libraries/helper";
import {
  DATE_PICKER_RETURN_TYPES,
  DATE_PICKER_START_DATES,
  RADIO_CHECKBOX_POSITION,
  RADIO_CHECKBOX_STYLE,
  DROPDOWN_DATA_MODES,

  // FILE_UPLOAD_MODES
} from "@/configs/control-config-enum";

// Control-GUI-Component
import InputControl from "@/views/controls/InputControl";
import TextControl from "@/views/controls/TextControl";
import ButtonControl from "@/views/controls/ButtonControl";
import EmptyBlockControl from "@/views/controls/EmptyBlockControl";
import TextBlockControl from "@/views/controls/TextBlockControl";
import LabelControl from "@/views/controls/LabelControl";
import RadioCheckboxControl from "@/views/controls/RadioCheckboxControl";
import DatePickerControl from "@/views/controls/DatePickerControl";
import DateControl from "@/views/controls/DateControl";
import NumberControl from "@/views/controls/NumberControl";
import DropdownControl from "@/views/controls/DropdownControl";
import LinkControl from "@/views/controls/LinkControl"
import ImageSelectControl from "@/views/controls/ImageSelectControl"
import AttachmentControl from "@/views/controls/AttachmentControl"
import HtmlTextControl from "@/views/controls/HtmlTextControl"
import TimeControl from "@/views/controls/TimeControl"
import Icd11Control from "@/views/controls/Icd11Control"
import NhddControl from "@/views/controls/NhddControl"
import DateTimeControl from "@/views/controls/DateTimeControl"

// Control-Config-Component
import TextBlockConfigView from "@/views/control-configs/TextBlockConfigView";
import ButtonConfigView from "@/views/control-configs/ButtonConfigView";
import LabelConfigView from "@/views/control-configs/LabelConfigView";
import RadioCheckboxConfigView from "@/views/control-configs/RadioCheckboxConfigView";
import NumberConfigView from "@/views/control-configs/NumberConfigView";
import DatePickerConfigView from "@/views/control-configs/DatePickerConfigView";
import TextConfigView from "@/views/control-configs/TextConfigView";
import DropdownConfigView from "@/views/control-configs/DropdownConfigView";
import LinkConfigView from "@/views/control-configs/LinkConfigView";
import AttachmentConfigView from "@/views/control-configs/AttachmentConfigView";
import TimeConfigView from "@/views/control-configs/TimeConfigView";
import HtmlTextConfigView from "@/views/control-configs/HtmlTextConfigView";
import ImageSelectConfigView from "@/views/control-configs/ImageSelectConfigView";

const CONTROLS = {
  input: {
    name: "Input Field",
    description: "Input text single line",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

    // component mapping
    fieldComponent: InputControl,

  },
  icd11: {
    name: "Icd11",
    description: "Icd 11 tool",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.
    // component mapping
    fieldComponent: Icd11Control,
  },
  nhdd: {
    name: "nhdd",
    description: "nhdd",
    icon: "editPencil", 
    fieldComponent: NhddControl,
  },
  link: {
    name: "Link Field",
    description: "Add searchable items",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

    // component mapping
    fieldComponent: LinkControl,
    configComponent: LinkConfigView,
  },

  imageSelect: {
    name: "ImageSelect Field",
    description: "Select Image",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.
    fieldComponent: ImageSelectControl,
    configComponent: ImageSelectConfigView,
  },

  attachment:{
    name: "Attachment Field",
    description: "Add attachment",
    icon: "editPencil", 
    fieldComponent: AttachmentControl,
    configComponent: AttachmentConfigView,

  },

  time: {
    name: "Time Field",
    description: "Add time selection",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

    // component mapping
    fieldComponent: TimeControl,
    configComponent: TimeConfigView,
  },

  datetime: {
    name: "Date Time Field",
    description: "Date Time",
    icon: "editPencil", 

    fieldComponent: DateTimeControl,
    configComponent: TimeConfigView,
  },
  htmlText: {
    name: "Formatted Text Field",
    description: "For fomated long text",
    icon: "editPencil", // Follow ICON in `icon-facade.js` to see how it works.

    // component mapping
    fieldComponent: HtmlTextControl,
    configComponent: HtmlTextConfigView,
  },


  number: {
    name: "Number Input Field",
    description: "Input text single line - Number Only",

    configData: {
      isReal: false, // integer or real (float/double)
      decimalPlace: 1, // [For Real] 0.xxx?? (x = num of places)
    },

    fieldComponent: NumberControl,
    configComponent: NumberConfigView,

    /**
     * As same like Vue-JS Property Default Data
     * Specific field need some special data-type/structure, they need to
     * put the creation in a factory method.
     * It must return a value.
     */
    rendererDefaultData() {
      return 0;
    },
  },

  text: {
    name: "Text Field",
    description: "Multiple line text field",

    // config data for the input field - it will be merge with the CONTROL_DEFAULT_DATA
    configData: {
      rows: 3, // numeric
    },

    // component mapping
    fieldComponent: TextControl,
    configComponent: TextConfigView,
  },

  date: {
    name: "Date Picker",
    description: "Simple date picker field",
    // component mapping
    fieldComponent: DateControl,
    configComponent: TimeConfigView,
  },

  // I would love to support this, but the thing is, many rich editors are too large:
  // js: 150KB+
  // css: 30KB+
  // So 2.0.0 won't have this field.
  // richText: {
  //     name: "Rich-Text Field",
  //     description: "Multiple line text field - Rich Editor (WYSIWYG)",
  // },

  datex: {
    name: "Date Picker",
    description: "Simple date picker field",

    configData: {
      format: "YYYY-MM-DD",
      firstDay: DATE_PICKER_START_DATES.monday.val, // 0 Sunday, 1 Monday,...
      numberOfMonths: 1, // Number of Month(s) will be shown
      numberOfColumns: 1, // Number of Column(s) will be shown
      minDate: null, // min day (less => can't select)
      maxDate: null, // max day (more => can't select),

      singleMode: true, // date or date-range

      // for date-range
      minDays: 0, // min-day range
      maxDays: 0, // max-day range

      returnType: DATE_PICKER_RETURN_TYPES.format.val, // specific return type
    },

    fieldComponent: DatePickerControl,
    configComponent: DatePickerConfigView,
  },

  // fileUpload: {
  //     name: "File Upload",
  //     description: "Upload single file through API",
  //
  //     configData: {
  //         uploadMode: FILE_UPLOAD_MODES.normal.val,
  //         apiURL: "", // API-Url to upload
  //     },
  // },

  dropDown: {
    name: "Dropdown",
    description: "Dropdown select from a list",

    configData: {
      dataMode: DROPDOWN_DATA_MODES.list.val, // normal - api
      multiple: false, // is multiple selection

      /**
       * @var {ListItem[]} items
       */
      items: [], // for normal hard-list

      apiURL: "", // for api-request - must be entered
      apiTextKey: "text", // <option>TEXT</option>
      apiValueKey: "value", // <option value=value>...</option>
    },

    fieldComponent: DropdownControl,
    configComponent: DropdownConfigView,
  },

  checkbox: {
    name: "Checkbox List",
    description: "Checkbox list items (Multiple Select)",

    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val, // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val, // POSITION

      /**
       * @var {ListItem[]} items
       */
      items: [], // list-item
    },

    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView,
    rendererDefaultData() {
      return [];
    },
  },

  radio: {
    name: "Radio List",
    description: "Radio-Button list items (Single Select)",

    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val, // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val, // POSITION
      /**
       * @var {ListItem[]} items
       */
      items: [], // list-item
    },

    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView,
  },

  label: {
    name: "Label",
    description: "Simple label text show up in your Form",
    disableValue: true,

    configData: {
      forAttribute: null, // `for` for any control? (except the Label)

      // Override here in order to not show the Label
      isShowLabel: false,
    },

    // no need validation
    disableValidation: true,
    fieldComponent: LabelControl,
    configComponent: LabelConfigView,
  },

  button: {
    name: "Button",
    description: "Simple button for your own purpose",
    disableValidation: true,
    disableValue: true,

    configData: {
      buttonClass: STYLES.BUTTON.PRIMARY,
      buttonType: "button", // submit/reset/button/...

      emitEventCode: "", // like: "BtnClicked/clicked/change"
      emitEventData: "", // special data to emit to let you know which button is clicked

      // if this is true => validation will be run before the real invoke method
      isRunValidation: false,

      // Override here in order to not show the Label
      isShowLabel: false,
    },

    fieldComponent: ButtonControl,
    configComponent: ButtonConfigView,
  },

  emptyBlock: {
    name: "Empty Block",
    description: "Empty block to design your section/row.",
    disableValidation: true,
    disableValue: true,

    fieldComponent: EmptyBlockControl,

    configData: {
      // Override here in order to not show the Label
      isShowLabel: false,
    },
  },

  textBlock: {
    name: "Text Block",
    description: "Block with text only (without any controls)",
    disableValidation: true,
    disableValue: true, // if you provide this, the control field value will not be recorded.

    fieldComponent: TextBlockControl,
    configComponent: TextBlockConfigView,

    configData: {
      text: "",
    },
  },
};

const CONTROL_DEFAULT_DATA = {
  // default configuration
  uniqueId: "", // :id
  type: "", // control type...
  name: "", // :name

  label: "",
  subLabel: "",
  isShowLabel: true,

  placeholderText: "", // :placeholder

  containerClass: STYLES.COLUMNS.COL6,
  additionalContainerClass: "", // :class for the <div> outer container

  additionalFieldClass: "", // :class for <input> <select> ...
  additionalLabelClass: "", // :class for the <label>

  defaultValue: "",
  validations: [],
  hideCondition: "",
  mappedField:"",

  // data of the others - coming up later
};

const STATIC_CONTROLS = [
  //  {
  //       "uniqueId": "control-addaf56d-08f9-4c44-9969-f693b74c7760",
  //       "type": "button",
  //       "name": "",
  //       "label": "Button",
  //       "subLabel": "",
  //       "description":"Button",
  //       "isShowLabel": false,
  //       "placeholderText": "",
  //       "containerClass": "col-md-4",
  //       "additionalContainerClass": "",
  //       "additionalFieldClass": "",
  //       "additionalLabelClass": "",
  //       "defaultValue": "",
  //       "validations": [],
  //       "buttonClass": "btn btn-primary",
  //       "buttonType": "button",
  //       "emitEventCode": "",
  //       "emitEventData": "",
  //       "isRunValidation": false
  //     },
  {
    uniqueId: "control-7be0c01a-9b18-411f-9c9a-07eb5efec813",
    type: "emptyBlock",
    name: "",
    label: "Empty Block",
    description: "Horizontal Block for form spacing and detached titles ",
    subLabel: "",
    isShowLabel: false,
    placeholderText: "",
    containerClass: "col-md-12",
    additionalContainerClass: "mt-2 mb-2",
    additionalFieldClass: "",
    additionalLabelClass: "",
    defaultValue: "",
    validations: [],
  },
  {
    uniqueId: "control-57f2738e-6f19-4721-b2a7-c973c41232fd",
    type: "textBlock",
    name: "",
    label: "Text Block",
    description: "Used to add additional information to the form",
    subLabel: "",
    isShowLabel: true,
    placeholderText: "",
    containerClass: "col-md-12",
    additionalContainerClass: "",
    additionalFieldClass: "",
    additionalLabelClass: "",
    defaultValue: "",
    validations: [],
    text: "",
  },
  // {
  //   uniqueId: "control-a4d0e350-b1cf-42ed-bfc4-957655457b0b",
  //   type: "htmlText",
  //   name: "Female",
  //   label: "Female",
  //   isShowLabel: true,
  //   placeholderText: "",
  //   containerClass: "col-md-6 md-layout-item md-size-50",
  //   additionalContainerClass: "",
  //   additionalFieldClass: "",
  //   additionalLabelClass: "",
  //   defaultValue: "",
  //   validations: [],
  //   rows: 3,
  // },
  // {
  //   uniqueId: "control-a4d0e350-b1cf-42ed-bfc4sdf-957655457b32b",
  //   type: "icd11",
  //   name: "Icd 11",
  //   label: "Female",
  //   isShowLabel: true,
  //   placeholderText: "",
  //   containerClass: "col-md-12 md-layout-item md-size-100",
  //   additionalContainerClass: "",
  //   additionalFieldClass: "",
  //   additionalLabelClass: "",
  //   defaultValue: "",
  //   validations: [],
  //   rows: 3,
  // },
//   {
//     uniqueId: "control-a4d0e350-b1cf-42ed-bfc4sdf-95765545734839",
//     type: "imageSelect",
//     name: "Image Select",
//     label: "Image Select",
//     isShowLabel: true,
//     placeholderText: "",
//     containerClass: "col-md-12 md-layout-item md-size-100",
//     additionalContainerClass: "",
//     additionalFieldClass: "",
//     additionalLabelClass: "",
//     defaultValue: "",
//     validations: [],
//     rows: 3,
//   },
];

/**
 * Create new control data
 * @param controlKey
 * @returns {CONTROL_DEFAULT_DATA}
 */
function createControlData(controlKey) {
  const newData = Object.assign(
    {},
    CONTROL_DEFAULT_DATA,
    CONTROLS[controlKey].configData || {}
  );

  // set default data
  newData.label = CONTROLS[controlKey].name;
  newData.type = controlKey;

  // unique ID is a must - I used UUIDv4 => 99% Unique
  newData.uniqueId = "control-" + HELPER.getUUIDv4();

  return newData;
}

export { CONTROLS, CONTROL_DEFAULT_DATA, STATIC_CONTROLS, createControlData };
