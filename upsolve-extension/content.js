(function () {
  const url = window.location.href;
  const isContestSite =
    url.includes("codeforces.com") ||
    url.includes("leetcode.com") ||
    url.includes("codechef.com");

  if (!isContestSite && document.getElementById("ext-status-badge")) {
    const dot = document.getElementById("ext-dot");
    const txt = document.getElementById("ext-text");
    if (dot && txt) {
      dot.classList.add("connected");
      txt.textContent = "Extension connected";
    }

    function syncToPage() {
      chrome.storage.local.get({ upsolve_queue: [] }, (res) => {
        const extProblems = res.upsolve_queue || [];
        const webProblems = JSON.parse(localStorage.getItem("upsolve_tracker_v3") || "[]");

        let updated = false;
        extProblems.forEach((extP) => {
          const existing = webProblems.find((w) => w.url === extP.url);
          if (!existing) {
            webProblems.unshift(extP);
            updated = true;
          } else if (existing.status !== extP.status) {
            existing.status = extP.status;
            updated = true;
          }
        });

        if (updated) {
          localStorage.setItem("upsolve_tracker_v3", JSON.stringify(webProblems));
          window.dispatchEvent(new CustomEvent("upsolve-ext-sync"));
        }
      });
    }

    syncToPage();
    chrome.storage.onChanged.addListener(syncToPage);
    return;
  }

  if (!isContestSite) return;

  function injectButton() {
    if (document.getElementById("upsolve-plus-btn")) return;

    const titleEl = document.querySelector(
      ".problem-statement .header .title, [data-cy='question-title'], .text-title-large, a[href*='/problems/'].no-underline, h1"
    );
    if (!titleEl) return;

    const cleanUrl = window.location.href.split("?")[0];
    const platform = cleanUrl.includes("codeforces")
      ? "codeforces"
      : cleanUrl.includes("leetcode")
      ? "leetcode"
      : "codechef";

    const cfTags = Array.from(document.querySelectorAll(".tag-box")).map((el) =>
      el.innerText.trim().toLowerCase()
    );

    const btn = document.createElement("button");
    btn.id = "upsolve-plus-btn";
    btn.title = "Add to Upsolve Tracker";
    btn.style.cssText =
      "margin-left:10px; width:24px; height:24px; border-radius:50%; font-weight:800; font-size:14px; cursor:pointer; border:1px solid #6c63ff; background:#6c63ff; color:#fff; display:inline-flex; align-items:center; justify-content:center; vertical-align:middle; line-height:1;";

    chrome.storage.local.get({ upsolve_queue: [] }, (res) => {
      const existing = res.upsolve_queue.find((p) => p.url === cleanUrl);
      if (!existing) {
        btn.innerText = "+";
        btn.style.background = "#6c63ff";
        btn.title = "Add to Upsolve Queue";
      } else if (existing.status === "solved") {
        btn.innerText = "✓";
        btn.style.background = "#10b981";
        btn.style.borderColor = "#10b981";
        btn.title = "Solved! Click to unmark";
      } else {
        btn.innerText = "•";
        btn.style.background = "#f59e0b";
        btn.style.borderColor = "#f59e0b";
        btn.title = "In Upsolve Queue. Click to mark solved";
      }
    });

    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      chrome.storage.local.get({ upsolve_queue: [] }, (res) => {
        let list = res.upsolve_queue;
        const idx = list.findIndex((p) => p.url === cleanUrl);

        if (idx === -1) {
          list.unshift({
            id: "ext_" + Date.now(),
            platform,
            title: titleEl.innerText.replace(/[\+✓•]/g, "").trim(),
            url: cleanUrl,
            contest: platform === "codeforces" ? "Codeforces" : platform === "leetcode" ? "LeetCode" : "CodeChef",
            topics: cfTags.length ? cfTags.slice(0, 2) : ["greedy"],
            status: "todo",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
            note: "",
            updatedAt: Date.now()
          });
        } else if (list[idx].status !== "solved") {
          list[idx].status = "solved";
        } else {
          list[idx].status = "todo";
        }

        chrome.storage.local.set({ upsolve_queue: list }, () => {
          const old = document.getElementById("upsolve-plus-btn");
          if (old) old.remove();
          injectButton();
        });
      });
    };

    titleEl.appendChild(btn);
  }

  injectButton();
  const obs = new MutationObserver(() => injectButton());
  obs.observe(document.body, { childList: true, subtree: true });
})();
