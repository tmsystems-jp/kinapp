<template>
  <main>
    <nav>
      <ul>
        <li>
          <button @click="$navigate('login/parentsLogin')">
            <p>保護者</p>
          </button>
        </li>
        <li>
          <p>選択してください。</p>
        </li>
        <li>
          <button @click="$navigate('login/staffLogin')">
            <p>保育士</p>
          </button>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: "トップページ Kinapp",
      link: [{ rel: "stylesheet", href: "/css/index.css" }],
    };
  },
  mounted() {
    this.$nextTick(() => {
      if ("vuex" in localStorage) {
        localStorage.removeItem("vuex");
      }
      if ("storege" in localStorage) {
        localStorage.removeItem("storege");
      }
    });
    this.$store.dispatch("db/pullDefault");
  },
};
</script>
