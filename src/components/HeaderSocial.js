import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { HiDocument } from "react-icons/hi2";
import styled from 'styled-components';
import { SOCIAL_URL, SOCIAL_TYPES } from '../constants/socialConstants';

const SocialWrapper = styled.div`
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
`;

const SocialIcon = styled.div`
  font-size: 2rem;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--color-accent);
    transform: scale(1.1);
  }
`;

const HeaderSocial = () => {
  const goToUrl = (type) => window.open(SOCIAL_URL[type], '_blank');
  return (
    <SocialWrapper>
      <SocialIcon onClick={() => goToUrl(SOCIAL_TYPES.CURRICULUM)}>
        <HiDocument />
      </SocialIcon>
      <SocialIcon onClick={() => goToUrl(SOCIAL_TYPES.LINKEDIN)}>
        <AiFillLinkedin />
      </SocialIcon>
      <SocialIcon onClick={() => goToUrl(SOCIAL_TYPES.GITHUB)}>
        <AiFillGithub />
      </SocialIcon>
    </SocialWrapper>
  );
};

export default HeaderSocial;
