import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Content from '../components/Content';
import Seo from '../components/SEO';
import { mapData } from '../helpers/postsHelper';

import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
`;

const SectionTitle = styled.h2`
  font-family: var(--font-mono);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  margin: 0;

  &::before {
    content: '> ';
    color: var(--color-accent);
  }
`;

const FilterBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  border: 1px dashed var(--color-accent);
  border-radius: 4px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-10px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const FilterLabel = styled.span`
  color: var(--color-text-secondary);
`;

const FilterValue = styled.span`
  font-weight: 600;
  color: var(--color-accent);
  text-transform: uppercase;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-border);
    color: var(--color-text-primary);
  }
`;

const IndexPage = ({ data }) => {
  const allContent = mapData(data);
  const [filter, setFilter] = useState(null);

  const handleFilter = (type, value) => {
    setFilter({ type, value });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilter = () => {
    setFilter(null);
  };

  const filteredContent = filter
    ? allContent.filter((post) => {
        if (filter.type === 'topic') return post.topic === filter.value;
        if (filter.type === 'tag') {
          return (
            post.tags &&
            post.tags
              .split(',')
              .map((t) => t.trim())
              .includes(filter.value)
          );
        }
        return true;
      })
    : allContent;

  return (
    <Layout paddingTop="0">
      <Seo title="Home" />
      <HeaderContainer>
        <SectionTitle>Posts</SectionTitle>
        {filter && (
          <FilterBadge>
            <FilterLabel>Filtering by {filter.type}:</FilterLabel>
            <FilterValue>{filter.value}</FilterValue>
            <ClearButton onClick={clearFilter} title="Clear filter">
              ×
            </ClearButton>
          </FilterBadge>
        )}
      </HeaderContainer>
      <Content content={filteredContent} onFilter={handleFilter} />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { frontmatter: { hidden: { ne: true } } }
    ) {
      edges {
        node {
          frontmatter {
            title
            path
            externalurl
            date
            tags
            topic
          }
        }
      }
    }
  }
`;
