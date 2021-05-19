<template>
  <footer v-bind:data-status="status">
    <nav>
      <button data-icon="home" data-text="ホーム" data-ibtn></button>
      <button
        data-icon="clock"
        data-text="出欠確認"
        data-ibtn
        @click="$navigate('../attendance/attendanceList')"
      ></button>
      <button data-icon="childrens" data-text="園児情報" data-ibtn></button>
      <button data-icon="notice" data-text="お知らせ" data-ibtn></button>
      <button data-icon="setting" data-text="設定" data-ibtn></button>
    </nav>
    <div class="edit">
      <button
        data-icon="cancel"
        data-text="キャンセル"
        data-ibtnt
        @click="cancel"
      ></button>
      <button
        data-icon="save"
        data-text="保 存"
        data-ibtnt
        @click="save"
      ></button>
    </div>
  </footer>
</template>
<script>
export default {
  extends: {
    props: ["actionData"],
  },
  data() {
    return {
      status: "off",
    };
  },
  mounted() {
    if (this.actionData.edit) {
      this.status = "edit";
    } else {
      this.status = "off";
    }
  },
  methods: {
    cancel() {
      this.actionData.edit = false;
      this.actionData.cancel = true;
      this.$emit("status-change", this.actionData);
    },
    save() {
      this.actionData.edit = false;
      this.actionData.save = true;
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
