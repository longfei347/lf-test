function messageHandler(e) {
  console.log(e.data)
  postMessage("worker says: " + e.data + " too");
}

addEventListener("message", messageHandler, true);
