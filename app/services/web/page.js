import WebServicesClient from './WebServicesClient';

export const metadata = {
  title: 'Web Development Services | Bloop Global',
  description: 'We build websites that work. From simple landing pages to complex web applications, we create digital experiences that convert visitors into customers.',
  keywords: ['web development', 'website design', 'custom websites', 'e-commerce', 'web applications', 'frontend development'],
  openGraph: {
    title: 'Web Development Services | Bloop Global',
    description: 'We build websites that work. Digital experiences that convert visitors into customers.',
    type: 'website',
  },
};

export default function WebServicesPage() {
  return <WebServicesClient />;
}
