<template>
  <transition name="page" mode="out-in" appear>
    <Nuxt />
  </transition>
</template>
<script>
export default {
  transition: {
    name: "page",
    mode: "out-in",
  },
  pageTransition: {
    name: "page",
    mode: "out-in",
  },
  layoutTransition: {
    name: "page",
    mode: "out-in",
  },
};
</script>