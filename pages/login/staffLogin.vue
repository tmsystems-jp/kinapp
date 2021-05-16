<template>
  <main>
    <div>
      <form @submit.prevent="login">
        <div data-icon="school-left">
          <input
            type="number"
            v-model="schoolCode"
            name="schoolCode"
            placeholder="園コード"
          />
        </div>
        <div data-icon="staff-left">
          <input
            type="number"
            name="idCode"
            v-model="idCode"
            placeholder="職員コード"
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
    </div>
  </main>
</template>
<script>
export default {
  layout: "login",
  head() {
    return {
      title: "保育士ログイン Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      schoolCode: "",
      idCode: "",
      password: "",
    };
  },
  methods: {
    async login() {
      // スタッフ情報取得
      await this.$store.dispatch("db/signInWithEmail", {});

      // 認証処理
      await this.$store.dispatch("sign/signInWithEmail", {
        email: this.email,
        password: this.password,
        type: "staff",
      });
      const user = this.$store.getters["user"];
      if (user) {
        console.log("認証成功");
        // 初期データ取得
        this.$store.dispatch("db/pullUserInfo");

        // 初期データ取得後、画面遷移
        this.$router.push("/home/staffHome");
      } else {
        console.log("認証失敗");
      }
    },
  },
};
</script>
