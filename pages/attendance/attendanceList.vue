<template>
  <div>
    <Header />
    <main>
      <div>
        <select v-model="classCd">
          <option
            v-for="value in classList"
            :key="value.value"
            :value="value.value"
          >
            {{ value.name }}
          </option>
        </select>
        <span>Selected: {{ classCd }}</span>
      </div>
      <div>
        <table id="childrenList"></table>
      </div>
    </main>
  </div>
</template>

<script>
import Header from "@/components/mainHeader.vue";
export default {
  mounted() {
    this.$nextTick(() => {
      this.$initialSetting(this.$el);
    });
  },
  components: {
    Header,
  },
  head() {
    return {
      title: "出欠一覧 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/login.css" }],
    };
  },
  data() {
    return {
      classCd: "",
      classList: [],

      childrenList: [],
    };
  },
  methods: {},
  async asyncData(context) {
    await context.store.dispatch("selectDb/fetchItemList");
    const item = context.store.getters["selectDb/itemList"];
    item.push();
    const ret = { classList: item.gender };
    console.log(ret);

    return ret;
  },
};
</script>