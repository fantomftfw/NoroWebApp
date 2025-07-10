/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      throw new Error('Missing Clerk Publishable Key');
    }
    
    const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.split('_').pop();
    if (!clerkFrontendApi) {
      throw new Error('Invalid Clerk Publishable Key');
    }
    
    const clerkHost = new URL(clerkFrontendApi).host;

    const domains = [
      clerkHost,
      'cdn.jsdelivr.net',
      'js.sentry-cdn.com',
      'browser.sentry-cdn.com',
      '*.sentry.io',
      'challenges.cloudflare.com',
      'scdn.clerk.com',
      'segapi.clerk.com',
      'clerk-telemetry.com',
      'api.stripe.com',
      'maps.googleapis.com',
      '*.js.stripe.com',
      'js.stripe.com',
    ].map(host => (host.startsWith('*') ? `*${host}` : `https://${host}`));

    const scriptSrc = ["'self'", "'unsafe-inline'", ...domains].join(' ');
    const connectSrc = ["'self'", ...domains].join(' ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self' ${domains.join(' ')}; script-src ${scriptSrc}; connect-src ${connectSrc};`,
          },
        ],
      },
    ]
  },
};

export default nextConfig;
