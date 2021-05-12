export default ({ app, store, context }, inject) => {
  inject("ifchildren", () => children());
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
    "emergency-contact": []
  };
  return data;
}
