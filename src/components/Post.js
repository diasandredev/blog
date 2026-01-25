import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostCard = styled.div`
  position: relative;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent; /* Hidden by default or remove completely */
  transition: all 0.3s ease;
`;

const ReadMoreLink = styled(Link)`
  position: absolute;
  right: 0;
  bottom: 2rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
  color: var(--color-accent);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: 600;

  ${PostCard}:hover & {
    opacity: 1;
    transform: translateX(0);
  }

  &:hover {
    text-decoration: underline;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const DateText = styled.span`
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  opacity: 0.8;
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
  cursor: pointer;
  position: relative;

  &::before {
    content: '#';
    opacity: 0.5;
    margin-right: 1px;
  }

  &:hover {
    color: var(--color-accent);
    text-decoration: underline;
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
    // Keep colors if needed, or unify to technical look
    // For this aesthetic, maybe keep color text but remove background
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
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  display: inline-block;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  letter-spacing: -0.02em;

  a {
    color: var(--color-text-primary);
    text-decoration: none;

    &:hover {
      color: var(--color-text-primary);
    }
  }
`;

const Post = ({ post, onFilter }) => {
  const hasTags = post.tags != null && post.tags.length > 0;
  const tags = hasTags ? buildTagsColors(post.tags) : [];

  const handleTopicClick = (e) => {
    if (onFilter && post.topic) {
      e.stopPropagation();
      e.preventDefault();
      onFilter('topic', post.topic);
    }
  };

  const handleTagClick = (e, tag) => {
    if (onFilter) {
      e.stopPropagation();
      e.preventDefault();
      onFilter('tag', tag);
    }
  };

  return (
    <PostCard>
      {post.topic && <Topic onClick={handleTopicClick}>{post.topic}</Topic>}

      <PostTitle>
        <Link to={post.path}>{post.title}</Link>
      </PostTitle>

      {tags.length > 0 && (
        <TagsWrapper style={{ marginBottom: '0.5rem' }}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              color={tag.color}
              onClick={(e) => handleTagClick(e, tag.text)}
            >
              {tag.text}
            </Tag>
          ))}
        </TagsWrapper>
      )}

      <MetaRow>
        <DateText>{post.dateFormatted}</DateText>
      </MetaRow>

      <ReadMoreLink to={post.path}>read {'->'}</ReadMoreLink>
    </PostCard>
  );
};

export default Post;
