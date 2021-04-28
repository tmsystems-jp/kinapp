<template>
  <footer>
    <nav>
      <button
        data-icon="home"
        data-text="ホーム"
        data-ibtn
        @click="$navigate('../home/parentsHome')"
      ></button>
      <button data-icon="clock" data-text="出欠確認" data-ibtn></button>
      <button data-icon="staffinfo" data-text="職員情報" data-ibtn></button>
      <button
        data-icon="childrens"
        data-text="園児情報"
        data-ibtn
        @click="$navigate('../user/childrenRegist')"
      ></button>
      <button data-icon="notice" data-text="お知らせ" data-ibtn></button>
    </nav>
  </footer>
</template>