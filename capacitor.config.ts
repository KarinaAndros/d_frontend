import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'social.app',
  appName: 'social',
  webDir: 'dist',
  plugins: {
    Keyboard:{
      resize: 'none',
      style: 'DARK',
      resizeOnFullScreen: true,
    }
  }
};

export default config;
