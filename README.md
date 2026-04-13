# AI参謀室サービスサイト・モック

`SHIFT AI Fs`（GitHub: **shift-ai-fs**）と**同じ親フォルダ（CloudDocs）上で同列**にある、静的HTMLモックです。

## リポジトリ（GitHub）

**https://github.com/kiida-cloud/ai-sambo-mock**

## 閲覧パスワード（簡易ゲート）

GitHub Pages には **HTTP の BASIC 認証がありません**。代わりに **`gate.js`** でクライアント側のパスワード画面を出しています。

1. **`gate.js`** を開き、次を編集してから push してください。
   - `SITE_ACCESS_PASSWORD` … 配布したい閲覧用パスワード（プレースホルダ `CHANGE_ME_PREVIEW` のままだとコンソールに警告が出ます）
   - `GATE_ENABLED` … ゲートをオフにしたいときは `false`（ローカル確認用）
2. 通過後は **同一タブの `sessionStorage`** に記録され、タブを閉じるまで再入力不要です。

**注意**: パスワードは **リポジトリのソースに含まれる**ため、リポジトリ閲覧権限がある人にはバレます。厳密なアクセス制御には **Cloudflare Access**、**非公開 Pages（有料プラン）**、**別ホスティングの認証**などを検討してください。

## ローカルで開く

`index.html` をブラウザで開いてください（`gate.js` · `mock.css` · `mock.js` は同フォルダに配置）。

## GitHub Pages で公開する

1. リポジトリ **Settings → Pages**
2. Source: **Deploy from a branch**、Branch **main**、Folder **/ (root)**
3. 公開後のURL例: **https://kiida-cloud.github.io/ai-sambo-mock/**

（初回は数分かかることがあります。）

## 開発者向け：クローン後に push するまで

```bash
git clone https://github.com/kiida-cloud/ai-sambo-mock.git
cd ai-sambo-mock
# 編集後
git add -A && git commit -m "..." && git push
```

## 内容

- 表サイト（ハッシュルーティング）と会員エリアのモック
- 閲覧ゲート（`gate.js`）
- 会員ログインはダミー（`sessionStorage` またはメモリ）

仕様の一次情報は **shift-ai-fs** 内の `プロダクト/AI参謀室/05_サービスサイト/` を参照してください。
