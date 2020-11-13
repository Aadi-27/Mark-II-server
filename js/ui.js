const form = document.querySelector("form");
const submitBtn = document.querySelector(".save-btn");

function handleOnSubmit(e) {
  e.preventDefault();
  const time = document.querySelector("#time-input").value;
  const title = document.querySelector("#title-input").value;
  const link = document.querySelector("#link-input").value;
  const savedIcon = document.querySelector("#saved-svg");

  const value = { time, title, link };

  idbKeyval
    .set(Math.random(), value)
    .then(() => displayNotification(title, link, time))
    // .then(() => (savedIcon.style.visibility = "visible"))
    .catch((err) => console.log(err));

  form.reset();
}

form.addEventListener("submit", (e) => handleOnSubmit(e));
