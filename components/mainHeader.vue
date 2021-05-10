<template>
  <header v-bind:data-status="status">
    <nav>
      <button
        data-icon="edit"
        data-type="right"
        data-text="編集"
        data-ibtn
        @click="edit"
      ></button>
    </nav>
    <h2>{{ title }}</h2>
  </header>
</template>
<script>
export default {
  extends: {
    props: ["statusType"],
  },
  data() {
    return {
      title: "きなっぷ",
      status: "off",
    };
  },
  mounted() {
    const user = this.$store.getters["user"];
    if (user.login) {
      console.log("load");
    }
    if (this.statusType.edit) {
      this.status = "edit";
    } else {
      this.status = "off";
    }
  },
  methods: {
    edit() {
      this.statusType.edit = true;
      this.$emit("status-change", this.statusType);
    },
    statusChange() {
      if (this.statusType.edit) {
        this.status = "edit";
      } else {
        this.status = "off";
      }
    },
  },
};
</script>