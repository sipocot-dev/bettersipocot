import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/site';
import { emergencyHotlines } from '../data/hotlines';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  siteName?: string;
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = siteConfig.brand,
  noIndex = false,
}: SEOProps) {
  const defaultTitle = `${siteName} | Community Portal of ${siteConfig.location}`;
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || siteConfig.description;
  const fullKeywords = keywords || siteConfig.keywords;

  // Canonical URL always points at the primary domain, with the current path
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const canonicalUrl = url || `${siteConfig.url}${path === '/' ? '' : path}`;
  const fullImage = image || siteConfig.ogImage;
  const imageAlt = `${siteConfig.brand} - ${siteConfig.location}`;
  const twitterHandle = siteConfig.twitterHandle;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.brand,
        description: siteConfig.description,
        inLanguage: 'en-PH',
      },
      {
        '@type': 'GovernmentOrganization',
        '@id': `${siteConfig.url}/#organization`,
        name: `Municipality of ${siteConfig.name}`,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          '@type': 'PostalAddress',
          addressLocality: siteConfig.name,
          addressRegion: siteConfig.province,
          addressCountry: 'PH',
        },
        contactPoint: emergencyHotlines.map(hotline => ({
          '@type': 'ContactPoint',
          contactType: `Emergency hotline - ${hotline.label}`,
          telephone: `+${hotline.tel.replace(/^\+/, '')}`,
          areaServed: 'PH',
          availableLanguage: ['English', 'Filipino'],
        })),
      },
    ],
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={siteConfig.brand} />
      <meta
        name="robots"
        content={
          noIndex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1'
        }
      />
      <meta name="googlebot" content={noIndex ? 'noindex' : 'index, follow'} />
      <meta name="bingbot" content={noIndex ? 'noindex' : 'index, follow'} />
      <meta name="geo.region" content="PH-CAS" />
      <meta name="geo.placename" content={siteConfig.location} />
      <meta name="theme-color" content="#003d8d" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_PH" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}

      {/* Favicons and app icons (Google, Edge, Safari, Android) */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="manifest" href="/site.webmanifest" />

      {/* Structured data for Google and Bing */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
