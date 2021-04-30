<template>
  <transition-group name="page" mode="out-in" appear>
    <Nuxt key="Nuxt" />
  </transition-group>
</template>
<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  transition: {
    name: "page",
    mode: "out-in",
  },
}
</script>