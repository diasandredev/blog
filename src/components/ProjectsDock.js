import React, { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DockWrapper = styled.div`
  width: 100%;
  background: var(--color-bg-secondary);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-md);
  box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
`;

const SectionTitle = styled.h3`
  font-family: var(--font-mono);
  font-size: 0.75rem;
  margin-bottom: var(--spacing-md);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '//';
    color: var(--color-accent);
    opacity: 0.6;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: var(--spacing-md);
  overflow: hidden;
  max-height: ${(props) => (props.$expanded ? '1000px' : '130px')};
  transition: max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  padding: 12px 4px 4px 4px; /* Added top padding to prevent hover cut-off */
  margin-top: -8px; /* Negative margin to counteract the padding for visual balance if needed, or just let it breathe */
`;

const ProjectItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: var(--color-text-primary);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    color: var(--color-accent);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background-color: ${(props) => props.bg || '#1a1a1a'};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);

  ${ProjectItem}:hover & {
    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${ProjectItem}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectTitle = styled.span`
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: var(--color-text-secondary);
  transition: color 0.2s;

  ${ProjectItem}:hover & {
    color: var(--color-text-primary);
  }
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

const TooltipBox = styled.div`
  position: absolute;
  top: ${(props) => props.y}px;
  left: ${(props) => props.x}px;
  transform: translate(12px, -50%);
  background-color: var(--color-bg-primary);
  backdrop-filter: blur(8px);
  color: var(--color-text-primary);
  padding: 8px 12px;
  border-radius: 4px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid var(--color-border);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent var(--color-border) transparent transparent;
  }
`;

const ProjectsDock = () => {
  const [expanded, setExpanded] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
  });
  const dockRef = React.useRef(null);

  // Dynamically load projects from src/projects
  // Using require.context to avoid needing restart/graphql schema updates
  let projects = [];
  try {
    const projectContext = require.context(
      '../projects',
      true,
      /config\.json$/,
    );
    const logoContext = require.context('../projects', true, /logo\.png$/);

    projects = projectContext.keys().map((key) => {
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
        logo: logoSrc,
      };
    });
  } catch (err) {
    console.warn('Could not load projects:', err);
  }

  const handleMouseEnter = (e, text) => {
    if (!text) return;
    const iconRect = e.currentTarget.getBoundingClientRect();
    const dockRect = dockRef.current.getBoundingClientRect();

    setTooltip({
      visible: true,
      x: iconRect.right - dockRect.left,
      y: iconRect.top - dockRect.top + iconRect.height / 2,
      text: text,
    });
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  if (projects.length === 0) return null;

  return (
    <DockWrapper ref={dockRef} style={{ position: 'relative' }}>
      <SectionTitle>some projects</SectionTitle>
      <ProjectsGrid $expanded={expanded}>
        {projects.map((p, i) => (
          <ProjectItem
            key={i}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper
              bg={p.backgroundColor}
              onMouseEnter={(e) => handleMouseEnter(e, p.description)}
              onMouseLeave={handleMouseLeave}
            >
              {p.logo ? (
                <IconImage src={p.logo} alt={p.title} />
              ) : (
                <span
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#ccc',
                  }}
                >
                  {p.title.charAt(0).toUpperCase()}
                </span>
              )}
            </IconWrapper>
            <ProjectTitle>{p.title}</ProjectTitle>
          </ProjectItem>
        ))}
      </ProjectsGrid>

      {tooltip.visible && (
        <TooltipBox x={tooltip.x} y={tooltip.y} visible={tooltip.visible}>
          {tooltip.text}
        </TooltipBox>
      )}

      {projects.length > 5 && (
        <ToggleButton
          onClick={() => setExpanded(!expanded)}
          aria-label="Show more projects"
        >
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </ToggleButton>
      )}
    </DockWrapper>
  );
};

export default ProjectsDock;
