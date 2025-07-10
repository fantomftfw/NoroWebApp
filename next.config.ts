/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const clerkDomains = [
      'beloved-stork-92.accounts.dev',
      'beloved-stork-92.clerk.accounts.dev',
      'cdn.jsdelivr.net',
      'js.sentry-cdn.com',
      'browser.sentry-cdn.com',
      '*.sentry.io',
      'challenges.cloudflare.com',
      'scdn.clerk.com',
      'segapi.clerk.com',
      'clerk-telemetry.com',
    ].map(host => `https://${host}`);

    const stripeDomains = [
      'https://api.stripe.com',
      'https://maps.googleapis.com',
      'https://*.js.stripe.com',
      'https://js.stripe.com',
    ];

    const connectSrc = ["'self'", ...clerkDomains, ...stripeDomains].join(' ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Note: The nonce is handled by Next.js automatically
            value: `default-src 'self' ${clerkDomains.join(' ')}; connect-src ${connectSrc};`,
          },
        ],
      },
    ]
  },
};

export default nextConfig;
