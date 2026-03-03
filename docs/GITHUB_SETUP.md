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
