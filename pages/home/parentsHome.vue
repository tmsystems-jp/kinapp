<template>
  <main>
    <div>
      <p>ユーザ：{{ user.email }}</p>
    </div>
    <div>
      <label>お知らせ</label>
      <table></table>
      <br />
    </div>
    <div>
      <label>行事予定</label>
      <table></table>
    </div>
  </main>
</template>

<script>
import { db } from "~/plugins/firebase";
export default {
  layout: "main",
  head() {
    return {
      title: "保護者Home Kinapp",
    };
  },
  mounted() {
    const database = db.collection("principal").doc("Default");
    const payload = {
      db: database,
      data: this.parentInfo,
    };
  },
  computed: {
    user() {
      const user = this.$store.getters["user"];
      return user;
    },
  },
};
</script>