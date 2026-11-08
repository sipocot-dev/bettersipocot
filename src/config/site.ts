// Central site configuration.
// Values come from VITE_* environment variables when set, and fall back to
// the Sipocot defaults so the site still renders correctly when the
// variables are missing (for example on a fresh Vercel deployment).
const env = import.meta.env;

const name = env.VITE_GOVERNMENT_NAME || 'Sipocot';
const province = env.VITE_PROVINCE || 'Camarines Sur';
const url = (env.VITE_WEBSITE_URL || 'https://bettersipocot.org').replace(
  /\/$/,
  ''
);

export const siteConfig = {
  name,
  type: env.VITE_GOVERNMENT_TYPE || 'Municipality',
  region: env.VITE_REGION || 'Region V',
  province,
  location: `${name}, ${province}`,
  brand: `Better ${name}.org`,
  url,
  // Approximate centre of the municipality (poblacion), used for weather and map
  coordinates: { lat: 13.7667, lng: 122.9833 },
  email: env.VITE_CONTACT_EMAIL || 'info@bettersipocot.org',
  phone: env.VITE_CONTACT_PHONE || '+639491216781',
  description:
    env.VITE_SITE_DESCRIPTION ||
    `A community-run portal for the Municipality of ${name}, ${province}. Find government services, officials, emergency hotlines and local information.`,
  keywords:
    env.VITE_SITE_KEYWORDS ||
    `${name}, ${province}, Bicol, Philippines, municipality, local government, LGU, government services, emergency hotlines, mayor, Sangguniang Bayan`,
  ogImage: env.VITE_OG_IMAGE_URL || `${url}/og-image.png`,
  twitterHandle: env.VITE_TWITTER_HANDLE || '',
  githubUrl: 'https://github.com/sipocot-dev/bettersipocot',
};
