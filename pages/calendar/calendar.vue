<template>
  <main>
    <div class="header-area">
      <h2>{{ displayMonth }}</h2>
    </div>
    <div class="button-area">
      <button @click="prevMonth">前の月</button>
      <button @click="nextMonth">次の月</button>
    </div>
    <div class="calendar">
      <div class="calendar-weekly">
        <div class="calendar-youbi" v-for="n in 7" :key="n">
          {{ youbi(n - 1) }}
        </div>
      </div>
      <div
        class="calendar-weekly"
        v-for="(week, index) in calendars"
        :key="index"
      >
        <div
          class="calendar-daily"
          :class="{ outside: currentMonth !== day.month }"
          v-for="(day, index) in week"
          :key="index"
        >
          <div calss="calendar-day">
            {{ day.day }}
          </div>
        </div>
      </div>
    </div>
    <br />
    <div>
      <p>予定：{{ planNm }}{{ planStartDt }}{{ planEndDt }}</p>
    </div>
    <br />
    <div id="app">
      <button v-on:click="openModal">予定追加</button>

      <div id="overlay" v-show="showContent">
        <div id="modal">
          <div>
            <label>予定名</label>
            <input v-model="planName" type="text" name="planNm" />
          </div>
          <div>
            <label>開始</label>
            <input v-model="startDt" type="datetime-local" name="example1" />
          </div>
          <div>
            <label>終了</label>
            <input v-model="endDt" type="datetime-local" name="example1" />
          </div>
          <div>
            <p><button v-on:click="planRegist">登録</button></p>
            <p><button v-on:click="planDelete">削除</button></p>
            <p><button v-on:click="closeModal">close</button></p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import moment from "moment";

export default {
  head() {
    return {
      title: "イベント予定 Kinapp",
      link: [{ rel: "stylesheet", href: "/css/calendar.css" }],
    };
  },
  data() {
    return {
      currentDate: moment(),
      showContent: false,
      planName: "",
      startDt: "",
      endDt: "",
      planNm: "",
      planStartDt: "",
      planEndDt: "",
    };
  },
  methods: {
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      const startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars = [];
      let calendarDate = this.getStartDate();

      //日付設定
      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },
    openModal: function () {
      this.planName = "";
      this.startDt = "";
      this.endDt = "";
      this.showContent = true;
    },
    planRegist: function () {
      this.planNm = this.planName;
      this.planStartDt = this.startDt;
      this.planEndDt = this.endDt;
      this.showContent = false;
    },
    planDelete: function () {
      this.showContent = false;
    },
    closeModal: function () {
      this.showContent = false;
    },
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayMonth() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    },
  },
};
</script>

