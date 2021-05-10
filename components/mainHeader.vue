<template>
  <header>
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
  data() {
    return {
      title: "きなっぷ",
    };
  },
  mounted() {
    const user = this.$store.getters["user"];
    if (user.login) {
      console.log("load");
    }
  },
  methods: {
    edit() {
      this.statusType.edit = true;
      this.$emit("status-change", this.statusType);
      console.log("edit");
    },
  },
  extends: {
    props: ["statusType"],
  },
};
</script>