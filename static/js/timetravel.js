const previewURLPrefix = "https://design-site-git";
const previewURLSuffix = ".oxidecomputer.now.sh";

const $timeFrame = document.querySelector("#time-frame");
const $prTitle = document.querySelector("#prTitle");
const $prLink = document.querySelector("#prLink");
const $prAvatar = document.querySelector("#prAvatar");
const $prIndex = document.querySelector("#prIndex");
const $prCount = document.querySelector("#prCount");

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
  const pr = prMap.get(prNumbers[prIndex]);
  // TODO: Replace checks with ES2020 Optional Chaining
  // to prevent breaking when repo does not exist anymore
  const isFork = pr.head.repo && pr.head.repo.fork || false;
  const owner = pr.head.repo && pr.head.repo.owner.login || '';
  const ref = pr.head.ref;

  // Will be: prefix-fork-owner-ref-suffix
  // Or: prefix-ref-suffix
  $timeFrame.src = `${previewURLPrefix}${isFork ? `-fork-${owner}` : ''}-${ref}${previewURLSuffix}`;
  $prTitle.textContent = pr.title;
  $prLink.href = pr.html_url;
  $prAvatar.src = pr.user.avatar_url;
  $prIndex.textContent = prIndex + 1;
  $prCount.textContent = prNumbers.length;
}

document.addEventListener("DOMContentLoaded", function() {
  lastPR();
});