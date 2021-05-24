<template>
  <main>
    <div class="login">
      <form @submit.prevent="loginMail" novalidate="novalidate">
        <div data-icon="email-left">
          <input
            type="email"
            v-model="input.email"
            placeholder="メール"
            ref="input-email"
          />
        </div>
        <div data-icon="password-left">
          <input
            type="password"
            v-model="input.password"
            placeholder="パスワード"
            ref="input-password"
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
      input: {
        email: "",
        password: "",
      },
      validation: {
        path: this.$refs,
        data: [
          {
            name: "email",
            value: "",
            type: "email",
            required: true,
          },
          {
            name: "password",
            value: "",
            type: "password",
            required: true,
          },
        ],
      },
    };
  },
  methods: {
    alertModelEvent(key) {
      this.$store.dispatch("alert/closeAlert");
    },
    async loginMail() {
      if (this.$validations(this.input, this.validation)) {
        return;
      }
      // 認証処理
      await this.$store.dispatch("sign/signInWithEmail", {
        email: this.input.email,
        password: this.input.password,
        type: "parents",
      });
      const user = this.$store.getters["user"];
      if (user) {
        console.log("認証成功");
        // 初期データ取得
        this.$store.dispatch("db/pullUserInfo");
        // 初期データ取得後、画面遷移
        this.$router.push("/home/parentsHome");
      } else {
        console.log("認証失敗");
      }
    },
    async loginGoogle() {
      await this.$store.dispatch("sign/signInWithGoogle", { type: "parents" });
      if (this.$store.getters["user"].login) {
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
