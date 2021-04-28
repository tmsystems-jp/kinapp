<template>
  <transition-group name="page" mode="out-in" appear>
    <Header key="Header" />
    <Footer key="Footer" />
    <Nuxt key="Nuxt" />
  </transition-group>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/staffFooter.vue";
export default {
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  transition: {
    name: "page",
    mode: "out-in",
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
  layoutTransition: {
    name: "page",
    mode: "out-in",
  },
};
</script>