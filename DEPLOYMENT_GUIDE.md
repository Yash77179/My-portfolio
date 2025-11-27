# Hosting Your Portfolio on GitHub

Since Git is not currently installed on your system, I cannot automate the final push for you. However, I have prepared your project for deployment.

## Step 1: Install Git
1. Download Git from [git-scm.com](https://git-scm.com/downloads).
2. Install it (you can click "Next" through the default options).
3. Restart VS Code after installation.

## Step 2: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name the repository **My-portfolio** (It must match the name in `vite.config.js`).
3. Click **Create repository**.

## Step 3: Push Your Code
Open a new terminal in VS Code (Terminal > New Terminal) and run these commands one by one:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/My-portfolio.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` with your actual GitHub username)*

## Step 4: Deploy
Once the code is on GitHub, run this command in your VS Code terminal:

```bash
npm run deploy
```

## Step 5: Enable GitHub Pages
1. Go to your repository settings on GitHub.
2. Scroll down to **Pages** (or look in the sidebar).
3. Ensure the source is set to `gh-pages` branch.
4. Your site will be live at `https://YOUR_USERNAME.github.io/My-portfolio/`.
