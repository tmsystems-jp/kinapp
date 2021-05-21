<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Nuxt ref="Nuxt" key="Nuxt" />
    </transition-group>
    <Modal v-if="this.isActive" key="Modal" @event="alertEvent"></Modal>
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
  methods: {
    alertEvent(data) {
      if (
        typeof this.$refs.Nuxt.$children[0]["alertModelEvent"] == "function"
      ) {
        this.$refs.Nuxt.$children[0].alertModelEvent(data);
      } else {
        this.$store.dispatch("alert/closeAlert");
      }
    },
  },
  computed: {
    ...mapState("alert", ["isActive"]),
  },
  transition: {
    name: "page",
    mode: "out-in",
  },
};
</script>
