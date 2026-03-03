# Push this project to GitHub

Git is initialized and the initial commit is done. To put the project on GitHub:

1. **Create a new repository on GitHub**
   - Go to [github.com/new](https://github.com/new).
   - Repository name: `fees-manager` (or any name you prefer).
   - Leave it **empty** (no README, no .gitignore, no license).
   - Click **Create repository**.

2. **Add the remote and push** (replace `YOUR_USERNAME` with your GitHub username):

   ```bash
   cd "/Users/oscarabizanda/code-projects/fees manager"
   git remote add origin https://github.com/YOUR_USERNAME/fees-manager.git
   git branch -M main
   git push -u origin main
   ```

   If you use SSH:

   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/fees-manager.git
   git branch -M main
   git push -u origin main
   ```

3. **Optional – GitHub CLI**  
   If you install [GitHub CLI](https://cli.github.com/) and run `gh auth login`, you can create and push in one step:

   ```bash
   gh repo create fees-manager --private --source=. --remote=origin --push
   ```

   Use `--public` instead of `--private` if you want the repo public.

---

## Deploy to GitHub Pages (after first push)

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds and deploys the app on every push to `main`.

1. **Enable GitHub Pages from Actions**
   - On GitHub, open your repo → **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

2. **Trigger a deploy**
   - Push a commit to `main` (or re-run the "Deploy to GitHub Pages" workflow from the **Actions** tab).
   - After the workflow completes, the site will be available at:
   - **Project site:** `https://<username>.github.io/fees-manager/`
   - Replace `<username>` with your GitHub username (e.g. `osukakoda`).

3. **Custom domain (optional)**
   - To use e.g. `oscarabizanda.site/fees-manager`, configure your domain in **Settings → Pages** (Custom domain) and point the subpath to the same Pages site, or use a reverse proxy. The app is built with `base: '/fees-manager/'` and `basename: '/fees-manager'` so it works at that subpath.
