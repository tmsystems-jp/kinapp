<template>
  <main>
    <div class="login">
      <form @submit.prevent="loginMail">
        <div data-icon="email-left">
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="メール"
          />
        </div>
        <div data-icon="password-left">
          <input
            type="password"
            name="password"
            v-model="password"
            placeholder="パスワード"
          />
        </div>
        <button type="submit">認証</button>
      </form>
      <span>または</span>
      <button type="button" @click="loginGoogle">Googleでログイン</button>
    </div>
  </main>
</template>
<script>
export default {
  layout: "login",
  head() {
    return {
      title: "保護者ログイン Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginMail() {
      // 認証処理
      console.log("★1");
      await this.$store.dispatch("sign/signInWithEmail", {
        email: this.email,
        password: this.password,
        type: "parents",
      });
      console.log("★2");
      const user = this.$store.getters["user"];
      console.log("★3");
      if (user) {
        console.log("認証成功");
        // 初期データ取得
        this.$store.dispatch("db/pullUserInfo");

        console.log("初期データ取得成功");
        // 初期データ取得後、画面遷移
        this.$router.push("/home/parentsHome");
      } else {
        console.log("認証失敗");
      }
    },
    async loginGoogle() {
      console.log("Googleログイン");
      await this.$store.dispatch("sign/signInWithGoogle", { type: "parents" });
      if (this.$store.getters["user"].login) {
        console.log("Google認証成功");
        // 初期データ取得
        this.$store.dispatch("db/pullUserInfo");

        // 初期データ取得後、画面遷移
        this.$router.push("/home/parentsHome");
      } else {
        console.log("Google認証失敗");
      }
    },
  },
};
</script>
