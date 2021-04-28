<template>
  <transition-group name="page" mode="out-in" appear>
    <Header key="Header" />
    <pFooter v-if="parentsType" key="pFooter" />
    <sFooter v-if="staffType" key="sFooter" />
    <Nuxt key="Nuxt" />
  </transition-group>
</template>
<script>
import Header from "@/components/mainHeader.vue";
import pFooter from "@/components/parentsFooter.vue";
import sFooter from "@/components/staffFooter.vue";
export default {
  components: {
    Header,
    pFooter,
    sFooter,
  },
  data() {
    return {
      staffType: true,
      parentsType: true,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
      const user = this.$store.getters["user"];
      if (user.type) {
        if (user.type === "parents") {
          this.staffType = false;
        } else if (user.type === "staff") {
          this.parentsType = false;
        }
      }
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