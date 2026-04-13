# AI参謀室サービスサイト・モック

`SHIFT AI Fs`（GitHub: **shift-ai-fs**）と**同じ親フォルダ（CloudDocs）上で同列**にある、静的HTMLモックです。

## ローカルで開く

`index.html` をブラウザで開いてください（`mock.css` · `mock.js` は同フォルダに配置）。

## GitHub に「モック専用リポジトリ」として載せる例

1. GitHub で空のリポジトリを作成（例: `ai-sambo-mock`）
2. このフォルダで:

```bash
cd "/path/to/ai-sambo-mock"
git init
git add index.html mock.css mock.js README.md
git commit -m "Initial commit: AI参謀室サービスサイトモック"
git branch -M main
git remote add origin git@github.com:<ユーザー>/<リポジトリ>.git
git push -u origin main
```

3. **Settings → Pages** で Source: **Deploy from a branch**、Branch **main**、Folder **/ (root)**

公開URL例: `https://<ユーザー>.github.io/<リポジトリ>/`

## 内容

- 表サイト（ハッシュルーティング）と会員エリアのモック
- ログインはダミー（`sessionStorage` またはメモリ）

仕様の一次情報は **shift-ai-fs** 内の `プロダクト/AI参謀室/05_サービスサイト/` を参照してください。
