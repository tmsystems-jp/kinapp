<template>
  <div>
    <Header />
    <main>
      <form @submit.prevent="regist">
        <div v-if="page.edit">
          <div data-icon="email-left">
            <input
              type="text"
              name="code"
              v-model="principalInfo['principal-id']"
              placeholder="幼稚園コード"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="text"
              name="name"
              v-model="principalInfo['name']"
              placeholder="幼稚園名"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="text"
              name="post"
              v-model="principalInfo['post']"
              placeholder="郵便番号"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="text"
              name="address"
              v-model="principalInfo['address']"
              placeholder="住所"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="text"
              name="tel"
              v-model="principalInfo['tel']"
              placeholder="電話番号"
            />
          </div>
          <div data-icon="email-left">
            <input
              type="text"
              name="fax"
              v-model="principalInfo['fax']"
              placeholder="FAX番号"
            />
          </div>
          <button type="submit" @click="update">更新</button>
        </div>
        <div v-if="page.code">
          <dl>
            <dt>
              <h3>本人確認</h3>
              <p>
                セキュリティ保護の為､Kinappでは本人であることを確認する必要があります。６桁のパスコードが記載されているメッセージが登録されたメールアドレスに送信されていますので確認後､以下にご入力して下さい｡
              </p>
            </dt>
            <dd>
              <div>
                <input
                  name="code0"
                  v-model="code[0]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
              <div>
                <input
                  name="code1"
                  v-model="code[1]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
              <div>
                <input
                  name="code2"
                  v-model="code[2]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
              <div>
                <input
                  name="code3"
                  v-model="code[3]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
              <div>
                <input
                  name="code4"
                  v-model="code[4]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
              <div>
                <input
                  name="code5"
                  v-model="code[5]"
                  type="number"
                  maxlength="1"
                  placeholder="－"
                />
              </div>
            </dd>
          </dl>
          <button type="submit">確認</button>
        </div>
        <div v-if="page.regist">
          <div data-icon="email-left">
            <input
              type="email"
              name="email"
              v-model="principalInfo['email']"
              placeholder="メール"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="password"
              v-model="principalInfo['password']"
              placeholder="パスワード ※8桁以上"
            />
          </div>
          <div data-icon="password-left">
            <input
              type="password"
              name="checkPassword"
              v-model="principalInfo['checkPassword']"
              placeholder="確認用パスワード"
            />
          </div>
          <button type="submit">登録</button>
        </div>
      </form>
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
      title: "園登録 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      code: ["", "", "", "", "", ""],
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
      if (this.page.regist) {
        if (
          this.principalInfo["password"] !== this.principalInfo["checkPassword"]
        ) {
          return;
        }
        const authData = {
          email: this.principalInfo["mail-address"],
          password: this.principalInfo["password"],
          type: "principal",
        };
        // Authentication 登録
        await this.$store.dispatch("sign/setRegist", authData);

        this.pageStatus("code");
      } else if (this.page.code) {
        this.pageStatus("edit");
      } else if (this.page.edit) {
        this.pageStatus("regist");
      }
    },
    pageStatus(type) {
      this.page.edit = false;
      this.page.regist = false;
      this.page.code = false;
      this.page[type] = true;
    },
    async registss() {
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
