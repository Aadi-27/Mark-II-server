Notification.requestPermission(function (status) {
  console.log("Notification permission status:", status);
});

async function displayNotification(title, link, time) {
  const reg = await navigator.serviceWorker.getRegistration();
  if (Notification.permission !== "granted") {
    alert("You need to allow push notifications to set reminder!");
  } else {
    const timestamp = new Date().getTime() + time * 3600000;
    reg.showNotification("Forgetting something ?", {
      tag: timestamp,
      body: `Read ${title}`,
      data: {
        url: link,
      },
      badge: "../images/blue.jpg",
    });
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js")
    .then((reg) => console.log("SW registered", reg))
    .catch((err) => console.log("SW not registered due to:", err));
}
