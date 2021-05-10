export default ({ app, store, context }, inject) => {
  inject("ifchildren", () => children());
  inject("ifdb", () => db());
};
function db() {
  var data = {
    "1": "principal",
    "2": "children",
    "3": "parent",
    "4": "staff",
    "5": "item"
  };
  return data;
}
function children() {
  var data = {
    "first-name": "",
    "last-name": "",
    nickname: "",
    birthday: "",
    gender: "",
    blood: "",
    "pre-s": "",
    "school-class": "",
    "going-school": "",
    "gus-course": "",
    parent: "",
    principal: "",
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
