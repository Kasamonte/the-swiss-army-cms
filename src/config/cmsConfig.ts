
import { ThemeConfig } from '@/context/ThemeContext';

export interface CMSConfig {
  theme: ThemeConfig;
  features: {
    blog: boolean;
    pages: boolean;
    media: boolean;
    users: boolean;
    settings: boolean;
  };
  api: {
    baseUrl: string;
    endpoints: {
      pages: string;
      posts: string;
      media: string;
      users: string;
      settings: string;
    };
  };
}

// Default configuration
export const defaultConfig: CMSConfig = {
  theme: {
    siteName: 'Admin CMS',
    accentColor: 'hsl(var(--primary))',
  },
  features: {
    blog: true,
    pages: true,
    media: true,
    users: true,
    settings: true,
  },
  api: {
    baseUrl: '/api',
    endpoints: {
      pages: '/pages',
      posts: '/posts',
      media: '/media',
      users: '/users',
      settings: '/settings',
    },
  },
};

// Function to merge custom configuration with defaults
export const createCmsConfig = (customConfig: Partial<CMSConfig> = {}): CMSConfig => {
  return {
    theme: {
      ...defaultConfig.theme,
      ...(customConfig.theme || {}),
    },
    features: {
      ...defaultConfig.features,
      ...(customConfig.features || {}),
    },
    api: {
      ...defaultConfig.api,
      ...(customConfig.api || {}),
      endpoints: {
        ...defaultConfig.api.endpoints,
        ...(customConfig.api?.endpoints || {}),
      },
    },
  };
};

// Create a singleton instance of the configuration
const cmsConfig = createCmsConfig();

export default cmsConfig;
