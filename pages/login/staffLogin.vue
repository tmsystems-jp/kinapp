<template>
  <div>
    <Header />
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
  head() {
    return {
      title: "保育士ログイン Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  components: {
    Header,
  },
  data() {
    return {
      schoolCode: "",
      idCode: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$router.push("/home/staffHome");
      console.log(this.schoolCode);
      console.log(this.idCode);
      console.log(this.password);
    },
  },
};
</script>
