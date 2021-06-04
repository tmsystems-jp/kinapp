export default ({ app, store, context }, inject) => {
  inject("validations", (data, val) => validations(store, data, val));
};
function validations(store, data, val) {
  var flg = false;
  val.data.forEach((z) => {
    var kname = z.name;
    var els = val.path["input-" + kname].parentNode;
    if (els.hasAttribute("data-error")) {
      els.removeAttribute("data-error");
      els.querySelector("aside").remove();
    }
    var ed = errorCheck(z, data[kname]);
    if (ed.flg) {
      val.path["input-" + kname].addEventListener("input", errorClose, false);
      els.setAttribute("data-error", "");
      let error = document.createElement("aside");
      error.innerHTML =
        "<p>" +
        ed.message +
        '</p><svg viewBox="0 0 64 64"><path d="M31.998 4.298L.038 59.702h63.925zM30 25.702a2 2 0 0 1 4 0v15.995a2 2 0 1 1-4 0zm2.004 26a3.005 3.005 0 0 1-2.13-5.12 3.108 3.108 0 0 1 4.25 0 3 3 0 0 1-2.12 5.12z"></path></svg>';
      els.appendChild(error);
      flg = true;
    }
  });
  if (flg) {
    var post = {
      title: "項目エラー",
      message:
        "正しく入力されていない項目があります､メッセージをご確認の上､もう一度ご入力ください｡",
      button: [
        { key: "close", view: "閉じる", style: { color: "", bold: false } }
      ],
      btnType: "one"
    };
    store.dispatch("alert/openAlert", post);
  }
  return flg;
}
function errorCheck(key, data) {
  var ret = {
    flg: false,
    message: ""
  };
  if (data === "" && key.required) {
    ret.flg = true;
    ret.message = message("required");
  } else {
    if (key.type === "email") {
      if (
        !data.match(
          /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
        )
      ) {
        ret.flg = true;
        ret.message = message("email");
      }
    }
  }
  return ret;
}
function message(key) {
  var md = {
    required: "必須項目です､入力してください｡",
    email: "メールアドレスの形式ではない可能性があります｡"
  };
  return md[key];
}
function errorClose(e) {
  var els = e.target.parentNode;
  els.removeAttribute("data-error");
  els.querySelector("aside").remove();
  e.target.removeEventListener("input", errorClose);
  console.log(e);
}
