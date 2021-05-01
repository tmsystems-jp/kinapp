<template>
  <div class="main-container" :class="{ pc: $isPC }">
    <transition-group name="page" mode="out-in" appear>
      <Nuxt ref="nuxtArea" key="Nuxt" />
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
      this.$nuxt.$emit("alertModelEvent", data);
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
