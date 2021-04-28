<template>
  <main>
    <div>
      <label>●●クラス</label>
    </div>
    <div>
      <label>欠席・遅刻早退予定</label>
      <table></table>
    </div>
  </main>
</template>
<script>
export default {
  layout: "staff",
  head() {
    return {
      title: "保育士ホーム Kinapp",
    };
  },
};
</script>