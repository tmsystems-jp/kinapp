export default ({ app, store, context }, inject) => {
  inject("ifchildren", () => children());
  inject("ifdocid", () => docid());
  inject("ifdbPayload", () => dbPayload());
};
function children() {
  var data = {
    "child-cd": "",
    "first-name": "",
    "last-name": "",
    "first-kana": "",
    "last-kana": "",
    nickname: "",
    birthday: "",
    gender: "",
    blood: "",
    "pre-s": "",
    "school-class": "",
    "going-school": "",
    "gus-course": "",
    "parent-cd": "",
    "principal-cd": "",
    "admission-date": "",
    "exit-date": "",
    "exit-reason": "",
    "graduation-day": "",
    "school-after-graduation": "",
    important: "",
    allergies: "",
    prefectures: "",
    address1: "",
    address2: "",
    address3: "",
    telephone: "",
    "emergency-contact": [],
    img:''
  };
  return data;
}
function docid() {
  var data = {
    "child-doc-id": "",
    "parent-doc-id": "",
    "staff-doc-id": "",
    "principal-doc-id": ""
  };
  return data;
}
function dbPayload() {
  var data = {
    principalDocId: "",
    dbName: "",
    strWhere: [{ columnName: "", strCompare: "", compareVal: "" }],
    docIdList: [docid()]
  };
  return data;
}
