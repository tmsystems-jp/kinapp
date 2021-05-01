<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Header key="Header" />
      <pFooter v-if="parentsType" key="pFooter" />
      <sFooter v-if="staffType" key="sFooter" />
      <Nuxt key="Nuxt" />
    </transition-group>
    <Modal v-if="this.isActive" key="Modal" @event="alertEvent"></Modal>
  </div>
</template>
<script>
import Header from "@/components/mainHeader.vue";
import pFooter from "@/components/parentsFooter.vue";
import sFooter from "@/components/staffFooter.vue";
import { mapState, mapMutations, mapActions } from "vuex";
import Modal from "@/components/alertModal.vue";
export default {
  components: {
    Header,
    pFooter,
    sFooter,
    Modal,
  },
  data() {
    return {
      staffType: true,
      parentsType: true,
    };
  },
  methods: {
    alertEvent(data){
      this.$nuxt.$emit('alertModelEvent',data);
    }
  },
  computed: {
    ...mapState("alert", ["isActive"]),
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
};
</script>