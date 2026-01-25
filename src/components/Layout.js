import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet-async';
import GlobalStyles from '../styles/GlobalStyles';
import Header from './Header';
import Footer from './Footer';

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
`;

const ContentWrapper = styled.main`
  flex: 1;
  padding-top: ${(props) => props.paddingTop || 'var(--spacing-lg)'};
  padding-bottom: var(--spacing-lg);
  width: 100%;
`;

const Layout = ({ children, paddingTop }) => {
  return (
    <>
      <GlobalStyles />
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <title>diasandre blog</title>
      </Helmet>

      <MainWrapper>
        <Header />
        <ContentWrapper paddingTop={paddingTop}>{children}</ContentWrapper>
        <Footer />
      </MainWrapper>
    </>
  );
};

export default Layout;
