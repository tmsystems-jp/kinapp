<template>
  <transition name="modal" appear>
    <div class="modal">
      <div class="alert">
        <dl>
          <dt>
            <h3>{{this.title}}</h3>
            <span><p>{{this.message}}</p></span>
          </dt>
          <dd :class="{one:btnType['1'],two:btnType['2'],list:btnType['3']}">
            <button>A</button>
            <button>B</button>
            <button>C</button>
            <button data-only>D</button>
          </dd>
        </dl>
      </div>
      <div class="mask" @click="close"></div>
    </div>
  </transition>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  methods: {
    close(){
      this.$store.dispatch("alert/closeAlert");
    }
  },
  computed: {
    ...mapState("alert", ["title","message","button"]),
  },
  data(){
    return {
      btnType:{
        '1':false,
        '2':false,
        '3':true,
      }
    }
  },
};
</script>

<style scoped>
.mask{
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
  z-index:100;
}
.alert dl {
  width: auto;
  max-width: 70vw;
  height: auto;
  display: block;
}
.alert dt {
  width: auto;
  height: auto;
  padding: 0.5em;
  background-color: rgba(255, 255, 255, 0.7);
  border-top-left-radius: 2vmax;
  border-top-right-radius: 2vmax;
  text-align: center;
  backdrop-filter: blur(5px);
  display: block;
}
.alert dt h3 {
  width: auto;
  height: auto;
  text-align: left;
  display: inline-block;
  font-size: 0.9em;
  padding-bottom: 0.3em;
}
.alert dt span {
  width: auto;
  height: auto;
  display: block;
}
.alert dt p {
  width: auto;
  height: auto;
  text-align: left;
  display: inline-block;
  font-size: 0.6em;
}
.alert dd {
  width: 100%;
  height: auto;
  display: block;
  z-index: 100;
}
.alert dd button{
  width: 100%;
  height: auto;
  line-height: 2;
  border-top: solid 1px rgba(0,0,0,0.5);
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(5px);
  display: block;
}
.alert dd button[data-only]{
  border:none;
  margin-top: 0.3em;
  border-radius: 2vmax;
}
.alert dd.one button:last-of-type,.alert dd.list button:nth-last-of-type(2){
  border-bottom-left-radius: 2vmax;
  border-bottom-right-radius: 2vmax;
}

.modal {
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
.modal-enter-active,
.modal-leave-active {
  transition: all 0.1s ease-in-out 0s;
}
.modal-enter-to,
.modal-leave {
  opacity: 1;
}
</style>