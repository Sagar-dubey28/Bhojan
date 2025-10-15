Deploying the client to Netlify

1. Build command
   - Netlify will use: `npm run build`
   - Publish directory: `dist`

2. Environment variables
   - Add `VITE_BACKEND_URL` in Netlify Site > Site settings > Build & deploy > Environment > Environment variables.
   - Example value for production: `https://bhojan-backend-he8h.onrender.com`

3. Automatic deploy from Git
   - Connect your GitHub/GitLab/Bitbucket repo to Netlify and select the `client` folder as the project root if you deploy only the client folder.
   - If root is the monorepo, set the base directory to `client` in the Netlify UI.

4. Manual deploy
   - Build locally with `npm run build` and drag-and-drop the `dist` folder in Netlify's deploy UI.

5. Common issues
   - Vite env variables only work at build time. Make sure `VITE_` prefixed vars are set in Netlify.
   - If using client-side routing (react-router), add `_redirects` file to `dist` with `/* /index.html 200` or set Netlify redirect rules.

6. Helpful commands
```powershell
cd client
npm install
npm run build
# Serve locally
npm run preview
```

7. Optional: add `_redirects` for SPA routing
- Create `client/public/_redirects` with:
  /*    /index.html   200
- This ensures client-side routes work on page refresh.
