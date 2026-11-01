🎯 Upsolve Tracker

Never forget a contest problem again. A minimalist competitive programming upsolve manager with a 1-click browser extension and a clean dashboard.

✨ Features

1-Click Extension (+ button): Automatically injects a minimalist + button directly onto contest problem lists, practice tables, and problem pages on Codeforces, LeetCode, and CodeChef.

Automatic Subtopic Theory Links: Every problem topic (greedy, dp, math, graphs, trees, binary search, etc.) comes with direct C++ subtopic tutorial links to CP-Algorithms and USACO Guide.

Clean Queue & Solved Sections: Split into 🎯 Upsolve Problems (what you need to solve) and ✅ Recently Solved (solved problems automatically move down).

Light & Dark Mode: Smooth theme switcher built right into the header.

No Backend Required: Runs locally in your browser with instant auto-sync between contest sites and your web dashboard.

📂 Repository Structure

upsolve-tracker/
├── README.md
├── upsolve-web/
│   └── index.html          # Your main dashboard interface
└── upsolve-extension/
    ├── manifest.json       # Chrome Extension Manifest V3 configuration
    ├── content.js          # Injects the '+' button & handles auto-sync
    ├── icon16.png          # 16x16 toolbar icon
    ├── icon48.png          # 48x48 extension icon
    └── icon128.png         # 128x128 store icon


🚀 Installation & Setup (No Git Required)

1. Install the Chrome Extension

Download or clone this repository to your computer.

Open Google Chrome and go to chrome://extensions/.

Enable Developer mode using the toggle switch in the top-right corner.

Click Load unpacked in the top-left corner.

Select the upsolve-extension folder from this repository.

2. Open Your Dashboard

Double-click upsolve-web/index.html to open your dashboard instantly in your browser, or deploy the upsolve-web folder for free on Netlify/Vercel.

The top-right badge will automatically turn green (● Extension connected) once active.

💡 How to Use

Browse Contests: Go to Codeforces, LeetCode, or CodeChef. You will see a small purple + button in front of problems or next to problem titles.

Add to Queue: Click + to add a problem to your upsolve list instantly.

Study Theory: Click the 📘 CP-Algo or 📖 USACO links on your dashboard to review subtopic theory before solving.

Mark as Solved: Click Solved on any card to move it to your Recently Solved archive.
