# Publish RAMSA on GitHub Pages

The GitHub connector in this chat can read/write **existing repositories** but currently cannot create a new repository. Create one at https://github.com/new first.

1. Owner: your GitHub account (the connected account appears as `muneeraaaa`). Repository: `ramsa-heritage-demo`. Keep it public if using the standard Free GitHub Pages workflow. Do not add README or license in GitHub's create form because this archive has both already.
2. Extract the supplied `ramsa-heritage-demo.zip` and open a terminal inside the folder.
3. Run `npm test`, `npm run build`, then `npm run dev` and open the URL printed by the terminal.
4. Run:
   ```bash
   git init
   git branch -M main
   git add .
   git commit -m "Initial RAMSA bilingual demo and two-agent workspace"
   git remote add origin https://github.com/muneeraaaa/ramsa-heritage-demo.git
   git push -u origin main
   ```
5. On GitHub: Settings → Pages → Build and deployment → Source: **GitHub Actions**.
6. Open Actions → "Deploy RAMSA to GitHub Pages". Wait for the successful deployment. The resulting site should be at `https://muneeraaaa.github.io/ramsa-heritage-demo/` once GitHub confirms it.
7. In repo Settings → Collaborators and teams, invite your friend; they accept. Give each agent a separate branch per `docs/TWO_AGENT_WORKFLOW.md`.
8. Add the verified site URL or QR code to official competition entry slide 14.

### Why the site works under a project URL
All assets and JS modules use `./` relative URLs; pages use hash routes, so browser refresh and navigation stay on the same HTML entrypoint.

### Media and legal review before public push
This archive includes images extracted from supplied presentations and concept videos. Confirm you have permission to publish every asset. If rights are unclear, remove or replace it **before** pushing public. Do not publish participant dates of birth or private information.

### Repository visibility
Public repository means source, sample data and all uploaded media can be downloaded by anyone. Do not add sensitive material.
