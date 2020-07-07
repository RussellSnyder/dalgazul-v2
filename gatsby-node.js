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

const sortByLanguageAndAddFallbacks = (pages) => {
  const itemsSortedByLanguage = {};
  // initialize language arrays
  Object.entries(locales).forEach(([,locale]) => itemsSortedByLanguage[locale.locale] = [])
  // fill with the languages we have
  pages.nodes.forEach(item => {
    itemsSortedByLanguage[item.language.name].push(item)
  })
  // default language is fallback content
  const fallbackContentLanguageKeys = itemsSortedByLanguage[defaultLanguage.locale].map(item => item.languageKey.name)
  // fill with fallback content        
  Object.entries(itemsSortedByLanguage).forEach(([key,languageGroup]) => {
    if (key === defaultLanguage.locale) return;
    const languageGroupKeys = languageGroup.map(item => item.languageKey.name);
    fallbackContentLanguageKeys.forEach((languageKey, i) => {
      // no duplicates
      if (languageGroupKeys.includes(languageKey)) return;
      itemsSortedByLanguage[key].push(itemsSortedByLanguage[defaultLanguage.locale][i])
    })
  })

  const itemsSortedByLanguageWithFallbackKey = {} 
  Object.entries(itemsSortedByLanguage).forEach(([key,languageGroup]) => {
    itemsSortedByLanguageWithFallbackKey[key] = languageGroup.map(item => item.id)
  })

  return [itemsSortedByLanguage, itemsSortedByLanguageWithFallbackKey]
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const HomePage = path.resolve('./src/templates/home-page.js');
    const ContactPage = path.resolve('./src/templates/contact-page.js');
    const VideoPage = path.resolve('./src/templates/video-page.js');
    const BioPage = path.resolve('./src/templates/bio-page.js');
    const MemberPage = path.resolve('./src/templates/member-single.js');
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
        bioPages: allContentfulPage(filter: {pageType: {eq: "bio"}}) {
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
        members: allContentfulMember {
          nodes {
            id
            language {
              name
            }
            languageKey {
              name
            }
            name
          }
        }
      }
    `).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        /////////////////
        // HOME PAGES //
        /////////////////

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

        ////////////////////////////////////
        // MUSIC PAGES /////////////////////
        ////////////////////////////////////

        const [musicGroupedByLanguage, musicGroupedByLanguageWithFallbackIds] = sortByLanguageAndAddFallbacks(result.data.musicSingles)
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
              musicIds: musicGroupedByLanguageWithFallbackIds[locale.locale]
            },
          });
        })

        Object.entries(musicGroupedByLanguage).forEach(([lang,langGroup]) => {
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

        //////////////////////////////////////
        // Contact Pages /////////////////////
        //////////////////////////////////////
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
        // Bio & Member Pages ///////////////////////
        /////////////////////////////////////////////
        const [membersGroupedByLanguage, membersGroupedByLanguageWithFallbackIds] = sortByLanguageAndAddFallbacks(result.data.members);
        const fallbackBiopageId = getFallbackId(result.data.bioPages);

        Object.entries(locales).forEach(([,locale]) => {
          const page = result.data.bioPages.nodes.find(page => page.language.name === locale.locale)
          const path = `${locale.path}bio`;
          const id = page ? page.id : fallbackBiopageId

          console.log(`creating BioPage at ${path}`)
          createPage({
            component: BioPage,
            path: `${path}`,
            context: {
              id,
              memberIds: membersGroupedByLanguageWithFallbackIds[locale.locale]
            },
          });  
        })

        Object.entries(membersGroupedByLanguage).forEach(([lang,langGroup]) => {
          langGroup.forEach(member => {
            const path = `${lang === defaultLanguage.locale ? '' : lang}/member/${kebabCase(member.name)}`;
  
            console.log(`creating MemberPage at ${path}`)
  
            createPage({
              component: MemberPage,
              path,
              context: {
                id: member.id
              },
            });
          })
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