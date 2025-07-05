'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'github'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}