# AI参謀室サービスサイト・モック

`SHIFT AI Fs`（GitHub: **shift-ai-fs**）と**同じ親フォルダ（CloudDocs）上で同列**にある、静的HTMLモックです。

## リポジトリ（GitHub）

**https://github.com/kiida-cloud/ai-sambo-mock**

## ローカルで開く

`index.html` をブラウザで開いてください（`mock.css` · `mock.js` は同フォルダに配置）。

## GitHub Pages で公開する

1. リポジトリ **Settings → Pages**
2. Source: **Deploy from a branch**、Branch **main**、Folder **/ (root)**
3. 公開後のURL例: **https://kiida-cloud.github.io/ai-sambo-mock/**

（初回は数分かかることがあります。）

**公開URLは誰でも開けます。** 閲覧制限が必要なら **非公開リポジトリ + Pages（有料）**、**Cloudflare Access**、**別ホスティングの認証**などを検討してください。

## 開発者向け：クローン後に push するまで

```bash
git clone https://github.com/kiida-cloud/ai-sambo-mock.git
cd ai-sambo-mock
# 編集後
git add -A && git commit -m "..." && git push
```

## 内容

- 表サイト（ハッシュルーティング）と会員エリアのモック
- 会員ログインはダミー（`sessionStorage` またはメモリ）

仕様の一次情報は **shift-ai-fs** 内の `プロダクト/AI参謀室/05_サービスサイト/` を参照してください。
