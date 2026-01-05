const list = document.getElementById("list");
const exportBtn = document.getElementById("export");
const clearBtn = document.getElementById("clear");

function renderList() {
  chrome.storage.local.get("applications", (res) => {
    const apps = res.applications || [];
    list.innerHTML = "";

    if (!apps.length) {
      list.innerHTML = "<li><em>No applications logged.</em></li>";
      return;
    }

    apps.forEach((app, index) => {
      const li = document.createElement("li");

      const text = document.createElement("div");
      text.className = "job-text";
      text.textContent = `${app.title} @ ${app.company}`;

      const del = document.createElement("button");
      del.className = "delete";
      del.textContent = "✕";

      del.onclick = () => {
        chrome.runtime.sendMessage({ type: "DELETE_JOB", index });
        setTimeout(renderList, 100); 
      };

      li.appendChild(text);
      li.appendChild(del);
      list.appendChild(li);
    });
  });
}

exportBtn.onclick = () => {
  chrome.runtime.sendMessage({ type: "EXPORT_CSV" });
};

clearBtn.onclick = () => {
  if (!confirm("Are you sure you want to delete ALL logged applications?")) {
    return;
  }

  chrome.runtime.sendMessage({ type: "CLEAR_ALL" });
  setTimeout(renderList, 100); // ✅ this fixes it
};

renderList();
