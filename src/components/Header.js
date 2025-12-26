import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import HeaderSocial from './HeaderSocial';
import ProjectsDock from './ProjectsDock';

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

const Description = styled.div`
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  color: var(--color-text-primary);
  line-height: 1.5;
  border-left: 4px solid var(--color-accent);

  p {
    color: var(--color-text-primary);
  }
`;

const CompanyLink = styled.span`
  color: var(--color-accent);
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Header = ({
  data: {
    site: { siteMetadata },
  },
}) => {
  const { title, description, company, companyurl } = siteMetadata;
  const goToCompanyUrl = () => window.open(companyurl, '_blank');

  // Helper to process description text
  const renderDescription = () => {
    return description.split('\n\n').map((paragraph, pIndex) => (
      <p key={pIndex} style={{ marginBottom: '1rem', margin: 0 }}>
        {paragraph.split(company).map((segment, sIndex, array) => (
          <React.Fragment key={sIndex}>
            {segment}
            {sIndex < array.length - 1 && (
              <CompanyLink onClick={goToCompanyUrl}>
                {company}
              </CompanyLink>
            )}
          </React.Fragment>
        ))}
      </p>
    ));
  };

  return (
    <HeaderWrapper>
      <TitleRow>
        <TitleLink to="/">{title}</TitleLink>
        <HeaderSocial />
      </TitleRow>
      <Description>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {renderDescription()}
        </div>
      </Description>
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
