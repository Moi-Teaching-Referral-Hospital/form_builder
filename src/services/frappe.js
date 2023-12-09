import axios from "axios";

const getUrl =(method) =>{
  return  `${localStorage.getItem('appBaseUrl')}/api/method/${method}`
}

const stringifyNestedObjects = (input) => {
  if (typeof input === 'object' && input !== null) {
    for (let key in input) {
      if (typeof input[key] === 'object' && input[key] !== null) {
        input[key] = JSON.stringify(input[key]);
      }
    }
  }
  return input;
}

const api = ({ method, args = {} }) =>
  new Promise((resolve, reject) => {
   
    const headers = {
      'Content-Type': 'application/json',
    };

    const stringifiedArgs = stringifyNestedObjects(args);

    axios
      .post(getUrl(method), stringifiedArgs, { headers, withCredentials: true })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });

const fetch = ({ method, args = {} }) =>
  new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(getUrl(method), { headers, withCredentials: true, params: args })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });



export const fetchx = ({ method, args = {} }) =>
  new Promise((resolve, reject) =>
    x.call({ method, type: 'GET', args, callback: resolve })
  );

const getFormConfiguration = ({ name = "" }) =>
  fetch({
    method: "clinical.api.forms.form_builder.get_form_configuration",
    args: {
      name,
    },
  }).then(({ message }) => message);

const deleteRepo = ({ name = "" }) =>

  fetch({
    method: "clinical.api.forms.form_builder.delete_repo",
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

const notify = (message) => {
  // 
};

const getList = (payload) =>
  api({
    method: "mtrh_dev.api.supplier-portal.base.base.get_list",
    args: { payload },
  });

const getDoctypeFields = (payload) =>
  api({
    method: "clinical.api.doctype.meta.get_doctype_fields",
    args: { payload },
  }).then(({ message }) => message);

export {
  api,
  getFormConfiguration,
  saveFormData,
  notify,
  getList,
  getDoctypeFields,
  deleteRepo,
};
