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
                  />
                </fieldset>
                <fieldset data-half>
                  <input
                    type="text"
                    name="last-name"
                    v-model="input['first-name']"
                  />
                </fieldset>
                <fieldset data-half>
                  <legend>園児名(カナ)</legend>
                  <input
                    type="text"
                    name="first-kana"
                    v-model="input['first-kana']"
                  />
                </fieldset>
                <fieldset data-half>
                  <input
                    type="text"
                    name="last-kana"
                    v-model="input['first-kana']"
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
                  <p>アニマル</p>
                  <p>キナップ</p>
                </div>
                <div><p>キナップ</p></div>
                <div><p>4歳</p></div>
                <div>
                  <p>A型</p>
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
                <label
                  ><input
                    type="radio"
                    name="going-school"
                    value="parents"
                  />保護者送迎</label
                >
                <label
                  ><input
                    type="radio"
                    name="going-school"
                    value="bus"
                    checked="checked"
                  />バス利用</label
                >
              </fieldset>
              <fieldset id="bus">
                <legend>バスコース</legend>
                <select
                  name="bus-course"
                  v-model="input.busCourse"
                  ref="busCourse"
                  @change="$selectChange($refs.busCourse, input.busCourse)"
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
              </fieldset>
            </div>
            <div>
              <fieldset>
                <legend>郵便番号</legend>
                <input
                  type="number"
                  name="postno"
                  v-model="input['postno']"
                  placeholder="郵便番号"
                />
              </fieldset>
              <fieldset>
                <legend>都道府県</legend>
                <select
                  name="prefectures"
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
              </fieldset>
              <fieldset>
                <legend>区市町村</legend>
                <input type="text" name="address1" placeholder="区市町村" />
              </fieldset>
              <fieldset>
                <legend>丁目・番地</legend>
                <input type="text" name="address2" placeholder="丁目・番地" />
              </fieldset>
              <fieldset>
                <legend>以降・建物名</legend>
                <input type="text" name="address3" placeholder="建物名" />
              </fieldset>
              <fieldset>
                <legend>電話番号</legend>
                <input type="tel" name="telephone" placeholder="電話番号" />
              </fieldset>
              <fieldset>
                <legend>緊急連絡先</legend>
                <input
                  type="tel"
                  name="emergency contact"
                  placeholder="緊急連絡先"
                />
              </fieldset>
            </div>
          </div>
          <input type="radio" name="tab" id="tab2" />
          <div class="content">
            <dl id="familyList">
              <dt>
                <span>名前</span>
                <span>続柄</span>
                <span>誕生日</span>
                <span>職場/学校</span>
                <span>補足</span>
              </dt>
              <dd></dd>
            </dl>
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
  },
};
</script>