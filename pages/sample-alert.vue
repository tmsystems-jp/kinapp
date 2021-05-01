<template>
  <main>
    <div>
      <button @click="alert">アラート表示</button>
      <ul>
        <li>
          <span>title</span>
          <input type="text" v-model="title" />
        </li>
        <li>
          <span>message</span>
          <textarea v-model="message"></textarea>
        </li>
        <li>
          <label
            ><input
              type="radio"
              value="one"
              v-model="btntype"
              @change="butChange"
            />one</label
          >
          <label
            ><input
              type="radio"
              value="two"
              v-model="btntype"
              @change="butChange"
            />two</label
          >
          <label
            ><input
              type="radio"
              value="list"
              v-model="btntype"
              @change="butChange"
            />list</label
          >
          <label
            ><input
              type="radio"
              value="list-ec"
              v-model="btntype"
              @change="butChange"
            />list-ec</label
          >
        </li>
        <li>
          <div v-for="(data, index) in button" :key="index">
            <span>key</span>
            <input type="text" v-model="data.key" />
            <span>view</span>
            <input type="text" v-model="data.view" />
            <span>color</span>
            <input type="text" v-model="data.style.color" />
            <span>bold</span>
            <label
              ><input
                type="radio"
                :value="false"
                v-model="data.style.bold"
              />普通</label
            >
            <label
              ><input
                type="radio"
                :value="true"
                v-model="data.style.bold"
              />太文字</label
            >
          </div>
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
export default {
  head() {
    return {
      title: "alert",
    };
  },
  data() {
    return {
      title: "保存完了",
      message: "データの保存が完了しました。",
      btntype: "one",
      button: [
        { key: "close", view: "閉じる", style: { color: "", bold: false } },
      ],
    };
  },
  created() {
    this.$nuxt.$on("alertModelEvent", (data) => {
      this.alertModelEvent(data);
    });
  },
  methods: {
    butChange(event) {
      if (event.target.value === "one") {
        this.title = "保存完了";
        this.message = "データの保存が完了しました。";
        this.button = [
          { key: "close", view: "閉じる", style: { color: "", bold: false } },
        ];
      } else if (event.target.value === "two") {
        this.title = "Kinappを使用中に位置情報の利用を許可しますか？";
        this.message =
          "Kinappは現在地の位置情報から対象の場所までのデータを取得するために使用します。";
        this.button = [
          {
            key: "not-allowed",
            view: "許可しない",
            style: { color: "", bold: false },
          },
          { key: "allowed", view: "許可", style: { color: "", bold: true } },
        ];
      } else if (event.target.value === "list") {
        this.title = "アップデート";
        this.message =
          "新しいデータが利用できるようになりました、インストールの準備もできています。";
        this.button = [
          {
            key: "instal",
            view: "今すぐインストール",
            style: { color: "", bold: true },
          },
          {
            key: "notify-later",
            view: "後で通知",
            style: { color: "", bold: false },
          },
          { key: "details", view: "詳細", style: { color: "", bold: false } },
        ];
      } else if (event.target.value === "list-ec") {
        this.title = "Kinappは写真へのアクセスを求めています。";
        this.message =
          "Kinappは写真へのアクセスすますが、どこから写真を取得されますか？";
        this.button = [
          {
            key: "select",
            view: "写真を選択",
            style: { color: "", bold: false },
          },
          {
            key: "all",
            view: "すべての写真へのアクセスを許可",
            style: { color: "", bold: false },
          },
          {
            key: "not",
            view: "許可しない",
            style: { color: "rgba(255,59,48,1)", bold: false },
          },
          {
            key: "cancel",
            view: "キャンセル",
            style: { color: "", bold: false },
          },
        ];
      }
    },
    alertModelEvent(key) {
      console.log(key);
      if (key === "close") {
        console.log("閉じる");
      }
      this.$store.dispatch("alert/closeAlert");
    },
    alert() {
      var post = {
        title: this.title,
        message: this.message,
        button: this.button,
        btnType: this.btntype,
      };
      this.$store.dispatch("alert/openAlert", post);
    },
  },
};
</script>
<style>
main > div > button {
  margin-top: 1em;
  width: auto;
  height: auto;
  line-height: 2.8em;
  border-radius: 0.3em;
  padding: 0 1em;
  color: #fff;
  background-color: #5bcc3f;
}
ul {
  width: 100%;
  height: auto;
  padding: 0.5em;
  display: block;
}
ul li {
  width: 100%;
  height: auto;
  padding: 0.2em 0.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
}
ul li > * {
  text-align: left;
  display: block;
}
ul li span {
  width: 100%;
  text-align: left;
  font-size: 0.6em;
}
input[type="text"],
textarea {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  resize: none;
}
ul li label {
  width: auto;
  display: inline-block;
}
ul li div {
  width: 100%;
  padding: 0.5em;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
}
ul li div:last-of-type {
  border: none;
}
</style>
