import React from 'react';
import { graphql } from 'gatsby';
import moment from 'moment';
import styled from 'styled-components';
import Layout from '../components/Layout';

const BlogContentWrapper = styled.div`
  margin-top: var(--spacing-lg);
  width: 100%;
  
  p {
    text-align: justify;
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
  }
  
  img {
    width: 100%;
    margin: var(--spacing-md) 0;
    border-radius: var(--radius-md);
  }
  
  blockquote {
    border-left: 4px solid var(--color-accent);
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    margin: var(--spacing-md) 0;
    border-radius: 0 var(--radius-md) var(--radius-md) 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }
  
  h2, h3, h4 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }
  
  a {
    color: var(--color-accent);
    text-decoration: underline;
  }
  
  ul, ol {
    margin-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
  }
  
  li {
    margin-bottom: var(--spacing-sm);
  }
  
  /* Inline code */
  :not(pre) > code[class*="language-"], 
  code {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
  }
  
  /* Code blocks */
  pre[class*="language-"] {
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin-bottom: var(--spacing-md);
  }
  
  /* Remove default prism shadows/radius if any */
  pre[class*="language-"], 
  code[class*="language-"] {
    text-shadow: none !important;
    box-shadow: none !important;
  }
`;

const PostHeaderWrapper = styled.div`
  margin-bottom: var(--spacing-lg);
`;



const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

const DateText = styled.span`
  color: var(--color-text-secondary);
  font-size: 1rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Tag = styled.span`
  background-color: ${props => props.color || 'var(--color-bg-primary)'};
  color: #1a1a1a;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const buildTagsColors = (tags) =>
  tags.split(',').map((tag) => {
    let color = '#e2e8f0'; // Default light gray

    const t = tag.trim();
    switch (t) {
      case 'Kotlin':
        color = '#53dd6c';
        break;
      case 'Test':
        color = '#F5B700';
        break;
      case 'GitHub':
        color = '#B497D6';
        break;
      case 'React':
      case 'Gatsby':
        color = '#61dafb';
        break;
      default:
        color = '#94a3b8';
    }

    return {
      text: t,
      color,
    };
  });

const Topic = styled.span`
  color: var(--color-accent);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 1rem;
  display: block;
`;

const PostTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  margin-bottom: 0.5rem;
  color: var(--color-text-primary);
  line-height: 1.1;
`;

// ... (MetaRow, DateText, TagsWrapper, Tag, Topic components remain unchanged)

const Template = ({
  data: {
    markdownRemark: {
      html,
      frontmatter: { title, date, tags, topic },
    },
  },
}) => {
  const dateFormatted = moment(date).format('DD/MM/YYYY');
  const hasTags = tags != null && tags.length > 0;
  const tagList = hasTags ? buildTagsColors(tags) : [];

  return (
    <Layout>
      <PostHeaderWrapper>
        {topic && <Topic>{topic}</Topic>}

        <PostTitle>{title}</PostTitle>

        {tagList.length > 0 && (
          <TagsWrapper style={{ marginBottom: '1rem' }}>
            {tagList.map((tag, index) => (
              <Tag key={index} color={tag.color}>{tag.text}</Tag>
            ))}
          </TagsWrapper>
        )}

        <MetaRow>
          <DateText>{dateFormatted}</DateText>
        </MetaRow>
      </PostHeaderWrapper>
      <BlogContentWrapper
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  );
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      frontmatter {
        title
        date
        tags
        topic
      }
    }
  }
`;

export default Template;
