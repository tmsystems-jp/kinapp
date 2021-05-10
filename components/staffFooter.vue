<template>
  <footer v-bind:data-status="status">
    <nav>
      <button data-icon="home" data-text="ホーム" data-ibtn></button>
      <button data-icon="clock" data-text="出欠確認" data-ibtn></button>
      <button data-icon="staffinfo" data-text="職員情報" data-ibtn></button>
      <button data-icon="childrens" data-text="園児情報" data-ibtn></button>
      <button data-icon="notice" data-text="お知らせ" data-ibtn></button>
    </nav>
    <div>
      <button>キャンセル</button>
      <button>保存</button>
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