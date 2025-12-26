module.exports = {
  siteMetadata: {
    title: 'andré dias da silva',
    description: `I’m a Senior Software Engineer based in Florianópolis, Brazil, currently architecting high-performance systems at iFood.

As part of the Payout team, I specialize in building resilient, scalable infrastructures that handle billions of BRL in monthly transactions.

My work focuses on solving the complex distributed systems challenges that come with ensuring thousands of partners are paid accurately and at scale.`,
    company: 'iFood',
    companyurl: 'https://institucional.ifood.com.br/',
  },
  plugins: [
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-plugin-decap-cms`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet-async`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
  ],
};
