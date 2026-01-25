import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';

const SEO = ({ title, description, pathname, image, article }) => {
  const { site } = useStaticQuery(query);
  const { defaultTitle, defaultDescription, siteUrl, twitterUsername } =
    site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || '/img/icon.png'}`, // Ensure you have a default image or handle it
    url: `${siteUrl}${pathname || ''}`,
  };

  return (
    <Helmet title={title} titleTemplate={`%s | ${defaultTitle}`}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}
      {(article ? true : null) && <meta property="og:type" content="article" />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />
      {twitterUsername && (
        <meta name="twitter:creator" content={twitterUsername} />
      )}
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  );
};

export default SEO;

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: companyurl
      }
    }
  }
`;
// Note: siteMetadata in gatsby-config might not have 'siteUrl' explicitly named 'siteUrl'.
// In the current config it has 'companyurl'. I should check if I should add siteUrl to config.
// The user has 'companyurl' pointing to iFood.
// I should probably add 'siteUrl' to gatsby-config.js for the blog's own URL if it exists,
// or just use a placeholder for now.
