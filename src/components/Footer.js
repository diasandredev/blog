import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: var(--spacing-lg) 0;
  border-top: 1px solid var(--color-border);
  margin-top: auto;
  text-align: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
`;

const Footer = () => {
    return (
        <FooterContainer>
            © {new Date().getFullYear()} André Dias. All rights reserved.
        </FooterContainer>
    );
};

export default Footer;
