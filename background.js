chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "SAVE_JOB") {
    chrome.storage.local.get(["applications"], (res) => {
      const applications = res.applications || [];

      applications.push({
        date: new Date().toISOString(),
        title: msg.payload.title,
        company: msg.payload.company
      });

      chrome.storage.local.set({ applications });
    });
  }

  if (msg.type === "DELETE_JOB") {
    chrome.storage.local.get(["applications"], (res) => {
      const applications = res.applications || [];

      applications.splice(msg.index, 1);

      chrome.storage.local.set({ applications }, () => {
        sendResponse();
      });
    });

    return true; 
  }

  if (msg.type === "EXPORT_CSV") {
    chrome.storage.local.get("applications", (res) => {
      const apps = res.applications || [];
      if (!apps.length) return;

      const header = "Date,Title,Company\n";
      const rows = apps
        .map(a =>
          `"${a.date}","${a.title.replace(/"/g, '""')}","${a.company.replace(/"/g, '""')}"`
        )
        .join("\n");

      const csvContent = header + rows;
      const dataUrl =
        "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);

      chrome.downloads.download({
        url: dataUrl,
        filename: "linkedin_applications.csv",
        saveAs: true
      });
    });
  }
});
