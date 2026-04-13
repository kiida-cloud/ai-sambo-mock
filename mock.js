(function () {
  "use strict";

  var SESSION_KEY = "ai_sambo_mock_session";
  /** file:// や制限付きブラウザで sessionStorage が使えないときの代替 */
  var memoryLoggedIn = false;
  var storageOk = true;

  try {
    sessionStorage.setItem("__mock_test", "1");
    sessionStorage.removeItem("__mock_test");
  } catch (err) {
    storageOk = false;
  }

  function isLoggedIn() {
    if (!storageOk) return memoryLoggedIn;
    try {
      return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {
      return memoryLoggedIn;
    }
  }

  function setLoggedIn(v) {
    memoryLoggedIn = !!v;
    if (!storageOk) return;
    try {
      if (v) sessionStorage.setItem(SESSION_KEY, "1");
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      storageOk = false;
    }
  }

  function parseHash() {
    var h = (window.location.hash || "#/").replace(/^#/, "");
    if (h === "" || h === "/") return { area: "public", path: "home" };
    var parts = h.replace(/^\//, "").split("/");
    if (parts[0] === "member") {
      return { area: "member", path: parts[1] || "home" };
    }
    return { area: "public", path: parts[0] || "home" };
  }

  function normalizePublicPath(p) {
    var map = {
      home: "home",
      program: "program",
      plan: "plan",
      flow: "flow",
      faq: "faq",
      contact: "contact",
    };
    return map[p] || "home";
  }

  function normalizeMemberPath(p) {
    var map = {
      home: "home",
      schedule: "schedule",
      training: "training",
      "group-consulting": "group-consulting",
      "skill-factory": "skill-factory",
      conference: "conference",
      community: "community",
      library: "library",
      account: "account",
    };
    return map[p] || "home";
  }

  function setHashFor(area, path) {
    if (area === "member") {
      window.location.hash = path === "home" ? "#/member" : "#/member/" + path;
    } else {
      window.location.hash = path === "home" ? "#/" : "#/" + path;
    }
  }

  function updateBodyClass() {
    document.body.classList.toggle("is-member", isLoggedIn());
  }

  function showViews(area, path) {
    var views = document.querySelectorAll(".view");
    views.forEach(function (el) {
      el.classList.remove("is-visible");
    });

    if (area === "member") {
      var memberViews = document.querySelectorAll("[data-member-view]");
      memberViews.forEach(function (el) {
        if (el.getAttribute("data-member-view") === path) {
          el.classList.add("is-visible");
        }
      });
      document.querySelectorAll(".member-nav a[data-nav]").forEach(function (a) {
        a.classList.toggle("is-active", a.getAttribute("data-nav") === path);
      });
    } else {
      var id = "view-" + path;
      var el = document.getElementById(id);
      if (el) el.classList.add("is-visible");
      document.querySelectorAll(".nav-main a[data-public-nav]").forEach(function (a) {
        var nav = a.getAttribute("data-public-nav");
        var active = path === "home" ? nav === "home" : nav === path;
        a.classList.toggle("is-active", active);
      });
    }
  }

  function route() {
    updateBodyClass();
    var loc = parseHash();

    if (isLoggedIn()) {
      if (loc.area !== "member") {
        window.location.hash = "#/member";
        return;
      }
      showViews("member", normalizeMemberPath(loc.path));
      return;
    }

    if (loc.area === "member") {
      window.location.hash = "#/";
      return;
    }

    showViews("public", normalizePublicPath(loc.path));
  }

  function openModal() {
    document.getElementById("login-modal").classList.add("is-open");
    document.getElementById("login-email").focus();
  }

  function closeModal() {
    document.getElementById("login-modal").classList.remove("is-open");
  }

  function performLogin() {
    setLoggedIn(true);
    closeModal();
    setHashFor("member", "home");
    route();
  }

  function doMockLogin(e) {
    e.preventDefault();
    performLogin();
  }

  function logout() {
    setLoggedIn(false);
    window.location.hash = "#/";
    route();
  }

  function initNav() {
    document.querySelectorAll(".nav-main a[data-public-nav]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var nav = a.getAttribute("data-public-nav");
        if (nav === "home") {
          e.preventDefault();
          setHashFor("public", "home");
        } else {
          e.preventDefault();
          setHashFor("public", nav);
        }
      });
    });

    document.querySelectorAll(".member-nav a[data-nav]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var nav = a.getAttribute("data-nav");
        setHashFor("member", nav);
        route();
      });
    });

    var logo = document.querySelector(".site-logo");
    if (logo) {
      logo.addEventListener("click", function (e) {
        if (!isLoggedIn()) {
          e.preventDefault();
          setHashFor("public", "home");
        }
      });
    }
  }

  function initLoginButtons() {
    document.querySelectorAll("[data-open-login]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    document.querySelectorAll("[data-quick-demo-login]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        performLogin();
      });
    });

    document.querySelectorAll("[data-close-modal]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });

    var form = document.getElementById("login-form");
    if (form) form.addEventListener("submit", doMockLogin);

    document.getElementById("login-modal").addEventListener("click", function (e) {
      if (e.target.id === "login-modal") closeModal();
    });

    document.querySelectorAll("[data-logout]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        logout();
      });
    });
  }

  function initFaq() {
    document.querySelectorAll(".faq-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".faq-item");
        var open = item.classList.contains("is-open");
        document.querySelectorAll(".faq-item").forEach(function (i) {
          i.classList.remove("is-open");
        });
        if (!open) item.classList.add("is-open");
      });
    });
  }

  function initContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("【モック】送信は行われません。実装時にフォーム連携を接続してください。");
    });
  }

  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initLoginButtons();
    initFaq();
    initContactForm();
    route();
  });
})();
