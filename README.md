# SaaS Contracts Dashboard

## Live Demo
<replace-with-vercel-link>

## Tech
- React (hooks)
- Tailwind CSS
- Context API (Auth)
- react-router-dom
- Deployed on Vercel

## Run locally
1. `git clone <repo>`
2. `npm install`
3. `npm run dev`
4. App is served locally (Vite or CRA)...

(If using Create React App update commands accordingly)

## Mock API
- `public/contracts.json` contains the contracts list.
- Contract detail can be found in `public/contracts/<id>.json` or derived client-side.

## Decisions & Assumptions
- Auth is mocked; password must be `test123`.
- Uploads are simulated client-side with random success/error.
- All filters/search are client-side for simplicity.

## Folder Structure
(see file structure)

## Accessibility & Testing
- Keyboard accessible forms.
- Color contrast checked roughly using Tailwind defaults.

## Deployment
- Push to GitHub
- Connect repo in Vercel → automatic build & deploy

