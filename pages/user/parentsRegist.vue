<template>
  <div>
    <Header />
    <main>
      <div class="regist">
        <form @submit.prevent="parentsRegist">
          <div data-icon="user-left" data-half>
            <input
              type="text"
              name="nameFirst"
              v-model="input.parentInfo['name-first']"
              placeholder="姓"
            />
            <input
              type="text"
              name="nameLast"
              v-model="input.parentInfo['name-last']"
              placeholder="名"
            />
          </div>
          <div data-icon="user-left" data-half>
            <input
              type="text"
              name="kanaFirst"
              v-model="input.parentInfo['kana-first']"
              placeholder="姓カナ"
            />
            <input
              type="text"
              name="kanaLast"
              v-model="input.parentInfo['kana-last']"
              placeholder="名カナ"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="email"
              name="email"
              v-model="input.parentInfo['mail-address']"
              placeholder="メール"
              ref="input-mail-address"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="password"
              v-model="input.password"
              placeholder="パスワード ※8桁以上"
              ref="input-password"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="checkPassword"
              v-model="input.checkPassword"
              placeholder="確認用パスワード"
              ref="input-checkPassword"
            />
          </div>
          <div data-icon="code-left" data-children>
            <span v-for="(data, index) in input.parentInfo['children']">
              <input
                type="text"
                v-model="input.parentInfo['children'][index]"
                :placeholder="`園児番号${index + 1}`"
                ref="input-childNo"
                @input="childrenAdd"
              />
            </span>
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
    this.input.parentInfo["children"] = [""];
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
      input: {
        parentInfo: this.$ifparent(),
        password: "",
        checkPassword: "",
      },
      validation: {
        path: this.$refs,
        data: [
          {
            name: "mail-address",
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
          {
            name: "checkPassword",
            value: "",
            type: "checkPassword",
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
    childrenAdd() {
      let cData = this.input.parentInfo["children"];
      let lnum = cData.length - 1;
      if (cData[lnum] !== "") {
        cData.push("");
      }
      for (let i = cData.length - 2; i >= 0; --i) {
        if (cData[i] === "") {
          cData.splice(i, 1);
        }
      }
    },
    async parentsRegist() {
      console.log("保護者登録");

      let check = this.input.parentInfo;
      check["password"] = this.input.password;
      check["checkPassword"] = this.input.checkPassword;

      if (this.$validations(check, this.validation)) {
        return;
      }
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
