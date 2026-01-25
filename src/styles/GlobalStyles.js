import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* CSS Variables */
  :root {
    --color-bg-primary: #0a0a0b;
    --color-bg-secondary: rgba(255, 255, 255, 0.03);
    --color-bg-glass: rgba(10, 10, 11, 0.7);
    --color-text-primary: #ededed;
    --color-text-secondary: #888888;
    --color-accent: #00f0ff;
    --color-accent-hover: #00bcd4;
    --color-border: #27272a;
    
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-logo: 'Bebas Neue', cursive;
    
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 2rem;
    --spacing-xl: 4rem;
    
    --radius-md: 8px;
    --radius-lg: 12px;
    
    /* Tooltip Default (Dark Mode -> Light Tooltip) or Dark Tooltip for Dark Mode? 
       Usually tooltips are inverse or dark. Let's make it inverse for pop.
    */
    --color-tooltip-bg: #f8fafc;
    --color-tooltip-text: #0f172a;
  }

  body.light-mode {
    --color-bg-primary: #ffffff;
    --color-bg-secondary: #f1f5f9;
    --color-text-primary: #0f172a;
    --color-text-secondary: #475569;
    --color-accent: #0284c7;
    --color-accent-hover: #0369a1;
    --color-border: #e2e8f0;
    
    /* Tooltip Light Mode -> Dark Tooltip */
    --color-tooltip-bg: #1e293b;
    --color-tooltip-text: #f8fafc;
  }

  /* PrismJS Theme Variables */
  :root {
    /* Dark Mode - Technical/Cyber Theme */
    --prism-bg: rgba(255, 255, 255, 0.02);
    --prism-text: #e0e0e0;
    --prism-comment: #555555;
    --prism-keyword: #ff0055;
    --prism-boolean: #bd93f9;
    --prism-function: #f5b700;
    --prism-string: #00f0ff;
    --prism-variable: #00f0ff;
    --prism-operator: #ff0055;
    --prism-class: #f5b700;
    --prism-punctuation: #888888;
    --prism-selection: rgba(0, 240, 255, 0.2);
  }

  body.light-mode {
    /* Light Mode - Clean Technical */
    --prism-bg: #f5f5f5;
    --prism-text: #24292e;
    --prism-comment: #6a737d;
    --prism-keyword: #d73a49;
    --prism-boolean: #005cc5;
    --prism-function: #6f42c1;
    --prism-string: #032f62;
    --prism-variable: #e36209;
    --prism-operator: #d73a49;
    --prism-class: #6f42c1;
    --prism-punctuation: #24292e;
    --prism-selection: #b3d4fc;
  }

  /* Reset & Base */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--color-bg-primary);
    color: var(--color-text-primary);
    font-family: var(--font-primary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    line-height: 1.2;
    margin-bottom: var(--spacing-md);
    color: var(--color-text-primary);
  }

  p {
    margin-bottom: var(--spacing-md);
    color: var(--color-text-secondary);
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--color-accent-hover);
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--radius-md);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-bg-primary); 
  }
 
  ::-webkit-scrollbar-thumb {
    background: var(--color-border); 
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-secondary); 
  }

  /* PrismJS Styles */
  code[class*="language-"],
  pre[class*="language-"] {
    color: var(--prism-text);
    background: none;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  /* Code blocks */
  pre[class*="language-"] {
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
    background: var(--prism-bg);
    border-radius: var(--radius-md);
  }

  /* Inline code */
  :not(pre) > code[class*="language-"] {
    padding: .1em;
    border-radius: .3em;
    white-space: normal;
    background: var(--prism-bg);
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: var(--prism-comment);
  }

  .token.punctuation {
    color: var(--prism-punctuation);
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: var(--prism-keyword);
  }

  .token.function-name {
    color: var(--prism-function);
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: var(--prism-function);
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: var(--prism-class);
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: var(--prism-keyword);
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: var(--prism-string);
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: var(--prism-operator);
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }

  .token.inserted {
    color: green;
  }
`;

export default GlobalStyles;
