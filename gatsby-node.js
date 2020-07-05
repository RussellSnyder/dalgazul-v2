const path = require('path');
const kebabCase = require('lodash/kebabCase');
const locales = require('./src/constants/locales')

const defaultLanguage = Object.entries(locales).find(([, value]) => value.default)[1];

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const HomePage = path.resolve('./src/templates/home-page.js');
    const ContactPage = path.resolve('./src/templates/contact-page.js');
    const VideoPage = path.resolve('./src/templates/video-page.js');
    const BioPage = path.resolve('./src/templates/bio-page.js');
    const MusicPage = path.resolve('./src/templates/music-page.js');
    const LivePage = path.resolve('./src/templates/live-page.js');

    resolve(
      graphql(`
      query {
        homePages: allContentfulHomePage {
          nodes {
            label
            id
            language
          }
        }
      }
    `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const fallbackHomepageId = result.data.homePages.nodes.find(homePage => {
          return homePage.language === defaultLanguage.locale;
        }).id

        Object.entries(locales).forEach(([,locale]) => {
          const page = result.data.homePages.nodes.find(page => page.language === locale.locale)
          const path = locale.path;
          const id = page ? page.id : fallbackHomepageId

          console.log(`creating HomePage at ${path}`)
          createPage({
            component: HomePage,
            path,
            context: {
              id
            },
          });  

          console.log(`creating VideoPage at ${path}videos`)
          createPage({
            component: VideoPage,
            path: `${path}videos`,
            context: {
              id
            },
          });  

          console.log(`creating BioPage at ${path}bio`)
          createPage({
            component: BioPage,
            path: `${path}bio`,
            context: {
              id
            },
          });  

          console.log(`creating MusicPage at ${path}music`)
          createPage({
            component: MusicPage,
            path: `${path}music`,
            context: {
              id
            },
          });  

          console.log(`creating LivePage at ${path}live`)
          createPage({
            component: LivePage,
            path: `${path}live`,
            context: {
              id
            },
          });  

          console.log(`creating ${locale.locale} ContactPage at ${path}contact`)
          createPage({
            component: ContactPage,
            path: `${path}contact`,
            context: {
              id
            },
          });  
        })
      })
    )
  })
}