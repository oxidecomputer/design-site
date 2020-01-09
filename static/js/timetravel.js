const contentPref = "https://deploy-preview-";
const contentPost = "--design-oxide-computer.netlify.com/";

let prIndex = 0;

function firstPR() {
  prIndex = 0;
  changeContent();
}

function nextPR() {
  if (prIndex < prNumbers.length - 1) {
    prIndex = prIndex + 1;
  }
  changeContent();
}

function previousPR() {
  if (prIndex > 0) {
    prIndex = prIndex - 1;
  }
  changeContent();
}

function lastPR() {
  prIndex = prNumbers.length - 1;
  changeContent();
}

function changeContent() {
  pr = prMap.get(prNumbers[prIndex]);
  document.getElementById("myframe").src = contentPref + pr["number"] + contentPost;
  document.getElementById("prTitle").textContent = pr["title"];
  document.getElementById("prLink").href = pr["html_url"];
  document.getElementById("prAvatar").src = pr["user"]["avatar_url"];
  document.getElementById("prIndex").textContent = prIndex + 1;
  document.getElementById("prCount").textContent = prNumbers.length;
}
