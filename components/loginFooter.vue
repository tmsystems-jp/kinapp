<template>
  <footer>
    <button v-if="parents" @click="$navigate('../user/parentsRegist')">
      初めての方
    </button>
    <button v-if="principal" @click="$navigate('../user/principalRegist')">
      初めての方
    </button>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      parents: false,
      principal: false,
    };
  },
  mounted() {
    if (this.$route.path.match(/staff/)) {
      this.principal = true;
    } else {
      this.parents = true;
    }
  },
};
</script>
