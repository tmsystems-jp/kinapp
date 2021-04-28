<template>
  <div>
    <Header />
    <main>
      <div class="principalRegist">
        <form @submit.prevent="regist">
          <div data-icon="email-left">
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="staffCd"
              placeholder="職員コード"
            />
          </div>
          <div data-icon="email-left">
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="name"
              placeholder="姓"
            />
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="name"
              placeholder="名"
            />
          </div>
          <div data-icon="email-left">
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="name"
              placeholder="姓カナ"
            />
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="name"
              placeholder="名カナ"
            />
          </div>
          <div data-icon="email-left">
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="authority"
              placeholder="スタッフ分類"
            />
          </div>
          <div data-icon="email-left">
            <input
              v-model="staffInfo['staff-cd']"
              type="text"
              name="classCd"
              placeholder="担当クラス"
            />
          </div>
          <button v-if="page.regist" type="submit">登録</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";

export default {
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  head() {
    return {
      title: "職員登録 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      staffInfo: {
        authority: "",
        "home-room": { item: "", name: "", value: 0 },
        "kana-first": "",
        "kana-last": "",
        "mail-address": "",
        "name-first": "",
        "name-last": "",
        "staff-cd": "",
      },
    };
  },
  methods: {
    async regist() {
      console.log("職員登録");

      const database = db
        .collection("principal")
        .doc(this.kinderInfo["doc-id"])
        .collection("staff");
      const payload = {
        db: database,
        data: this.staffInfo,
      };
      await this.$store.dispatch("updateDb/staffUpdate", payload);
    },
  },
};
</script>