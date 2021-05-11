<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Header
        ref="Header"
        key="Header"
        :statusType="statusType"
        @status-change="statusChange"
      />
      <pFooter
        ref="pFooter"
        v-if="parentsType"
        key="pFooter"
        :statusType="statusType"
        @status-change="statusChange"
      />
      <sFooter
        ref="sFooter"
        v-if="staffType"
        key="sFooter"
        :statusType="statusType"
        @status-change="statusChange"
      />
      <Nuxt ref="Nuxt" key="Nuxt" />
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
      this.$refs.Header.statusChange();
      if (this.staffType) {
        this.$refs.sFooter.statusChange();
      }
      if (this.parentsType) {
        this.$refs.pFooter.statusChange();
      }
      this.$refs.Nuxt.$children[0].statusChange(this.statusType);
    },
  },
  computed: {
    ...mapState("alert", ["isActive"]),
  },
  mounted() {
    this.$refs.Nuxt.$children[0].statusChange(this.statusType);
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