<template>
  <div>
    <Header />
    <main>
      <div class="userRegist">
        <form @submit.prevent="parentsRegist">
          <div data-icon="password-left">
            <input
              type="text"
              name="nameFirst"
              v-model="parentInfo['name-first']"
              placeholder="姓"
            />
            <input
              type="text"
              name="nameLast"
              v-model="parentInfo['name-last']"
              placeholder="名"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="text"
              name="kanaFirst"
              v-model="parentInfo['kana-first']"
              placeholder="姓カナ"
            />
            <input
              type="text"
              name="kanaLast"
              v-model="parentInfo['kana-last']"
              placeholder="名カナ"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="email"
              name="email"
              v-model="parentInfo['mail-address']"
              placeholder="メール"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="password"
              v-model="parentInfo['password']"
              placeholder="パスワード ※8桁以上"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="checkPassword"
              v-model="parentInfo['checkPassword']"
              placeholder="確認用パスワード"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="text"
              name="childNo"
              v-model="parentInfo['childNo']"
              placeholder="園児番号"
            />
          </div>
          <button type="submit">登録</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import { db } from "~/plugins/firebase";
import Header from "@/components/loginHeader.vue";

export default {
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  components: {
    Header,
  },
  head() {
    return {
      title: "保護者登録 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      parentInfo: {
        "parent-cd": "",
        "name-first": "",
        "name-last": "",
        "kana-first": "",
        "kana-last": "",
        "mail-address": "",
        children: [],
        password: "",
        checkPassword: "",
      },
    };
  },
  methods: {
    async parentsRegist() {
      console.log("保護者登録");

      const authData = {
        email: this.parentInfo["mail-address"],
        password: this.parentInfo["password"],
        type: "parents",
      };

      // Authentication 登録
      await this.$store.dispatch("sign/emailRegist", authData);

      // 保護者情報登録(datasture)
      const principalDocId = this.$store.getters["sign/user"];
      const database = db
        .collection("principal")
        .doc(principalDocId)
        .collection("staff");
      const payload = {
        db: database,
        data: this.parentInfo,
      };
      await this.$store.dispatch("registDb/parentRegist", payload);

      // 認証
      await this.$store.dispatch("sign/signInWithEmail", authData);
    },
  },
};
</script>
