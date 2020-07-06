const path = require('path');
const kebabCase = require('lodash/kebabCase');
const locales = require('./src/constants/locales');

const defaultLanguage = Object.entries(locales).find(([, value]) => value.default)[1];

const getPageIds = (pages, cb) => {
  const fallbackId = pages.nodes.find(page => {
    return page.language.name === defaultLanguage.locale;
  }).id

  return Object.entries(locales).forEach(([,locale]) => {
    const page = pages.nodes.find(page => page.language.name === locale.locale)
    page ? page.id : fallbackId
  })
}

const getFallbackId = (pages) => pages.nodes.find(page => {
  return page.language.name === defaultLanguage.locale;
}).id

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const HomePage = path.resolve('./src/templates/home-page.js');
    const ContactPage = path.resolve('./src/templates/contact-page.js');
    const VideoPage = path.resolve('./src/templates/video-page.js');
    const BioPage = path.resolve('./src/templates/bio-page.js');
    const MusicPage = path.resolve('./src/templates/music-page.js');
    const MusicSingle = path.resolve('./src/templates/music-single.js');
    const LivePage = path.resolve('./src/templates/live-page.js');

    resolve(
      graphql(`
      query {
        homePages: allContentfulHomePage {
          nodes {
            id
            language {
              name
            }
          }
        }
        musicPages: allContentfulPage(filter: {pageType: {eq: "music"}}) {
          nodes {
            id
            pageType
            language {
              name
            }
          }
        }
        contactPages: allContentfulPage(filter: {pageType: {eq: "contact"}}) {
          nodes {
            id
            pageType
            language {
              name
            }
          }
        }
        musicSingles: allContentfulMusic {
          nodes {
            id
            language {
              name
            }
            languageKey {
              name
            }
            title
          }
        }
      }
    `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        /////////////////
        // MUSIC PAGES //
        /////////////////

        const musicSortedByLanguage = {};
        // initialize language arrays
        Object.entries(locales).forEach(([,locale]) => musicSortedByLanguage[locale.locale] = [])
        // fill with the languages we have
        result.data.musicSingles.nodes.forEach(music => {
          musicSortedByLanguage[music.language.name].push(music)
        })
        // default language is fallback content
        const fallbackContentLanguageKeys = musicSortedByLanguage[defaultLanguage.locale].map(music => music.languageKey.name)
        // fill with fallback content        
        Object.entries(musicSortedByLanguage).forEach(([key,languageGroup]) => {
          if (key === defaultLanguage.locale) return;
          const languageGroupKeys = languageGroup.map(music => music.languageKey.name);
          fallbackContentLanguageKeys.forEach((languageKey, i) => {
            // no duplicates
            if (languageGroupKeys.includes(languageKey)) return;
            musicSortedByLanguage[key].push(musicSortedByLanguage[defaultLanguage.locale][i])
          })
        })

        const musicWithFallbackIdsSortedByLanguage = {} 
        Object.entries(musicSortedByLanguage).forEach(([key,languageGroup]) => {
          musicWithFallbackIdsSortedByLanguage[key] = languageGroup.map(music => music.id)
        })

        const fallbackHomepageId = getFallbackId(result.data.homePages);

        Object.entries(locales).forEach(([,locale]) => {
          const page = result.data.homePages.nodes.find(page => page.language.name === locale.locale)
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
        })

        const fallbackMusicpageId = getFallbackId(result.data.musicPages);

        Object.entries(locales).forEach(([,locale]) => {
          const page = result.data.musicPages.nodes.find(page => page.language.name === locale.locale)
          const path = `${locale.path}music`;
          const id = page ? page.id : fallbackMusicpageId

          console.log(`creating MusicPage at ${path}`)
          createPage({
            component: MusicPage,
            path,
            context: {
              id,
              musicIds: musicWithFallbackIdsSortedByLanguage[locale.locale]
            },
          });
        })

        Object.entries(musicSortedByLanguage).forEach(([lang,langGroup]) => {
          langGroup.forEach(music => {
            const path = `${lang === defaultLanguage.locale ? '' : lang}/music/${kebabCase(music.title)}`;
  
            console.log(`creating MusicSingle at ${path}`)
  
            createPage({
              component: MusicSingle,
              path,
              context: {
                id: music.id
              },
            });
          })
        })

        ///////////////////
        // Contact Pages //
        ///////////////////
        // const fallbackMusicpageId = getFallbackId(result.data.musicPages);
        const fallbackContactpageId = getFallbackId(result.data.contactPages);

        Object.entries(locales).forEach(([,locale]) => {
          const page = result.data.contactPages.nodes.find(page => page.language.name === locale.locale)
          const path = `${locale.path}contact`;
          const id = page ? page.id : fallbackContactpageId

          console.log(`creating ${locale.locale} ContactPage at ${path}`)
          createPage({
            component: ContactPage,
            path: `${path}`,
            context: {
              id
            },
          });  
        })


        // console.log(`creating VideoPage at ${path}videos`)
          // createPage({
          //   component: VideoPage,
          //   path: `${path}videos`,
          //   context: {
          //     id
          //   },
          // });  

        /////////////////////////////////////////////
        // Bio Pages ////////////////////////////////
        /////////////////////////////////////////////
        Object.entries(locales).forEach(([,locale]) => {

          // console.log(`creating BioPage at ${path}bio`)
          // createPage({
          //   component: BioPage,
          //   path: `${path}bio`,
          //   context: {
          //     id
          //   },
          // });  
        })

          // console.log(`creating LivePage at ${path}live`)
          // createPage({
          //   component: LivePage,
          //   path: `${path}live`,
          //   context: {
          //     id
          //   },
          // });  
      })
    )
  })
}