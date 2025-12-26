import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content from '../components/Content';
import { mapData } from '../helpers/postsHelper';

const IndexPage = ({ data }) => {
  const content = mapData(data);
  return (
    <Layout>
      <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-lg)', marginTop: '0' }}>Posts</h2>
      <Content content={content} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomepageQuery {
  allMarkdownRemark(
    sort: {frontmatter: {date: DESC}}
    filter: {frontmatter: {hidden: {ne: true}}}
  ) {
    edges {
      node {
        frontmatter {
          title
          path
          externalurl
          date
          tags
        }
      }
    }
  }
}
`;


