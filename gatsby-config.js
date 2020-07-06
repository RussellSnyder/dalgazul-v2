const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require('dotenv').config({
  path: `.env`,
});

module.exports = {
  siteMetadata: {
    title: `Dalgazul`,
    author: 'Dalgazul',
    description: 'Dalgazul ist ein Musik Gruppe',
    url: activeEnv === "development" ? 'http://localhost:8000' : 'netlify.dalgazul.app',
    social: {
      facebook: 'https://www.facebook.com/dalgazul',
      youtube: 'https://www.youtube.com/channel/UCL8aoiuRkkaO2Bsym4yyQaQ/featured',
      bandcamp: 'https://dalgazul.bandcamp.com/releases',
    },
    headerLogo: `src/images/logo_header.png`
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dalgazul Website`,
        short_name: `Dalgazul`,
        start_url: `/`,
        background_color: `#87ceeb`,
        theme_color: `#87ceeb`,
        display: `minimal-ui`,
        icon: `src/images/logo_square.jpg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `1euf1okdpw6l`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
