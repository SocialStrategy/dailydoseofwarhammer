export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Daily Dose of Warhammer",
    "description": "Your daily source for Warhammer 40,000 content, news, community submissions, painting tutorials, and creator spotlights.",
    "url": "https://dailydoseofwarhammer.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://dailydoseofwarhammer.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Daily Dose of Warhammer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dailydoseofwarhammer.com/images/ddow logo.jpg"
      }
    },
    "sameAs": [
      "https://www.instagram.com/dailydoseofwarhammer/",
      "https://www.youtube.com/@yourdailydoseofwarhammer",
      "https://discord.com/invite/RP95BNkRH6"
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function ArticleStructuredData({ 
  title, 
  description, 
  author, 
  date, 
  image, 
  url 
}: {
  title: string
  description: string
  author: string
  date: string
  image: string
  url: string
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Daily Dose of Warhammer",
      "logo": {
        "@type": "ImageObject",
        "url": "https://dailydoseofwarhammer.com/images/ddow logo.jpg"
      }
    },
    "datePublished": date,
    "dateModified": date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Daily Dose of Warhammer",
    "description": "Your daily source for Warhammer 40,000 content, news, community submissions, painting tutorials, and creator spotlights.",
    "url": "https://dailydoseofwarhammer.com",
    "logo": "https://dailydoseofwarhammer.com/images/ddow logo.jpg",
    "sameAs": [
      "https://www.instagram.com/dailydoseofwarhammer/",
      "https://www.youtube.com/@yourdailydoseofwarhammer",
      "https://discord.com/invite/RP95BNkRH6"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
