<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Header
        key="Header"
        :statusType="statusType"
        @status-change="statusChange($event, data)"
      />
      <pFooter v-if="parentsType" key="pFooter" :statusType="statusType" />
      <sFooter v-if="staffType" key="sFooter" :statusType="statusType" />
      <Nuxt key="Nuxt" :statusType="statusType" />
    </transition-group>
    <Modal v-if="this.isActive" key="Modal" @event="alertEvent"></Modal>
  </div>
</template>
<script>
import Header from "@/components/mainHeader.vue";
import pFooter from "@/components/parentsFooter.vue";
import sFooter from "@/components/staffFooter.vue";
import { mapState } from "vuex";
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
      parentsType: false,
      statusType: {
        edit: false,
      },
    };
  },
  methods: {
    alertEvent(data) {
      var evName = "alertModelEvent";
      this.$nuxt.$emit(evName, data);
    },
    statusChange(data) {
      this.statusType = data;
    },
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