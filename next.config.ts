/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    if (!process.env.NEXT_PUBLIC_CLERK_DOMAIN) {
      throw new Error('Missing NEXT_PUBLIC_CLERK_DOMAIN environment variable');
    }
    
    const clerkHost = process.env.NEXT_PUBLIC_CLERK_DOMAIN;

    const domains = [
      clerkHost,
      'img.clerk.com',
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

    const scriptSrcDomains = [...domains];
    if (process.env.NODE_ENV === 'development') {
      scriptSrcDomains.push("'unsafe-eval'");
    }

    const connectSrcDomains = [...domains];
    if (process.env.NODE_ENV === 'development') {
      connectSrcDomains.push('http://localhost:3001');
    }

    const scriptSrc = ["'self'", "'unsafe-inline'", ...scriptSrcDomains].join(' ');
    const connectSrc = ["'self'", ...connectSrcDomains].join(' ');
    const imgSrc = ["'self'", "data:", ...domains].join(' ');
    const styleSrc = ["'self'", "'unsafe-inline'"].join(' ');
    const workerSrc = ["'self'", "blob:"].join(' ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src ${scriptSrc}; connect-src ${connectSrc}; img-src ${imgSrc}; style-src ${styleSrc}; worker-src ${workerSrc}; font-src 'self';`,
          },
        ],
      },
    ]
  },
};

export default nextConfig;
