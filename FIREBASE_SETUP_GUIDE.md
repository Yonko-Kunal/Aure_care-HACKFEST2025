# Firebase Authentication Setup Guide

## What I've Done

I've set up Firebase Authentication with Google Sign-In for your Next.js app. Here's what's been implemented:

### Files Created:
1. **src/lib/firebase.js** - Firebase configuration and initialization
2. **src/contexts/AuthContext.js** - Authentication context provider
3. **src/components/ProtectedRoute.js** - Component to protect routes
4. **.env.local.example** - Template for environment variables

### Files Updated:
1. **src/app/layout.js** - Added AuthProvider wrapper
2. **src/components/login-form.jsx** - Added Google sign-in functionality

---

## Setup Steps

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

### 2. Enable Google Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Click on **Google** provider
3. Toggle **Enable**
4. Add your project support email
5. Click **Save**

### 3. Register Your Web App

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Aura Care Web")
5. Copy the Firebase configuration object

### 4. Configure Environment Variables

1. Create a `.env.local` file in your project root (copy from `.env.local.example`)
2. Fill in your Firebase credentials from step 3:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 5. Configure Authorized Domains

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (for development)
   - Your production domain (e.g., `yourapp.com`)

---

## How to Use

### Protect a Page

Wrap your page content with `ProtectedRoute`:

```jsx
"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div>Your protected content here</div>
        </ProtectedRoute>
    );
}
```

### Access User Information

Use the `useAuth` hook anywhere in your app:

```jsx
"use client";

import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
    const { user, signOut } = useAuth();

    return (
        <div>
            <p>Welcome, {user?.displayName}</p>
            <img src={user?.photoURL} alt="Profile" />
            <button onClick={signOut}>Sign Out</button>
        </div>
    );
}
```

### Available Auth Methods

From `useAuth()`:
- `user` - Current user object (null if not signed in)
- `loading` - Boolean indicating auth state loading
- `signInWithGoogle()` - Function to sign in with Google
- `signOut()` - Function to sign out

---

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/login`

3. Click "Continue with Google"

4. Sign in with your Google account

5. You'll be redirected to the home page

---

## Security Notes

- Never commit `.env.local` to version control
- The `.env.local.example` file is safe to commit
- Firebase API keys are safe to expose in client-side code (they're restricted by domain)
- Always configure authorized domains in Firebase Console

---

## Troubleshooting

### "auth/unauthorized-domain" Error
- Add your domain to Authorized domains in Firebase Console

### "auth/popup-blocked" Error
- Browser is blocking the popup
- User needs to allow popups for your site

### Environment Variables Not Loading
- Restart your dev server after changing `.env.local`
- Make sure variables start with `NEXT_PUBLIC_`

---

## Next Steps

Consider adding:
- Sign out button in your sidebar
- User profile display
- Protected routes for authenticated users only
- Redirect logged-in users away from login page
- Error handling and user feedback
