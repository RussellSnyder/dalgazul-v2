import React, { useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image"
import Parallax from '../components/parallax'
import { kebabCase } from "lodash"
import './music-page.scss'

const MusicSingle = ({ path, data }) => {
  const {
    featuredImage,
    title,
    composer,
    dateComposed,
    shortDescription,
    longDescription,
    soundcloudId,
    youtubeId,
    bandcampId,
    lyrics,
    translatedLyrics,
    language,
  } = data.contentfulMusic;

  console.log(path)
  return (
    <Layout
        // language={language}
        path={path}
      >
        <SEO 
          title={`${title} | ${composer.name}`}
          description={shortDescription}
          image={featuredImage.file.url}
          lang={language.name}
          location={path}
        />
        <div className="container mb-4 pb-4">
          <div className="row mb-4 pb-4">            
            <div className="col-sm-6 image mb-4 mb-sm-0">
              <img
                className="img-fluid"
                src={featuredImage.file.url}
                alt={featuredImage.title}
              />
            </div>
            <div className="col-sm-6 my-auto text-center">
              <h1 className="mb-4">{title}</h1>
              <h5>Composed by: {composer.name}</h5>
              <h6>{dateComposed}</h6>
            </div>
          </div>
          {(soundcloudId || bandcampId) && <hr className="mb-4 pb-4" />}
          {(soundcloudId || bandcampId) && <div className="row pb-4 mb-4">
            {bandcampId && <div className={`${soundcloudId ? 'my-auto col-sm-6 mb-4 mb-sm-0' : 'col-sm-8 offset-sm-2'}`}>
              <iframe
                title={`bandcamp ${title}`}
                style={{border: 0, width: '100%', height: 120}}
                src={`https://bandcamp.com/EmbeddedPlayer/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/track=${bandcampId}/transparent=true/`}
                seamless
              />
            </div>}
            {soundcloudId && <div className={`${bandcampId ? 'my-auto col-sm-6' : 'col-sm-8 offset-sm-2'}`}>
              <iframe
                title={`soundcloud ${title}`}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudId}&color=%23ffffff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
              />
            </div>}
          </div>}
          <hr className="mb-4 pb-4" />
          <div className="row mb-4 pb-4">
            <div className={`${youtubeId ? 'col-sm-6 my-auto' : 'col-sm-10 offset-sm-1'} `}>
              {documentToReactComponents(longDescription.json)}
            </div>
            {youtubeId && <div className="col-sm-6">
              <iframe
                title={`youtube ${title}`}
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>}
          </div>
          {lyrics && <hr className="pb-4 mb-4" />}
          {lyrics && <div className="row lyrics">
            <div className={`${translatedLyrics ? 'col-sm-6' : 'col-sm-8 offset-sm-2'}`}>
              <h3>Lyrics</h3>
              {documentToReactComponents(lyrics.json)}
            </div>
            {translatedLyrics && <div className="col-sm-6">
              <h3>Translation</h3>            
              {documentToReactComponents(translatedLyrics.json)}
            </div>}
          </div>}
        </div>
      </Layout>
  )
}

export default MusicSingle

export const query = graphql`
  query($id: String!) {
    site {
      ...SiteMetadata
    }
    contentfulMusic(id: {eq: $id}) {
      ...MusicFragment
    }
  }
`
