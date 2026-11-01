# 🎯 Upsolve Tracker for Competitive Programming

Never forget a contest problem again. Upsolve Tracker is a lightweight web dashboard paired with a minimalist Chrome extension that lets you 1-click track problems across **Codeforces**, **LeetCode**, and **CodeChef**.

---

## ✨ Features
- **Minimalist 1-Click Plus Button:** Injects a tiny `+` button directly onto contest problem lists and problem pages on Codeforces, LeetCode, and CodeChef.
- **Targeted Subtopic Theory Links:** Automatically attaches direct tutorial links from **CP-Algorithms** and **USACO Guide** (set to C++) for every problem topic.
- **Auto-Archive Solved Problems:** When marked as solved, problems instantly vanish from your main queue and drop down into a clean "Recently Solved" section.
- **Light & Dark Mode:** Built-in theme switcher with persistent user preferences.

---

## 🚀 Installation and Setup

### 1. Install the Chrome Extension
1. Download or clone this repository.
2. Open Google Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top-right corner).
4. Click **Load unpacked** and select the `upsolve-extension` folder from this repo.

### 2. Open the Web Dashboard
- Open the `upsolve-web/index.html` file directly in your browser, or visit the live deployed version.
- The top-right badge will automatically show **Extension connected** once active.

---

## 📂 Project Structure
```text
upsolve-tracker/
├── README.md
├── upsolve-web/
│   └── index.html        # Main dashboard UI
└── upsolve-extension/
    ├── manifest.json     # Extension manifest v3 config
    ├── content.js        # DOM injector & sync bridge
    └── icon*.png         # App icons
