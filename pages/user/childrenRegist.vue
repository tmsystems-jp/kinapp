<template>
  <main>
    <div>
      <form name="login_form">
        <div class="basicInfo">
          <dl data-edit="off">
            <dt>
              <figure></figure>
            </dt>
            <dd>
              <div data-edit="off">
                <div>
                  <label>園児名</label>
                  <input type="text" name="childName" placeholder="お名前" />
                  <input type="text" name="childKana" placeholder="カナ" />
                </div>
                <div>
                  <label>愛称</label>
                  <input type="text" name="nickName" placeholder="愛称" />
                </div>
                <div>
                  <label>誕生日</label>
                  <input type="date" name="birthday" />
                </div>
                <div>
                  <label>性別</label>
                  <input
                    type="radio"
                    name="sex"
                    value="boy"
                    checked="checked"
                  /><label>男の子</label>
                  <input type="radio" name="sex" value="girl" /><label
                    >女の子</label
                  >
                </div>
              </div>
              <div>
                <div>
                  <p>アニマル</p>
                  <p>キナップ</p>
                </div>
                <div><p>キナップ</p></div>
                <div><p>4歳</p></div>
                <div><p>A型</p></div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="childInfo" data-edit="off">
          <nav>
            <label for="tab1">基本</label>
            <label for="tab2">家族構成</label>
            <label for="tab3">入退園</label>
            <label for="tab4">生活</label>
            <label for="tab5">成長記録</label>
          </nav>
          <input type="radio" name="tab_name" id="tab1" checked />
          <div class="content_class">
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
          <input type="radio" name="tab_name" id="tab2" />
          <div class="content_class">
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
          <input type="radio" name="tab_name" id="tab3" />
          <div class="content_class">
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
          <input type="radio" name="tab_name" id="tab4" />
          <div class="content_class">
            <div>
              <label>アレルギー情報</label>
              <input type="text" name="allergies" />
              <br />
              <label>生活における注意点</label>
              <input type="text" name="caution" />
            </div>
          </div>
          <input type="radio" name="tab_name" id="tab5" />
          <div class="content_class">
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
  extends: {
    props: ["statusType"],
  },
  head() {
    return {
      title: "園児情報 Kinapp",
      link: [{ rel: "stylesheet", href: "../css/childrenRegist.css" }],
    };
  },
  data() {
    return {
      input: this.$ifchildren(),
      prefecturesList: this.$prefecturesList(),
      busCourse: [],
    };
  },
  mounted() {},
};
</script>