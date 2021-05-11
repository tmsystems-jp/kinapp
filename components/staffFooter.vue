<template>
  <footer v-bind:data-status="status">
    <nav>
      <button data-icon="home" data-text="ホーム" data-ibtn></button>
      <button data-icon="clock" data-text="出欠確認" data-ibtn></button>
      <button data-icon="staffinfo" data-text="職員情報" data-ibtn></button>
      <button data-icon="childrens" data-text="園児情報" data-ibtn></button>
      <button data-icon="notice" data-text="お知らせ" data-ibtn></button>
    </nav>
    <div class="edit">
      <button
        data-icon="cancel"
        data-text="キャンセル"
        data-ibtnt
        @click="cancel"
      ></button>
      <button data-icon="save" data-text="保 存" data-ibtnt></button>
    </div>
  </footer>
</template>
<script>
export default {
  extends: {
    props: ["statusType"],
  },
  data() {
    return {
      status: "off",
    };
  },
  mounted() {
    if (this.statusType.edit) {
      this.status = "edit";
    } else {
      this.status = "off";
    }
  },
  methods: {
    cancel() {
      this.statusType.edit = false;
      this.$emit("status-change", this.statusType);
    },
    save() {},
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