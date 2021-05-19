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
    props: ["actionData"],
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
    if (this.actionData.edit) {
      this.status = "edit";
    } else {
      this.status = "off";
    }
  },
  methods: {
    edit() {
      this.actionData.edit = true;
      this.$emit("status-change", this.actionData);
    },
    statusChange() {
      if (this.actionData.edit) {
        this.status = "edit";
      } else {
        this.status = "off";
      }
    },
  },
};
</script>
