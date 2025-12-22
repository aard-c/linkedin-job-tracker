let lastTitle = null;
let btn = null;

function getJobData() {
  const titleEl = document.querySelector("h1");
  const companyEl = document.querySelector(
    ".job-details-jobs-unified-top-card__company-name"
  );

  if (!titleEl || !companyEl) return null;

  return {
    title: titleEl.innerText.trim(),
    company: companyEl.innerText.trim()
  };
}

function resetButton() {
  if (!btn) return;
  btn.innerText = "Log Application";
  btn.disabled = false;
}

function ensureButton() {
  const data = getJobData();
  if (!data) return;

  
  if (data.title !== lastTitle) {
    lastTitle = data.title;
    resetButton();
  }

  if (btn) return;

  btn = document.createElement("button");
  btn.id = "job-log-btn";
  btn.innerText = "Log Application";

  btn.onclick = () => {
    const freshData = getJobData();
    if (!freshData) return;

    chrome.runtime.sendMessage({
      type: "SAVE_JOB",
      payload: freshData
    });

    btn.innerText = "Saved ✅";
    btn.disabled = true;

    
    setTimeout(resetButton, 4000);
  };

  const header = document.querySelector("h1")?.parentElement;
  if (header) header.appendChild(btn);
}


setInterval(ensureButton, 800);
