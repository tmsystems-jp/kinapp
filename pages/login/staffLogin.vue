<template>
  <main>
    <div class="login">
      <form @submit.prevent="login">
        <div data-icon="school-left">
          <input
            type="text"
            v-model="input['principal-cd']"
            name="schoolCode"
            placeholder="園コード"
            ref="input-principal-cd"
          />
        </div>
        <div data-icon="staff-left">
          <input
            type="text"
            name="idCode"
            v-model="input['staff-cd']"
            placeholder="職員コード"
            ref="input-staff-cd"
          />
        </div>
        <div data-icon="password-left">
          <input
            type="password"
            name="password"
            v-model="input['password']"
            placeholder="パスワード"
            ref="input-password"
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
      input: {
        "principal-cd": "",
        "staff-cd": "",
        password: "",
      },
      validation: {
        path: this.$refs,
        data: [
          {
            name: "principal-cd",
            value: "",
            type: "text",
            required: true,
          },
          {
            name: "staff-cd",
            value: "",
            type: "text",
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
    async login() {
      console.log("職員ログイン");
      // 入力チェック
      if (this.$validations(this.input, this.validation)) {
        return;
      }
      // スタッフ情報取得
      const payload = {
        principalDocId: "",
        dbName: "principal",
        strWhere: [
          {
            columnName: "principal-cd",
            strCompare: "==",
            compareVal: this.input["principal-cd"],
          },
        ],
      };

      let principalInfo = null;
      await this.$store
        .dispatch("db/selectByWhere", payload)
        .then((res) => {
          principalInfo = res;
        })
        .catch((error) => {
          console.log("error1 : " + error);
        });
      // 職員情報取得
      const staffPayload = {
        principalDocId: principalInfo.id,
        dbName: "staff",
        strWhere: [
          {
            columnName: "staff-cd",
            strCompare: "==",
            compareVal: this.input["staff-cd"],
          },
        ],
      };
      let staffInfo = null;
      await this.$store
        .dispatch("db/selectByWhere", staffPayload)
        .then((res) => {
          staffInfo = res;
        })
        .catch((error) => {
          console.log("error1 : " + error);
        });
      // 認証処理
      console.log();
      await this.$store.dispatch("sign/signInWithEmail", {
        email: staffInfo["mail-address"],
        password: this.password,
        type: "staff",
      });
      const user = this.$store.getters["user"];
      if (user) {
        console.log("認証成功");
        // 初期データ取得
        await this.$store.dispatch("db/pullUserInfo");
        // 初期データ取得後、画面遷移
        this.$router.push("/home/staffHome");
      } else {
        console.log("認証失敗");
      }
    },
  },
};
</script>
