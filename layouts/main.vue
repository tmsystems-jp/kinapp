<template>
  <div class="main-container">
    <transition-group name="page" mode="out-in" appear>
      <Header
        ref="Header"
        key="Header"
        :actionData="actionData"
        @status-change="statusChange"
      />
      <pFooter
        ref="pFooter"
        v-if="parentsType"
        key="pFooter"
        :actionData="actionData"
        @status-change="statusChange"
      />
      <sFooter
        ref="sFooter"
        v-if="staffType"
        key="sFooter"
        :actionData="actionData"
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
      actionData: {
        edit: false,
        cancel: false,
        save: false,
      },
    };
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
    statusChange(data) {
      this.actionData = data;
      this.$refs.Header.statusChange();
      if (this.staffType) {
        this.$refs.sFooter.statusChange();
      }
      if (this.parentsType) {
        this.$refs.pFooter.statusChange();
      }
      if (typeof this.$refs.Nuxt.$children[0]["statusChange"] == "function") {
        this.$refs.Nuxt.$children[0].statusChange(this.actionData);
      }
      this.actionData.cancel = false;
      this.actionData.save = false;
    },
  },
  computed: {
    ...mapState("alert", ["isActive"]),
  },
  mounted() {
    if (typeof statusChange == "function") {
      this.$refs.Nuxt.$children[0].statusChange(this.actionData);
    }
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
