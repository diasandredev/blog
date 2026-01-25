import React from 'react';
import { graphql, Link } from 'gatsby';
import moment from 'moment';
import styled from 'styled-components';
import { FiArrowLeft, FiClock } from 'react-icons/fi';
import Layout from '../components/Layout';
import Seo from '../components/SEO';
import ShareButtons from '../components/ShareButtons';

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: var(--spacing-xl);
  transition: color 0.2s;
  text-decoration: none;

  &:hover {
    color: var(--color-accent);
    text-decoration: none;
  }
`;

const BlogContentWrapper = styled.div`
  margin-top: var(--spacing-lg);
  width: 100%;
  max-width: 100%;

  p {
    text-align: left;
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
    color: var(--color-text-primary);
    font-size: 1.05rem;
    font-weight: 300;
  }

  img {
    width: 100%;
    margin: var(--spacing-lg) 0;
    border-radius: 4px;
    border: 1px solid var(--color-border);
  }

  blockquote {
    border-left: 2px solid var(--color-accent);
    background: var(--color-bg-secondary);
    padding: var(--spacing-md);
    margin: var(--spacing-lg) 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  h1,
  h2,
  h3,
  h4 {
    margin-top: var(--spacing-xl);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;

    &:hover {
      color: var(--color-accent-hover);
    }
  }

  ul,
  ol {
    margin-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  li {
    margin-bottom: var(--spacing-sm);
    line-height: 1.6;
  }

  /* Inline code style */
  code {
    font-family: var(--font-mono);
    background: var(--color-bg-secondary);
    color: var(--color-accent);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.85em;
  }
`;

const PostHeaderWrapper = styled.div`
  margin-bottom: var(--spacing-xl);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-lg);
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  margin-top: var(--spacing-md);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
`;

const DateText = styled.span`
  color: var(--color-text-secondary);
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
`;

const Tag = styled.span`
  color: ${(props) => props.color || 'var(--color-text-secondary)'};
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  position: relative;

  &::before {
    content: '#';
    opacity: 0.5;
    margin-right: 1px;
  }

  &:not(:last-child)::after {
    content: ',';
    color: var(--color-text-secondary);
    opacity: 0.5;
    margin-left: 1px;
  }
`;

const buildTagsColors = (tags) =>
  tags.split(',').map((tag) => {
    let color = '#94a3b8'; // Default slate

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
      case 'Javascript':
        color = '#e03838ff';
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
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: var(--spacing-md);
  display: block;

  &::before {
    content: '> ';
    opacity: 0.6;
  }
`;

const PostTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

// ... (MetaRow, DateText, TagsWrapper, Tag, Topic components remain unchanged)

const Template = ({
  data: {
    markdownRemark: {
      html,
      timeToRead,
      frontmatter: { title, date, tags, topic, path },
    },
  },
}) => {
  const dateFormatted = moment(date).format('DD/MM/YYYY');
  const hasTags = tags != null && tags.length > 0;
  const tagList = hasTags ? buildTagsColors(tags) : [];

  return (
    <Layout>
      <Seo
        title={title}
        description={`${
          topic || 'Blog post'
        } by André Dias. ${timeToRead} min read.`}
        article={true}
        pathname={path}
      />

      <BackLink to="/">
        <FiArrowLeft /> Back to Posts
      </BackLink>

      <PostHeaderWrapper>
        {topic && <Topic>{topic}</Topic>}

        <PostTitle>{title}</PostTitle>

        {tagList.length > 0 && (
          <TagsWrapper style={{ marginBottom: '1rem' }}>
            {tagList.map((tag, index) => (
              <Tag key={index} color={tag.color}>
                {tag.text}
              </Tag>
            ))}
          </TagsWrapper>
        )}

        <MetaRow>
          <MetaItem>
            <DateText>{dateFormatted}</DateText>
          </MetaItem>
          <MetaItem>
            <FiClock /> <span>{timeToRead} min read</span>
          </MetaItem>
        </MetaRow>
      </PostHeaderWrapper>

      <BlogContentWrapper dangerouslySetInnerHTML={{ __html: html }} />

      <ShareButtons title={title} url={path} />
    </Layout>
  );
};

export const query = graphql`
  query ($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      timeToRead
      frontmatter {
        title
        date
        tags
        topic
        path
      }
    }
  }
`;

export default Template;
