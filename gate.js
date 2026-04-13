/**
 * サイト閲覧用の簡易パスワードゲート（クライアントのみ）
 *
 * 限界: パスワードはこのファイルに含まれるため、リポジトリを見れば判明します。
 * 真の認証が必要なら Cloudflare Access・Netlify/Vercel の保護・非公開 Pages 等を検討してください。
 */
(function () {
  "use strict";

  /** false にするとゲートを無効化（ローカル確認用） */
  var GATE_ENABLED = true;

  /**
   * 閲覧用パスワード（デプロイ前に必ず変更してください）
   * GitHub に push した時点で履歴に残るため、機密を置かない・別手段と併用を推奨
   */
  var SITE_ACCESS_PASSWORD = "shiftai2026";

  var STORAGE_KEY = "ai_sambo_site_gate_ok";

  function hideGate() {
    var el = document.getElementById("auth-gate");
    if (el) el.classList.add("auth-gate--done");
  }

  function tryUnlockFromStorage() {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") {
        hideGate();
        return true;
      }
    } catch (e) {
      /* sessionStorage 不可時は毎回入力 */
    }
    return false;
  }

  function bindForm() {
    var form = document.getElementById("auth-gate-form");
    var input = document.getElementById("auth-gate-pass");
    var err = document.getElementById("auth-gate-error");
    if (!form || !input) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (err) err.textContent = "";
      var entered = String(input.value || "")
        .replace(/^\uFEFF/, "")
        .trim();
      var expected = String(SITE_ACCESS_PASSWORD || "").trim();
      if (
        entered.length > 0 &&
        entered.toLowerCase() === expected.toLowerCase()
      ) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch (err2) {
          /* 保存できなくても今回の表示は通す */
        }
        hideGate();
      } else {
        if (err) err.textContent = "パスワードが正しくありません";
        input.value = "";
        input.focus();
      }
    });
  }

  function init() {
    if (!GATE_ENABLED) {
      hideGate();
      return;
    }
    if (SITE_ACCESS_PASSWORD === "CHANGE_ME_PREVIEW") {
      console.warn(
        "[ai-sambo-mock] gate.js: SITE_ACCESS_PASSWORD が初期値のままです。公開前に変更してください。"
      );
    }
    if (tryUnlockFromStorage()) return;
    bindForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
