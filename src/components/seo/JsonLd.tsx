import React from "react";
import { SITE_CONFIG, SITE_URL } from "@/lib/seo";
import { PROJECTS_DATA } from "@/data/portfolioData";

export function JsonLd() {
  const personId = `${SITE_URL}/#person`;
  const websiteId = `${SITE_URL}/#website`;
  const profilePageId = `${SITE_URL}/#profilepage`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Primary Entity: Person (Javohir Sadullayev)
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_CONFIG.name,
        givenName: SITE_CONFIG.shortName,
        familyName: SITE_CONFIG.lastName,
        additionalName: "Javohirbek",
        alternateName: SITE_CONFIG.alternateNames,
        jobTitle: "Software Engineer & .NET Backend Developer",
        description: SITE_CONFIG.description,
        url: SITE_URL,
        image: `${SITE_URL}/avatar.jpg`,
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        nationality: {
          "@type": "Country",
          name: "Uzbekistan",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_CONFIG.location.city,
          addressCountry: SITE_CONFIG.location.countryCode,
        },
        alumniOf: {
          "@type": "EducationalOrganization",
          name: SITE_CONFIG.education.university,
          url: "https://pdp.uz",
        },
        sameAs: [
          SITE_CONFIG.social.github,
          SITE_CONFIG.social.linkedin,
          SITE_CONFIG.social.telegram,
          SITE_URL,
        ],
        knowsAbout: [
          ".NET",
          ".NET 8",
          "C#",
          "ASP.NET Core",
          "PostgreSQL",
          "Redis",
          "SignalR",
          "Distributed Systems",
          "Clean Architecture",
          "CQRS & MediatR",
          "Docker",
          "Azure Cognitive Services",
          "High-Concurrency Backends",
          "Speech Assessment AI",
          "RESTful API Design",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "HackerRank Software Engineer",
            credentialCategory: "Professional Certificate",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "HackerRank REST API (Intermediate)",
            credentialCategory: "Professional Certificate",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Foundational C#",
            credentialCategory: "Professional Certificate",
          },
        ],
      },

      // 2. WebSite Schema
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: "Javohir Sadullayev · Software Engineer",
        alternateName: ["javohir.engineer", "Sadullayev Javohir Portfolio", "Javohir Sadullayev"],
        description: SITE_CONFIG.description,
        publisher: {
          "@id": personId,
        },
        inLanguage: ["en-US", "uz-UZ", "ru-RU"],
      },

      // 3. ProfilePage Schema
      {
        "@type": "ProfilePage",
        "@id": profilePageId,
        url: SITE_URL,
        name: "Javohir Sadullayev · Official Profile",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": personId,
        },
      },

      // 4. ItemList of Selected Engineering Work
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/#projects`,
        name: "Projects by Javohir Sadullayev",
        description: "Production-grade software systems and AI products engineered by Javohir Sadullayev",
        itemListElement: PROJECTS_DATA.map((p, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          item: {
            "@type": "SoftwareApplication",
            name: p.title,
            description: p.description,
            applicationCategory: p.category,
            operatingSystem: "Web, Cloud",
            author: {
              "@id": personId,
            },
            url: `${SITE_URL}/projects/${p.slug}`,
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
