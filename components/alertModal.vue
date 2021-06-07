<template>
  <transition name="modal" mode="out-in" appear>
    <div class="modalbox">
      <div class="alert">
        <dl>
          <dt>
            <h3>{{ this.title }}</h3>
            <span
              ><p>{{ this.message }}</p></span
            >
          </dt>
          <dd
            :class="{
              one: btnType['one'],
              two: btnType['two'],
              list: btnType['list'],
              'list-ec': btnType['list-ec'],
            }"
          >
            <button
              v-for="(data, index) in button"
              :key="index"
              :style="styleSet(data.style)"
              @click="eventClick(data.key)"
            >
              {{ data.view }}
            </button>
          </dd>
        </dl>
      </div>
      <div class="mask" @click="close"></div>
    </div>
  </transition>
</template>
<script>
import { mapState } from "vuex";
export default {
  methods: {
    close() {
      this.$store.dispatch("alert/closeAlert");
    },
    eventClick(key) {
      this.$emit("event", key);
    },
    styleSet(data) {
      var style = "";
      if (data.color !== "") {
        style += "color:" + data.color + ";";
      }
      if (data.bold) {
        style += "font-weight:bold;";
      }
      return style;
    },
  },
  computed: {
    ...mapState("alert", ["title", "message", "button", "btnType"]),
  },
};
</script>

<style scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 10;
}
.alert {
  width: auto;
  height: auto;
  overflow: hidden;
  z-index: 100;
}
.alert dl {
  width: 340px;
  max-width: 80vw;
  height: auto;
  display: block;
}
.alert dt {
  width: auto;
  height: auto;
  padding: 0.5em 0.8em;
  background-color: rgba(255, 255, 255, 0.7);
  border-top-left-radius: 1.2vmin;
  border-top-right-radius: 1.2vmin;
  text-align: center;
  backdrop-filter: blur(5px);
  display: block;
}
.alert dt h3 {
  width: auto;
  height: auto;
  text-align: center;
  display: inline-block;
  font-size: 0.85em;
  padding: 0.3em;
}
.alert dt span {
  width: auto;
  height: auto;
  padding: 0.2em 0;
  display: block;
}
.alert dt p {
  width: auto;
  height: auto;
  text-align: center;
  display: inline-block;
  font-size: 0.65em;
}
.alert dd {
  width: 100%;
  height: auto;
  display: block;
  z-index: 100;
}
.alert dd button {
  width: 100%;
  height: auto;
  font-size: 0.8em;
  line-height: 2.5;
  white-space: nowrap;
  border-top: solid 1px rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  color: rgba(0, 122, 255, 1);
  box-sizing: border-box;
  display: block;
}
.alert dd.two button {
  width: 50%;
  display: inline-block;
}
.alert dd.two button:last-of-type {
  border-left: solid 1px rgba(0, 0, 0, 0.2);
  border-bottom-right-radius: 1.2vmin;
}
.alert dd.two button:first-of-type {
  border-bottom-left-radius: 1.2vmin;
}
.alert dd.one button:last-of-type,
.alert dd.list button:nth-last-of-type(1),
.alert dd.list-ec button:nth-last-of-type(2) {
  border-bottom-left-radius: 1.2vmin;
  border-bottom-right-radius: 1.2vmin;
}
.alert dd.list-ec button:nth-last-of-type(1) {
  border: none;
  margin-top: 0.3em;
  border-radius: 1.2vmin;
}
.modalbox {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 100;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter .alert {
  opacity: 0;
  transform: scale(1.2, 1.2);
  filter: blur(6px);
}
.modal-leave-to .alert {
  opacity: 0;
  filter: blur(6px);
}
.modal-enter-active {
  transition: all 0.15s ease;
}
.modal-leave-active {
  transition: all 0.15s ease;
}
.modal-enter-active .alert {
  transition: all 0.05s ease-out 0s;
}
.modal-leave-active .alert {
  transition: all 0.05s ease-in 0s;
}
.modal-enter-to,
.modal-leave {
  opacity: 1;
}
.modal-enter-to .alert,
.modal-leave .alert {
  opacity: 1;
  transform: scale(1, 1);
  filter: blur(0);
}
</style>
