const api = ({ method, args = {} }) =>
  new Promise((resolve, reject) =>
    frappe.call({ method, args, callback: resolve })
  );

const getFormConfiguration = ({ name = "" }) =>
  api({
    method: "clinical.api.forms.form_builder.get_form_configuration",
    args: {
      name,
    },
  }).then(({ message }) => message);

const saveFormData = ({ formData }) =>
  api({
    method: "clinical.api.forms.form_builder.save_form_data",
    args: {
      form_data: formData,
    },
  }).then(({ message }) => message);

const notify = (message) => {  frappe.show_alert(message, 5);};

export { api, getFormConfiguration, saveFormData, notify };
