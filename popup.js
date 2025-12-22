const list = document.getElementById("list");
const exportBtn = document.getElementById("export");

function renderList() {
  chrome.storage.local.get("applications", (res) => {
    const apps = res.applications || [];
    list.innerHTML = "";

    apps.forEach((app, index) => {
      const li = document.createElement("li");

      const text = document.createElement("div");
      text.className = "job-text";
      text.textContent = `${app.title} @ ${app.company}`;

      const del = document.createElement("button");
      del.className = "delete";
      del.textContent = "✕";
      del.title = "Delete entry";

      del.onclick = () => {
        chrome.runtime.sendMessage(
          { type: "DELETE_JOB", index },
          () => renderList()
        );
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

renderList();
