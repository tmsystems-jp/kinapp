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
              v-model="password"
              placeholder="パスワード ※8桁以上"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="checkPassword"
              v-model="checkPassword"
              placeholder="確認用パスワード"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="text"
              name="childNo"
              v-model="parentInfo['children']"
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
      parentInfo: this.$ifparent(),
      password: "",
      checkPassword: "",
    };
  },
  methods: {
    async parentsRegist() {
      console.log("保護者登録");

      const authData = {
        email: this.parentInfo["mail-address"],
        password: this.password,
        type: "parents",
      };

      // Authentication 登録
      await this.$store.dispatch("sign/emailRegist", authData);

      // 保護者情報登録(datasture)
      const payload = {
        principalDocId: "",
        dbName: "parent",
        setData: this.parentInfo,
      };
      await this.$store.dispatch("db/insert", payload);

      // // 認証
      await this.$store.dispatch("sign/signInWithEmail", authData);

      const user = this.$store.getters["user"];
      console.log(user);
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
  },
};
</script>
