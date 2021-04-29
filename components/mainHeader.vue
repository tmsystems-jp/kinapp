<template>
  <header>
    <nav>
      <button
        data-icon="logout"
        data-type="right"
        data-text="ログアウト"
        data-ibtn
        @click="$signOut"
      ></button>
    </nav>
    <h2>きなっぷ</h2>
  </header>
</template>
<script>
export default {
  mounted() {
    const user = this.$store.getters["user"];
    if (user.login) {
      console.log("load");
    }
    this.$nextTick(() => {});
  },
};
</script>