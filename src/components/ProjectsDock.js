import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DockWrapper = styled.div`
  margin-top: var(--spacing-lg);
  width: 100%;
  background-color: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  /* border-top: 1px solid var(--color-border, #eee); - Removed per card style */
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-md);
  overflow: hidden;
  max-height: ${props => props.expanded ? '1000px' : '110px'};
  transition: max-height 0.5s ease-in-out;
  padding: 4px; /* Space for shadows */
`;

const ProjectItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--color-text-primary);
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    color: var(--color-accent);
    text-decoration: none;
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 14px;
  background-color: ${props => props.bg || '#f0f0f0'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  margin-bottom: 8px;
  overflow: hidden;
  transition: box-shadow 0.2s;
  border: 1px solid rgba(0,0,0,0.05);

  ${ProjectItem}:hover & {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Configured to cover as per "white background icon" usually means the image is the icon */
`;

const ProjectTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: var(--color-text-primary);
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-secondary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 0 0 0;
  font-size: 1.2rem;
  opacity: 0.6;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
    color: var(--color-accent);
  }
`;

const ProjectsDock = () => {
    const [expanded, setExpanded] = useState(false);

    // Dynamically load projects from src/projects
    // Using require.context to avoid needing restart/graphql schema updates
    let projects = [];
    try {
        const projectContext = require.context('../projects', true, /config\.json$/);
        const logoContext = require.context('../projects', true, /logo\.png$/);

        projects = projectContext.keys().map(key => {
            const config = projectContext(key);
            const dir = key.split('/')[1]; // ./dir/config.json
            const logoKey = `./${dir}/logo.png`;

            let logoSrc = null;
            try {
                // require.context keys for logos might just contain the logo if it exists
                if (logoContext.keys().includes(logoKey)) {
                    logoSrc = logoContext(logoKey);
                    // Depending on webpack setup, this might return a module with default or string
                    if (logoSrc && logoSrc.default) logoSrc = logoSrc.default;
                }
            } catch (e) {
                console.warn('Logo not found for', dir);
            }

            return {
                ...config,
                logo: logoSrc
            };
        });
    } catch (err) {
        console.warn("Could not load projects:", err);
    }

    if (projects.length === 0) return null;

    return (
        <DockWrapper>
            <ProjectsGrid expanded={expanded}>
                {projects.map((p, i) => (
                    <ProjectItem key={i} href={p.url} target="_blank" rel="noopener noreferrer">
                        <IconWrapper bg={p.backgroundColor}>
                            {p.logo ? (
                                <IconImage src={p.logo} alt={p.title} />
                            ) : (
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ccc' }}>
                                    {p.title.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </IconWrapper>
                        <ProjectTitle>{p.title}</ProjectTitle>
                    </ProjectItem>
                ))}
            </ProjectsGrid>

            {projects.length > 5 && (
                <ToggleButton onClick={() => setExpanded(!expanded)} aria-label="Show more projects">
                    {expanded ? <FaChevronUp /> : <FaChevronDown />}
                </ToggleButton>
            )}
        </DockWrapper>
    );
};

export default ProjectsDock;
