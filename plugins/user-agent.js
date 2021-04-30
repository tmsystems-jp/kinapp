export default function (context, inject) {
  const userAgent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;
  let isPC = true;
  if (userAgent.match(/iPhone|iPad|Android.+Mobile|Mobile/)) {
    isPC = false;
  }
  inject("isPC", isPC);
}
