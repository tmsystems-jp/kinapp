export default ({ app, store, context }, inject) => {
  inject("ifchildren", () => children());
};
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
