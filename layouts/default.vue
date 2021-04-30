<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Nuxt key="Nuxt" />
      <!-- <Modal v-if="$store.getters['alert/isActive']"></Modal> -->
    </transition-group>
    <Modal v-if="this.isActive" key="Modal"></Modal>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Modal from "@/components/alertModal.vue";
export default {
  components: {
    Modal,
  },
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  computed: {
    ...mapState("alert", ["message", "isActive"]),
  },
  transition: {
    name: "page",
    mode: "out-in",
  },
};
</script>