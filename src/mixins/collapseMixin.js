import Collapse from 'bootstrap/js/dist/collapse';

export default {
  data() {
    return {
      collapse: null,
    };
  },
  methods: {
    closeNavHam() {
      this.collapse.hide();
    },
    toggleNavHam() {
      this.collapse.toggle();
    },
  },
  mounted() {
    this.collapse = new Collapse(this.$refs.collapse, {
      toggle: false,
    });
  },
};
