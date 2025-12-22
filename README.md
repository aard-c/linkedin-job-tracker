# LinkedIn Job Application Logger (Chrome Extension)

A lightweight Chrome extension that logs your LinkedIn job applications with one click and lets you export them as a CSV file.

No copy-pasting. No spreadsheets while applying.  
Just apply → log → export.

---

##  Features

-  One-click **Log Application** button on LinkedIn job pages
-  Works with LinkedIn’s single-page navigation (no hard refresh needed)
-  Stores applications locally using Chrome storage
-  Popup dashboard to view logged applications
-  Delete individual entries before exporting
-  Export all logged applications as a CSV file

---

## 🗂 Logged Data Structure

Each logged application contains:

- Job title
- Company name
- Application date (ISO format)

Example:
```json
{
  "title": "Full Stack Engineer",
  "company": "xxx Company",
  "date": "2000-01T01:00:00.000Z"
} 
