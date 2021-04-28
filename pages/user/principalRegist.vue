<template>
  <div>
    <Header />
    <main>
      <div class="principalRegist">
        <form @submit.prevent="regist">
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="code"
              v-model="principalInfo['principal-id']"
              placeholder="幼稚園コード"
            />
          </div>
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="name"
              v-model="principalInfo['name']"
              placeholder="幼稚園名"
            />
          </div>
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="post"
              v-model="principalInfo['post']"
              placeholder="郵便番号"
            />
          </div>
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="address"
              v-model="principalInfo['address']"
              placeholder="住所"
            />
          </div>
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="tel"
              v-model="principalInfo['tel']"
              placeholder="電話番号"
            />
          </div>
          <div v-if="page.edit" data-icon="email-left">
            <input
              type="text"
              name="fax"
              v-model="principalInfo['fax']"
              placeholder="FAX番号"
            />
          </div>
          <div v-if="page.regist" data-icon="email-left">
            <input
              type="email"
              name="email"
              v-model="principalInfo['email']"
              placeholder="メール"
            />
          </div>
          <div v-if="page.regist" data-icon="password-left">
            <input
              type="password"
              name="password"
              v-model="principalInfo['password']"
              placeholder="パスワード ※8桁以上"
            />
          </div>
          <div v-if="page.regist" data-icon="password-left">
            <input
              type="password"
              name="checkPassword"
              v-model="principalInfo['checkPassword']"
              placeholder="確認用パスワード"
            />
          </div>
          <button v-if="page.regist" type="submit">登録</button>
          <button v-if="page.edit" type="submit" @click="update">更新</button>
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
      title: "幼稚園登録 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      principalInfo: {
        address: "",
        "admin-cd": "",
        "default-password": "",
        fax: "",
        kana: "",
        "mail-address": "",
        name: "",
        "pin-code": "",
        post: "",
        "principal-id": "",
        tel: "",
        password: "",
        checkPassword: "",
      },
      page: {
        edit: false,
        regist: true,
        code: false,
      },
    };
  },
  methods: {
    async regist() {
      console.log("幼稚園登録");

      const authData = {
        email: this.principalInfo["mail-address"],
        password: this.principalInfo["password"],
        type: "staff",
      };

      const staffInfo = {
        authority: "1",
        "home-room": { item: "", name: "", value: 0 },
        "kana-first": "",
        "kana-last": "",
        "mail-address": this.principalInfo["mail-address"],
        "name-first": this.principalInfo["name-first"],
        "name-last": "管理者",
        "staff-cd": "ADMIN",
      };

      const principalDb = db.collection("principal");

      // Authentication 登録
      await this.$store.dispatch("sign/emailRegist", authData);

      // 幼稚園情報登録(datasture)
      this.principalInfo["principal-id"] = "A001";
      this.principalInfo["admin-cd"] = "ADMIN";
      this.principalInfo["default-password"] = "password";
      this.principalInfo["pin-code"] = (
        "000000" +
        (Math.floor(Math.random() * 999999) + 1)
      ).slice(-6);

      const payload = {
        db: principalDb,
        data: this.principalInfo,
      };
      await this.$store.dispatch("registDb/principalRegist", payload);

      // 管理者情報登録(staff)
      const principalInfo = this.$store.getters["principal"];
      const staffDb = principalDb
        .doc(principalInfo["doc-id"])
        .collection("staff");
      const staffPayload = {
        db: staffDb,
        data: staffInfo,
      };
      await this.$store.dispatch("registDb/staffRegist", staffPayload);

      // 認証処理
      await this.$store.dispatch("sign/signInWithEmail", authData);
    },

    async update() {
      const principalDb = db.collection("principal");
      const payload = {
        db: principalDb,
        data: this.principalInfo,
      };
      await this.$store.dispatch("updateDb/pricipalUpdate", payload);
    },
  },
};
</script>