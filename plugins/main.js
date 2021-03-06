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
  app.router.afterEach(async () => {});
  inject("selectChange", (target, data) => selectChange(target, data));
  inject("prefecturesList", () => prefecturesList());
  inject("nowDate", () => nowDate());
  inject("getAge", (data) => getAge(data));
};
function getAge(data) {
  if (data) {
    var bd = new Date(data);
    var td = new Date();
    var tyb = new Date(td.getFullYear(), bd.getMonth() - 1, bd.getDate());
    var age = td.getFullYear() - bd.getFullYear();
    if (td < tyb) {
      age--;
    }
    return age;
  }
}
function nowDate() {
  var data = [];
  var nData = new Date();
  data.push(nData.getFullYear());
  data.push(("00" + (nData.getMonth() + 1)).slice(-2));
  data.push(("00" + nData.getDate()).slice(-2));
  return data.join("-");
}
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
    home: '<svg viewBox="0 0 64 64"><path d="M63 28.715l-8-7.13V10a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v3.564L32.019 1.1 1.021 27.7a1.5 1.5 0 1 0 1.959 2.269l29-24.873L61 30.951a1.5 1.5 0 0 0 2-2.236z"></path><path d="M9 28.934V61a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V42a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v19a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1V29.676L32 9.1z"></path></svg>',
    user: '<svg viewBox="0 0 64 64"><path d="M28 4h8v12h-8z"></path><path d="M40 10v10H24V10H2v50h60V10zm-6 42H10s.1-4.3 3.8-5.1 4.2-2.4 4.2-3.3v-1.5a9.3 9.3 0 0 1-3-6.9v-4.5a6.8 6.8 0 0 1 7-6.7 6.8 6.8 0 0 1 6.9 6.7v4.5a9.3 9.3 0 0 1-2.9 6.9v1.5c0 .9 0 2.4 4 3.3a5.1 5.1 0 0 1 4 5.1zm18-8H38a2 2 0 0 1 0-4h14a2 2 0 0 1 0 4zM36 34a2 2 0 0 1 2-2h10a2 2 0 0 1 0 4H38a2 2 0 0 1-2-2zm18-6H38a2 2 0 0 1 0-4h16a2 2 0 0 1 0 4z"></path></svg>',
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
    edit: '<svg viewBox="0 0 64 64"><path d="M6.732 41.212l30.265-30.265L52.998 26.95 22.734 57.213z"></path><path d="M61.6 18.4c3.7-4.1 3.1-10-1.4-14.6A12 12 0 0 0 51.8 0a9.3 9.3 0 0 0-6.2 2.4z"></path><path d="M4.6 44.7L0 64l19.3-4.5L4.6 44.7zM39.78 8.229l2.97-2.97 16 16.001-2.97 2.97z"></path></svg>',
    cancel:
      '<svg viewBox="0 0 64 64"><path d="M53.122 48.88L36.243 32l16.878-16.878a3 3 0 0 0-4.242-4.242L32 27.758l-16.878-16.88a3 3 0 0 0-4.243 4.243l16.878 16.88-16.88 16.88a3 3 0 0 0 4.243 4.241L32 36.243l16.878 16.88a3 3 0 0 0 4.244-4.243z"></path></svg>',
    save: '<svg viewBox="0 0 64 64"><path d="M16.999 27a2.991 2.991 0 0 0 2.25-1.015L29 14.935V47a3 3 0 0 0 6 0V14.586l9.812 10.466a3 3 0 0 0 4.377-4.104L32 3 14.75 22.016A3 3 0 0 0 17 27z"></path><path d="M55 42a3 3 0 0 0-3 3v11H12V45a3 3 0 0 0-6 0v14a3 3 0 0 0 3 3h46a3 3 0 0 0 3-3V45a3 3 0 0 0-3-3z"></path></svg>',
    setting:
      '<svg viewBox="0 0 64 64"><path d="M62.081 26.948l-5.236-1.355a25.438 25.438 0 0 0-2.7-6.491l2.78-4.721a2.56 2.56 0 0 0-.4-3.109l-3.637-3.639a2.56 2.56 0 0 0-3.109-.4l-4.718 2.778a25.437 25.437 0 0 0-6.5-2.71l-1.396-5.382A2.56 2.56 0 0 0 34.686 0H29.54a2.56 2.56 0 0 0-2.478 1.919l-1.388 5.363A25.44 25.44 0 0 0 19.123 10L14.3 7.157a2.56 2.56 0 0 0-3.109.4l-3.638 3.635a2.56 2.56 0 0 0-.4 3.109L10 19.123a25.438 25.438 0 0 0-2.679 6.429l-5.4 1.4A2.56 2.56 0 0 0 0 29.427v5.147a2.56 2.56 0 0 0 1.919 2.478l5.354 1.385a25.44 25.44 0 0 0 2.742 6.624l-2.778 4.717a2.56 2.56 0 0 0 .4 3.109l3.639 3.639a2.56 2.56 0 0 0 3.109.4l4.721-2.78a25.436 25.436 0 0 0 6.613 2.736l1.346 5.2A2.56 2.56 0 0 0 29.54 64h5.147a2.56 2.56 0 0 0 2.478-1.919l1.352-5.224a25.438 25.438 0 0 0 6.565-2.733l4.618 2.719a2.56 2.56 0 0 0 3.109-.4l3.639-3.639a2.56 2.56 0 0 0 .4-3.109l-2.719-4.617a25.438 25.438 0 0 0 2.758-6.678l5.194-1.344A2.56 2.56 0 0 0 64 34.573v-5.146a2.56 2.56 0 0 0-1.919-2.479zM32.106 47.035a15 15 0 1 1 15-15 15 15 0 0 1-15 15z"></path></svg>',
    code: '<svg viewBox="0 0 64 64"><path d="M56 38a5.9 5.9 0 0 0-4.5 2c-1.4 1.4-5.5 2-5.5-2V18H30c-4 0-3.4-4.1-2-5.5a6 6 0 1 0-8 0c1.4 1.4 2 5.5-2 5.5H2v8c0 4 4.1 3.4 5.5 2a5.9 5.9 0 0 1 4.5-2 6 6 0 1 1-4.5 10C6.1 34.6 2 34 2 38v24h24c4 0 3.4-4.1 2-5.5a5.9 5.9 0 0 1-2-4.5 6 6 0 1 1 10 4.5c-1.4 1.4-2 5.5 2 5.5h8V50c0-4 4.1-3.4 5.5-2A6 6 0 1 0 56 38z"></path></svg>',
    none: "",
  };
  return svgdata[name[0]];
}
function prefecturesList() {
  var pList = [
    { code: 1, name: "?????????" },
    { code: 2, name: "?????????" },
    { code: 3, name: "?????????" },
    { code: 4, name: "?????????" },
    { code: 5, name: "?????????" },
    { code: 6, name: "?????????" },
    { code: 7, name: "?????????" },
    { code: 8, name: "?????????" },
    { code: 9, name: "?????????" },
    { code: 10, name: "?????????" },
    { code: 11, name: "?????????" },
    { code: 12, name: "?????????" },
    { code: 13, name: "?????????" },
    { code: 14, name: "????????????" },
    { code: 15, name: "?????????" },
    { code: 16, name: "?????????" },
    { code: 17, name: "?????????" },
    { code: 18, name: "?????????" },
    { code: 19, name: "?????????" },
    { code: 20, name: "?????????" },
    { code: 21, name: "?????????" },
    { code: 22, name: "?????????" },
    { code: 23, name: "?????????" },
    { code: 24, name: "?????????" },
    { code: 25, name: "?????????" },
    { code: 26, name: "?????????" },
    { code: 27, name: "?????????" },
    { code: 28, name: "?????????" },
    { code: 29, name: "?????????" },
    { code: 30, name: "????????????" },
    { code: 31, name: "?????????" },
    { code: 32, name: "?????????" },
    { code: 33, name: "?????????" },
    { code: 34, name: "?????????" },
    { code: 35, name: "?????????" },
    { code: 36, name: "?????????" },
    { code: 37, name: "?????????" },
    { code: 38, name: "?????????" },
    { code: 39, name: "?????????" },
    { code: 40, name: "?????????" },
    { code: 41, name: "?????????" },
    { code: 42, name: "?????????" },
    { code: 43, name: "?????????" },
    { code: 44, name: "?????????" },
    { code: 45, name: "?????????" },
    { code: 46, name: "????????????" },
    { code: 47, name: "?????????" },
  ];
  return pList;
}
