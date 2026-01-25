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
  font-weight: 500;
  margin-bottom: var(--spacing-lg);
  transition: color 0.2s;

  &:hover {
    color: var(--color-accent);
    text-decoration: none;
  }
`;

const BlogContentWrapper = styled.div`
  margin-top: var(--spacing-lg);
  width: 100%;

  p {
    text-align: left;
    margin-bottom: var(--spacing-md);
    line-height: 1.8;
    color: var(--color-text-primary);
    font-size: 1.1rem;
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

  h2,
  h3,
  h4 {
    margin-top: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  a {
    color: var(--color-accent);
    text-decoration: underline;
  }

  ul,
  ol {
    margin-left: var(--spacing-lg);
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  li {
    margin-bottom: var(--spacing-sm);
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
  margin-top: var(--spacing-sm);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
`;

const DateText = styled.span`
  color: var(--color-text-secondary);
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Tag = styled.span`
  background-color: ${(props) => props.color || 'var(--color-bg-primary)'};
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
