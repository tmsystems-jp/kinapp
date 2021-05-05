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
      await this.$store.dispatch("signInWithEmail", {
        email: this.email,
        password: this.password,
        type: "parents",
      });
      const user = this.$store.getters["sign/user"];
      if (user) {
        console.log("認証成功");
        this.$router.push("/home/parentsHome");
      } else {
        console.log("認証失敗");
        //this.$router.push("/");
      }
    },
    async loginGoogle() {
      console.log("Googleログイン");
      await this.$store.dispatch("sign/signInWithGoogle", { type: "parents" });
      if (this.$store.getters["user"].login) {
        console.log("Google認証成功");
        this.$router.push("/home/parentsHome");
        //this.$router.push("/");
      } else {
        console.log("Google認証失敗");
        //this.$router.push("/");
      }
    },
  },
};
</script>
