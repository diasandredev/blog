import React from 'react';
import styled from 'styled-components';
import { AiFillLinkedin } from 'react-icons/ai';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--color-border);
`;

const Label = styled.span`
  color: var(--color-text-secondary);
  font-weight: 500;
  font-size: 0.9rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--spacing-sm);
`;

const ShareButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-bg-secondary);
  color: var(--color-text-primary);
  transition: all 0.2s ease;
  font-size: 1.2rem;
  border: 1px solid var(--color-border);

  &:hover {
    background-color: var(--color-accent);
    color: white;
    border-color: var(--color-accent);
    transform: translateY(-2px);
  }
`;

const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ShareButtons = ({ title, url }) => {
  // Safe check for window availability during build
  const currentUrl = typeof window !== 'undefined' ? window.location.href : url;

  const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(
    title,
  )}&url=${encodeURIComponent(currentUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    currentUrl,
  )}`;

  return (
    <Wrapper>
      <Label>Share this post:</Label>
      <ButtonGroup>
        <ShareButton
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on X"
        >
          <XLogo />
        </ShareButton>
        <ShareButton
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <AiFillLinkedin />
        </ShareButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default ShareButtons;
