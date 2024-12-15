export const siteConfig = {
  baseUrl: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' 
    ? 'https://base32.tech' 
    : 'http://localhost:3000',
  name: 'BASE32',
  description: 'Empowering businesses with cutting-edge technology solutions.',
  links: {
    twitter: '#',
    github: '#',
    linkedin: '#'
  }
};
