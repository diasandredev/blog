import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import HeaderSocial from './HeaderSocial';
import ProjectsDock from './ProjectsDock';
import ThemeToggle from './ThemeToggle';

const HeaderWrapper = styled.header`
  padding: var(--spacing-lg) 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
`;

const TitleLink = styled(Link)`
  font-family: var(--font-logo);
  font-size: 3.5rem;
  font-weight: 400;
  color: var(--color-text-primary) !important;
  letter-spacing: -1px;
  text-decoration: none;

  &:hover {
    color: var(--color-text-primary) !important;
    text-decoration: none;
  }
`;

const IntroContainer = styled.div`
  margin-top: var(--spacing-md);
  color: var(--color-text-primary);
  line-height: 1.6;
  max-width: 100%;
`;

const LeadParagraph = styled.p`
  font-family: var(--font-primary);
  font-size: 1.5rem;
  font-weight: 300;
  color: var(--color-text-primary);
  margin-bottom: var(--spacing-lg);
  letter-spacing: -0.02em;

  strong {
    font-weight: 600;
    color: var(--color-text-primary);
  }
`;

const SubParagraph = styled.p`
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.7;
`;

const CompanyLink = styled.span`
  color: var(--color-accent);
  cursor: pointer;
  font-weight: 500;
  position: relative;
  display: inline-block;
  transition: all 0.2s ease;

  &:hover {
    text-shadow: 0 0 8px var(--color-accent);
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    left: 0;
    background-color: var(--color-accent);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

const Header = ({
  data: {
    site: { siteMetadata },
  },
}) => {
  const { title, description, company, companyurl } = siteMetadata;
  const goToCompanyUrl = () => window.open(companyurl, '_blank');

  // Split description: First paragraph is lead, others are sub details
  const paragraphs = description.split('\n\n');
  const leadText = paragraphs[0];
  const detailTexts = paragraphs.slice(1);

  const renderTextWithCompany = (text) => {
    return text.split(company).map((segment, sIndex, array) => (
      <React.Fragment key={sIndex}>
        {segment}
        {sIndex < array.length - 1 && (
          <CompanyLink onClick={goToCompanyUrl}>{company}</CompanyLink>
        )}
      </React.Fragment>
    ));
  };

  return (
    <HeaderWrapper>
      <TitleRow>
        <TitleLink to="/">{title}</TitleLink>
        <Actions>
          <ThemeToggle />
          <HeaderSocial />
        </Actions>
      </TitleRow>

      <IntroContainer>
        <LeadParagraph>{renderTextWithCompany(leadText)}</LeadParagraph>

        {detailTexts.map((text, i) => (
          <SubParagraph key={i}>
            {/* Add a subtle terminal-like arrow for detail paragraphs */}
            <span style={{ color: 'var(--color-accent)', marginRight: '8px' }}>
              &gt;
            </span>
            {renderTextWithCompany(text)}
          </SubParagraph>
        ))}
      </IntroContainer>

      <ProjectsDock />
    </HeaderWrapper>
  );
};

const HeaderQuery = () => {
  return (
    <StaticQuery
      query={graphql`
        query {
          site {
            siteMetadata {
              title
              description
              company
              companyurl
            }
          }
        }
      `}
      render={(data) => <Header data={data} />}
    />
  );
};

export default HeaderQuery;
