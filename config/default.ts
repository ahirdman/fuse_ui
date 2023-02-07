const config = {
  firebase: {
    credentials: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY as string,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN as string,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID as string,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET as string,
      messagingSenderId: process.env
        .NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID as string,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APPID as string,
      measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID as string,
    },
    emulators: {
      authentication: {
        isActive: process.env.NODE_ENV === "development",
        url: "http://localhost:9099",
      },
      db: {
        isActive: process.env.NODE_ENV === "development",
        origin: "localhost",
        port: 8080,
      },
      cloudFunctions: {
        isActive: process.env.NODE_ENV === "development",
        origin: "localhost",
        port: 5001,
      },
    },
  },
  pages: [
    { url: "/dashboard", display: "Dashboard" },
    { url: "/library", display: "Library" },
    { url: "/tags", display: "Tags" },
    { url: "/settings", display: "Settings" },
  ],
};

export default config;
