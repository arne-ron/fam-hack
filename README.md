# Family Hack 🏠

A collaborative family scheduling app built for FamHack 2026. Sync your Outlook and Google calendars to find the perfect time for family events!

## Features
- **Calendar Sync:** Connect your personal Outlook or Google calendars.
- **Privacy First:** Only "Busy" blocks are shared; event subjects are redacted.
- **Optimal Time Suggestions:** An algorithm ranks the best meeting times based on everyone's availability.
- **Shared Database:** Real-time sync across family members using Firebase.
- **Dark Mode:** Full support for dark and light themes.

## Getting Started

### Prerequisites
- Node.js (v18+)
- A Google Cloud Project (for Google Calendar API)
- An Azure App Registration (for Microsoft Graph API)
- A Firebase Project (for Firestore)

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/fam-hack.git
   cd fam-hack
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root and add your keys (see `.env.example`).

### Running Locally
```bash
npm run dev
```

## Deployment to GitHub Pages

This project is configured to deploy automatically via GitHub Actions when pushing to `main`.

### Setup GitHub Secrets
For the build to work on GitHub, you must add the following **Secrets** in your repository settings (**Settings > Secrets and variables > Actions**):

- `VITE_MICROSOFT_CLIENT_ID`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Configure Authorized Domains
Ensure `https://your-username.github.io` is added to:
1. **Azure:** Redirect URIs (SPA).
2. **Google Cloud:** Authorized JavaScript origins.
3. **Firebase:** Authorized domains in Authentication settings.
