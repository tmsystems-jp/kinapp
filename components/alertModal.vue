<template>
  <transition name="modal" appear>
    <div class="modal">
      <div class="alert">
        <dl>
          <dt>
            <h3>タイトル</h3>
            <p>
              アイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオアイウエオ
            </p>
          </dt>
          <dd>bbbb</dd>
        </dl>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.alert {
  width: auto;
  height: auto;
  overflow: hidden;
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
  padding: 0.3em 0.5em;
  background-color: rgba(255, 255, 255, 0.7);
  border-top-left-radius: 2vmax;
  border-top-right-radius: 2vmax;
  backdrop-filter: blur(5px);
  word-break: break-all;
  display: block;
}
.alert dt > * {
  width: auto;
  height: auto;
  display: inline-block;
}
.alert dt h3 {
  font-size: 0.9em;
  padding-bottom: 0.3em;
}
.alert dt p {
  font-size: 0.7em;
}
.modal {
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
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