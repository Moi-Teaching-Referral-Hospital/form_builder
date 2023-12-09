

import { api } from "./services/frappe";
export const BootstrapVueToasterMixin = {
  data() {
    return {
      socket: null,
    }
  },
  mounted() {
  },
  computed: {

  },
  methods: {

    msgprint(data) {
      this.$bvToast.toast(data.message, {
        title: data.title || '',
        variant: 'secondary',
        solid: true
      });
    },
    show_alert(message) {
      this.$bvToast.toast(message, {
        title: data.title || '',
        variant: 'secondary',
        solid: true
      });
    },
    api({ method, args = {} }) {
      return new Promise((resolve, reject) => {

        const headers = {
          'Content-Type': 'application/json',
        };

        const stringifiedArgs = stringifyNestedObjects(args);

        axios
          .post(getUrl(method), stringifiedArgs, { headers, withCredentials: true })
          .then((response) => resolve(response.data))
          .catch((error) => reject(error));
      });


    }
  }
}
