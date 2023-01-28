export const config = {
  firebase: {
    credentials: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY as string,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN as string,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET as string,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID as string,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID as string,
    },
  },
  pages: [
    { url: '/dashboard', display: 'Dashboard' },
    { url: '/library', display: 'Library' },
    { url: '/tags', display: 'Tags' },
    { url: '/settings', display: 'Settings' },
  ],
} as const;
