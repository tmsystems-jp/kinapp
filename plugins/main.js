export default ({ app, store, context }, inject) => {
  inject("navigate", (page) => app.router.push(page));
  inject("historyBack", () => app.router.go(-1));
  inject("initialSetting", (el) => {
    initialSetting(el);
    // const signData = app.store.getters["sign/user"];
    // if (signData.login) {
    //   const getFlg = app.store.getters["selectDb/getFlg"];
    //   if (!getFlg) {
    //     app.store.dispatch("selectDb/fetchItemList");
    //   }
    // }
  });
  inject("signOut", () => {
    store.dispatch("sign/logout");
    if ("vuex" in localStorage) {
      localStorage.removeItem("vuex");
    }
    if ("storege" in localStorage) {
      localStorage.removeItem("storege");
    }
    app.router.push("/");
  });
  app.router.afterEach(async () => {
    if (!store.getters["default"]) {
      await store.dispatch("db/pullDefault");
      console.log("set", store.getters["default"]);
    }
  });
  inject("selectChange", (target, data) => selectChange(target, data));
  inject("prefecturesList", () => prefecturesList());
};
function selectChange(target, data) {
  var set = "off";
  if (data !== "") {
    set = "on";
  }
  target.setAttribute("data-view", set);
}
function initialSetting(el) {
  var els = el.getElementsByTagName("*");
  for (var i = 0; i < els.length; ++i) {
    if (els[i].hasAttribute("data-icon")) {
      if (!els[i].getElementsByTagName("figure")[0]) {
        var icon = els[i].getAttribute("data-icon");
        let figure = document.createElement("figure");
        figure.innerHTML = iconSVG(icon);
        els[i].appendChild(figure);
      }
    }
  }
}
function iconSVG(icon) {
  var name = icon.split("-");
  name = name.filter((v) => {
    if (!v.match("/left|right/")) {
      return v;
    } else {
      return "";
    }
  });
  var svgdata = {
    home:
      '<svg viewBox="0 0 64 64"><path d="M63 28.715l-8-7.13V10a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v3.564L32.019 1.1 1.021 27.7a1.5 1.5 0 1 0 1.959 2.269l29-24.873L61 30.951a1.5 1.5 0 0 0 2-2.236z"></path><path d="M9 28.934V61a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V42a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V29.676L32 9.1z"></path></svg>',
    user:
      '<svg viewBox="0 0 64 64"><path d="M28 8H8v54h48V8H36"></path><path d="M28 2h8v10h-8z"></path><path d="M44 48H20m16 8H20"></path><circle cx="32" cy="25" r="6"></circle><path d="M42 41a10 10 0 1 0-20 0z"></path></svg>',
    staff:
      '<svg viewBox="0 0 64 64"><path d="M28 4h8v12h-8z"></path><path d="M40 10v10H24V10H2v50h60V10zm-6 42H10s.1-4.3 3.8-5.1 4.2-2.4 4.2-3.3v-1.5a9.3 9.3 0 0 1-3-6.9v-4.5a6.8 6.8 0 0 1 7-6.7 6.8 6.8 0 0 1 6.9 6.7v4.5a9.3 9.3 0 0 1-2.9 6.9v1.5c0 .9 0 2.4 4 3.3a5.1 5.1 0 0 1 4 5.1zm18-8H38a2 2 0 0 1 0-4h14a2 2 0 0 1 0 4zM36 34a2 2 0 0 1 2-2h10a2 2 0 0 1 0 4H38a2 2 0 0 1-2-2zm18-6H38a2 2 0 0 1 0-4h16a2 2 0 0 1 0 4z"></path></svg>',
    password:
      '<svg viewBox="0 0 64 64"><path d="M47 28V15a15 15 0 0 0-30 0v13H8v36h48V28zM34 51a2 2 0 0 1-4 0V41a2 2 0 0 1 4 0zm9-23H21V15a11 11 0 0 1 22 0z"></path></svg>',
    email:
      '<svg viewBox="0 0 64 64"><path d="M4.1 28.4l21.2 8.4L55.8 5.9 4.1 28.4zm25 10.3l22.2 13.7 8.6-45-30.8 31.3z"></path><path d="M27.3 58.1l7.8-11.2-7.8-4.8v16z"></path></svg>',
    clock:
      '<svg viewBox="0 0 64 64"><path d="M32 0a32 32 0 1 0 32 32A32 32 0 0 0 32 0zm-1 5.333a1 1 0 1 1 2 0v5.333a1 1 0 1 1-2 0zM10.667 33H5.333a1 1 0 1 1 0-2h5.334a1 1 0 1 1 0 2zM33 58.667a1 1 0 0 1-2 0v-5.334a1 1 0 0 1 2 0zm17.127-40.54L37.544 30.711a6 6 0 1 1-11.309.644l-6.918-5.661a1.5 1.5 0 0 1 1.9-2.322l6.562 5.369a5.977 5.977 0 0 1 7.936-.444l12.291-12.291a1.5 1.5 0 0 1 2.121 2.121zM58.667 33h-5.334a1 1 0 0 1 0-2h5.334a1 1 0 0 1 0 2z"></path><circle cx="32" cy="33" r="3"></circle></svg>',
    notice:
      '<svg viewBox="0 0 64 64"><path d="M62 6a2 2 0 0 0-2 2v2.6L4 27.4V26a2 2 0 1 0-4 0v12a2 2 0 1 0 4 0v-1.4l17 5.1V45a11 11 0 0 0 21.5 3.2L60 53.4V56a2 2 0 1 0 4 0V8a2 2 0 0 0-2-2zM32 52a7 7 0 0 1-7-7v-2.1L38.7 47a7 7 0 0 1-6.7 5z"></path></svg>',
    school:
      '<svg viewBox="0 0 64 64"><path d="M63.128 26L55 19.5V5a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v7.3L32.625 1.6a1 1 0 0 0-1.249 0L.872 26a1 1 0 0 0-.082 1.49l2.841 2.841a1 1 0 0 0 1.335.071L31.372 9.074a1 1 0 0 1 1.257 0L59.034 30.4a1 1 0 0 0 1.335-.071l2.841-2.839a1 1 0 0 0-.082-1.49z"></path><path d="M32 12L9 31v30a1 1 0 0 0 1 1h12V41a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v21h12a1 1 0 0 0 1-1V31zm0 21a5 5 0 1 1 5-5 5 5 0 0 1-5 5z"></path><path d="M25 42h14a1 1 0 0 1 1 1v19H24V43a1 1 0 0 1 1-1z"></path></svg>',
    staffinfo:
      '<svg viewBox="0 0 64 64"><path d="M54.6 1.8h-3v60h3a3 3 0 0 0 3-3v-54a3 3 0 0 0-3-3z"></path><path d="M13.6 1.8v4h-4a2 2 0 0 0 0 4h4v12h-4a2 2 0 0 0 0 4h4v12h-4a2 2 0 0 0 0 4h4v12h-4a2 2 0 0 0 0 4h4v4h34v-60zm10 42s0-3.6 3.3-4.3 3.3-1.9 3.3-2.7v-1.3a7.7 7.7 0 0 1-2.4-5.8v-3.6a5.8 5.8 0 0 1 11.6 0v3.7a7.7 7.7 0 0 1-2.5 5.7v1.2c0 .8 0 2 3.5 2.7s3.2 4.3 3.2 4.3z"></path></svg>',
    childrens:
      '<svg viewBox="0 0 64 64"><path d="M39 6h-2.1a5 5 0 0 0-9.8 0H25a4.7 4.7 0 0 0-5 5v3h24v-3a4.8 4.8 0 0 0-5-5z"></path><path d="M38 53l9-9h-9v9z"></path><path d="M44 17H17v36h17V40h13V17h-3z"></path><path d="M54 8h-6.5a9.5 9.5 0 0 1 .5 3v2h3v33L40 57H13V13h3v-2a9.8 9.8 0 0 1 .5-3H10a2 2 0 0 0-2 2v50a2 2 0 0 0 2 2h44a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"></path></svg>',
    arrow:
      '<svg viewBox="0 0 64 64"><path id="arrow-left" d="M40 21a2.99 2.99 0 0 1-.879 2.121l-8.636 8.89 8.636 8.868a3 3 0 0 1-4.242 4.242L22 32.011l12.879-13.132A3 3 0 0 1 40 21z"></path><path id="arrow-right" d="M22 21a2.99 2.99 0 0 0 .879 2.121l8.636 8.89-8.636 8.868a3 3 0 0 0 4.242 4.242L40 32.011 27.121 18.879A3 3 0 0 0 22 21z"></path></svg>',
    logout:
      '<svg viewBox="0 0 64 64"><path d="M58.1 5.9a20 20 0 0 0-32.5 22L18 35.4V38h-6v6H6v6H3.2L0 53.2V64h10.8l25.5-25.6A20.1 20.1 0 0 0 44 40 20 20 0 0 0 58.1 5.9zm-5.9 14.3a6 6 0 1 1 0-8.5 6 6 0 0 1 0 8.5z"></path></svg>',
    none: ""
  };
  return svgdata[name[0]];
}
function prefecturesList() {
  var pList = [
    { code: 1, name: "北海道" },
    { code: 2, name: "青森県" },
    { code: 3, name: "岩手県" },
    { code: 4, name: "宮城県" },
    { code: 5, name: "秋田県" },
    { code: 6, name: "山形県" },
    { code: 7, name: "福島県" },
    { code: 8, name: "茨城県" },
    { code: 9, name: "栃木県" },
    { code: 10, name: "群馬県" },
    { code: 11, name: "埼玉県" },
    { code: 12, name: "千葉県" },
    { code: 13, name: "東京都" },
    { code: 14, name: "神奈川県" },
    { code: 15, name: "新潟県" },
    { code: 16, name: "富山県" },
    { code: 17, name: "石川県" },
    { code: 18, name: "福井県" },
    { code: 19, name: "山梨県" },
    { code: 20, name: "長野県" },
    { code: 21, name: "岐阜県" },
    { code: 22, name: "静岡県" },
    { code: 23, name: "愛知県" },
    { code: 24, name: "三重県" },
    { code: 25, name: "滋賀県" },
    { code: 26, name: "京都府" },
    { code: 27, name: "大阪府" },
    { code: 28, name: "兵庫県" },
    { code: 29, name: "奈良県" },
    { code: 30, name: "和歌山県" },
    { code: 31, name: "鳥取県" },
    { code: 32, name: "島根県" },
    { code: 33, name: "岡山県" },
    { code: 34, name: "広島県" },
    { code: 35, name: "山口県" },
    { code: 36, name: "徳島県" },
    { code: 37, name: "香川県" },
    { code: 38, name: "愛媛県" },
    { code: 39, name: "高知県" },
    { code: 40, name: "福岡県" },
    { code: 41, name: "佐賀県" },
    { code: 42, name: "長崎県" },
    { code: 43, name: "熊本県" },
    { code: 44, name: "大分県" },
    { code: 45, name: "宮崎県" },
    { code: 46, name: "鹿児島県" },
    { code: 47, name: "沖縄県" }
  ];
  return pList;
}
