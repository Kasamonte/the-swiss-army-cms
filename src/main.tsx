
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import cmsConfig, { createCmsConfig } from './config/cmsConfig.ts'

// Example of how to customize the CMS when installing on different websites:
// const customConfig = createCmsConfig({
//   theme: {
//     siteName: 'My Website CMS',
//     accentColor: '#3b82f6',
//     logoUrl: '/images/logo.svg',
//   },
//   features: {
//     blog: true,
//     pages: true,
//     media: true,
//     users: false, // Disable users module
//     settings: true,
//   },
//   api: {
//     baseUrl: 'https://api.example.com',
//   }
// });

// Pass the config to the App component
createRoot(document.getElementById("root")!).render(<App />);
