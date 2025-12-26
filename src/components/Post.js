import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const PostCard = styled.div`
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: 1.2rem;
  margin-bottom: var(--spacing-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-border);
  }
`;



const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
`;

const DateText = styled.span`
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const Tag = styled.span`
  background-color: ${props => props.color || 'var(--color-bg-primary)'};
  color: #1a1a1a;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
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
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
  display: block;
`;

const PostTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
  
  a {
    color: var(--color-text-primary);
    
    &:hover {
      color: var(--color-accent);
    }
  }
`;

const Post = ({ post }) => {
  const hasTags = post.tags != null && post.tags.length > 0;
  const tags = hasTags ? buildTagsColors(post.tags) : [];

  return (
    <PostCard>
      {post.topic && <Topic>{post.topic}</Topic>}

      <PostTitle>
        <Link to={post.path}>{post.title}</Link>
      </PostTitle>

      {tags.length > 0 && (
        <TagsWrapper style={{ marginBottom: '0.5rem' }}>
          {tags.map((tag, index) => (
            <Tag key={index} color={tag.color}>{tag.text}</Tag>
          ))}
        </TagsWrapper>
      )}

      <MetaRow>
        <DateText>{post.dateFormatted}</DateText>
      </MetaRow>
    </PostCard>
  );
};

export default Post;
