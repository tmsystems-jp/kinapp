<template>
  <main>
    <div v-bind:data-status="status">
      <form name="login_form">
        <div class="basicInfo">
          <dl>
            <dt>
              <figure></figure>
            </dt>
            <dd>
              <div data-input>
                <fieldset data-half>
                  <legend>園児名</legend>
                  <input
                    type="text"
                    name="first-name"
                    v-model="input['first-name']"
                    placeholder="あにまる"
                  />
                </fieldset>
                <fieldset data-half>
                  <input
                    type="text"
                    name="last-name"
                    v-model="input['first-name']"
                    placeholder="きなっぷ"
                  />
                </fieldset>
                <fieldset data-half>
                  <legend>園児名(カナ)</legend>
                  <input
                    type="text"
                    name="first-kana"
                    v-model="input['first-kana']"
                    placeholder="アニマル"
                  />
                </fieldset>
                <fieldset data-half>
                  <input
                    type="text"
                    name="last-kana"
                    v-model="input['first-kana']"
                    placeholder="キナップ"
                  />
                </fieldset>
                <fieldset>
                  <legend>愛称</legend>
                  <input
                    type="text"
                    name="nickname"
                    v-model="input['nickname']"
                    placeholder="愛称"
                  />
                </fieldset>
                <fieldset>
                  <legend>誕生日</legend>
                  <input
                    type="date"
                    name="birthday"
                    v-model="input['birthday']"
                  />
                </fieldset>
                <fieldset>
                  <legend>性別</legend>
                  <label
                    ><input
                      type="radio"
                      name="gender"
                      value="boy"
                      v-model="input['gender']"
                    />男の子</label
                  >
                  <label
                    ><input
                      type="radio"
                      name="gender"
                      v-model="input['gender']"
                      value="girl"
                    />女の子</label
                  >
                  <label
                    ><input
                      type="radio"
                      name="gender"
                      v-model="input['gender']"
                      value="other"
                    />その他</label
                  >
                </fieldset>
              </div>
              <div data-view>
                <div>
                  <p>{{ input["first-name"] }}</p>
                  <p>{{ input["last-name"] }}</p>
                </div>
                <div>
                  <p>{{ input["nickname"] }}</p>
                </div>
                <div>
                  <p>{{ $getAge(input["birthday"]) }}歳</p>
                </div>
                <div>
                  <p>{{ input["blood"] }}</p>
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="childInfo">
          <nav>
            <label for="tab1">基本</label>
            <label for="tab2">家族構成</label>
            <label for="tab3">入退園</label>
            <label for="tab4">生活</label>
            <label for="tab5">成長記録</label>
          </nav>
          <input type="radio" name="tab" id="tab1" checked />
          <div class="content">
            <div>
              <fieldset>
                <legend>登園方法</legend>
                <div>
                  <label v-for="data in goingSchoolItem" :key="data.key"
                    ><input
                      type="radio"
                      name="going-school"
                      :value="data.key"
                      v-model="input['going-school']"
                    />{{ data.value }}</label
                  >
                </div>
                <span>{{ itemName("going-school") }}</span>
              </fieldset>
              <fieldset v-if="input['going-school'] === 'bus'">
                <legend>バスコース</legend>
                <div>
                  <select
                    name="bus-course"
                    v-model="input['bus-course']"
                    ref="buscourse"
                    @change="
                      $selectChange($refs.buscourse, input['bus-course'])
                    "
                    data-view="off"
                  >
                    <option value="" selected>バスコース</option>
                    <option
                      v-for="data in busCourse"
                      :key="data.value"
                      :value="data.value"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>
                <span>{{ itemName("bus-course") }}</span>
              </fieldset>
            </div>
            <div>
              <fieldset>
                <legend>郵便番号</legend>
                <div>
                  <input
                    type="number"
                    v-model="input['postno']"
                    placeholder="郵便番号"
                    @input="postSearch()"
                  />
                </div>
                <span>{{ input["postno"] }}</span>
              </fieldset>
              <fieldset>
                <legend>都道府県</legend>
                <div>
                  <select
                    v-model="input['prefectures']"
                    ref="prefectures"
                    @change="
                      $selectChange($refs.prefectures, input['prefectures'])
                    "
                    data-view="off"
                  >
                    <option value="" selected>都道府県</option>
                    <option
                      v-for="data in prefecturesList"
                      :key="data.code"
                      :value="data.code"
                    >
                      {{ data.name }}
                    </option>
                  </select>
                </div>
                <span>{{ input["prefectures"] }}</span>
              </fieldset>
              <fieldset>
                <legend>区市町村</legend>
                <div>
                  <input
                    type="text"
                    v-model="input['address1']"
                    placeholder="区市町村"
                  />
                </div>
                <span>{{ input["address1"] }}</span>
              </fieldset>
              <fieldset>
                <legend>丁目・番地</legend>
                <div>
                  <input
                    type="text"
                    v-model="input['address2']"
                    placeholder="丁目・番地"
                  />
                </div>
                <span>{{ input["address2"] }}</span>
              </fieldset>
              <fieldset>
                <legend>以降・建物名</legend>
                <div>
                  <input
                    type="text"
                    v-model="input['address3']"
                    placeholder="建物名"
                  />
                </div>
                <span>{{ input["address3"] }}</span>
              </fieldset>
              <fieldset>
                <legend>電話番号</legend>
                <div>
                  <input
                    type="tel"
                    v-model="input['telephone']"
                    placeholder="電話番号"
                  />
                </div>
                <span>{{ input["telephone"] }}</span>
              </fieldset>
              <fieldset
                v-for="(data, index) in input['emergency-contact']"
                :key="index"
              >
                <legend>
                  緊急連絡先{{
                    String.fromCharCode(
                      String(index + 1).charCodeAt(0) + 0xfee0
                    )
                  }}
                </legend>
                <div>
                  <input
                    type="tel"
                    v-model="input['emergency-contact'][index]"
                    placeholder="緊急連絡先"
                    @input="emergencyContact()"
                  />
                </div>
                <span>{{ input["emergency-contact"][index] }}</span>
              </fieldset>
            </div>
          </div>
          <input type="radio" name="tab" id="tab2" />
          <div class="content">
            <ul>
              <li>
                <dl>
                  <dt>
                    <figure></figure>
                  </dt>
                  <dd>
                    <fieldset>
                      <legend>名前</legend>
                      <input type="text" placeholder="名前" />
                    </fieldset>
                    <fieldset>
                      <legend>続柄</legend>
                      <input type="tel" placeholder="続柄" />
                    </fieldset>
                    <fieldset>
                      <legend>誕生日</legend>
                      <input type="date" placeholder="誕生日" />
                    </fieldset>
                    <fieldset>
                      <legend>職場/学校</legend>
                      <input type="text" placeholder="職場/学校" />
                    </fieldset>
                    <fieldset>
                      <legend>補足</legend>
                      <textarea placeholder="補足"></textarea>
                    </fieldset>
                  </dd>
                </dl>
              </li>
            </ul>
          </div>
          <input type="radio" name="tab" id="tab3" />
          <div class="content">
            <div>
              <label>入園日</label>
              <input type="text" name="enterDate" />
              <br />
              <label>退園日</label>
              <input type="text" name="exitDate" />
              <label>退園理由</label>
              <input type="text" name="exitComment" />
              <br />
              <label>卒園日</label>
              <input type="text" name="address2" />
              <label>進学先</label>
              <input type="text" name="address3" />
            </div>
          </div>
          <input type="radio" name="tab" id="tab4" />
          <div class="content">
            <div>
              <label>アレルギー情報</label>
              <input type="text" name="allergies" />
              <br />
              <label>生活における注意点</label>
              <input type="text" name="caution" />
            </div>
          </div>
          <input type="radio" name="tab" id="tab5" />
          <div class="content">
            <table id="growList"></table>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
<script>
export default {
  layout: "main",
  mounted() {
    if (this.input["birthday"] === "") {
      this.input["birthday"] = this.$nowDate();
    }
    if (this.input["gender"] === "") {
      this.input["gender"] = "boy";
    }
    if (this.input["going-school"] === "") {
      this.input["going-school"] = "parents";
    }
    if (this.input["emergency-contact"].length === 0) {
      this.input["emergency-contact"] = [""];
    }
  },
  head() {
    return {
      title: "園児情報 Kinapp",
      link: [{ rel: "stylesheet", href: "../css/childrenRegist.css" }],
    };
  },
  data() {
    return {
      status: "",
      input: this.$ifchildren(),
      prefecturesList: this.$prefecturesList(),
      busCourse: [],
      goingSchoolItem: [
        { key: "parents", value: "保護者送迎" },
        { key: "bus", value: "バス利用" },
      ],
    };
  },
  methods: {
    statusChange(data) {
      if (data.edit) {
        this.status = "edit";
      } else {
        this.status = "off";
      }
    },
    itemName(name) {
      if (name === "going-school") {
        if (this.input["going-school"] !== "") {
          return this.goingSchoolItem.find(
            (z) => z.key === this.input["going-school"]
          ).value;
        }
      }
    },
    emergencyContact() {
      var lnum = this.input["emergency-contact"].length - 1;
      if (this.input["emergency-contact"][lnum] !== "") {
        this.input["emergency-contact"].push("");
      } else {
        if (this.input["emergency-contact"][lnum - 1] === "") {
          this.input["emergency-contact"].pop();
        }
      }
    },
    async postSearch() {
      var post = this.input["postno"];
      if (post === "8120897") {
        this.input["prefectures"] = this.prefecturesList.find(
          (z) => z.name === "福岡県"
        ).code;
        this.$selectChange(this.$refs.prefectures, this.input["prefectures"]);
      }
    },
  },
};
</script>
