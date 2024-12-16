import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Romain BOBOE & BASE32 | AI Development and Consulting',
  description: 'Meet Romain BOBOE, founder of BASE32, leading AI software development and tech consulting in Montreal. Learn about our mission, approach, and innovative solutions.',
  openGraph: {
    title: 'About Romain BOBOE & BASE32 | AI Development and Consulting',
    description: 'Meet Romain BOBOE, founder of BASE32, leading AI software development and tech consulting in Montreal. Learn about our mission, approach, and innovative solutions.',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BASE32 - AI Development and Consulting',
      }
    ],
  },
  twitter: {
    title: 'About Romain BOBOE & BASE32',
    description: 'Meet Romain BOBOE, founder of BASE32, leading innovative AI solutions and tech consulting in Montreal.',
    card: 'summary_large_image',
  },
}
