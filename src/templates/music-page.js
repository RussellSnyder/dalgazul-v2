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

const Page = ({data}) => {
  const {
    title,
    body,
    language,
    featuredImage,
    seoDescription,
    seoImage,
    seoTitle,
  } = data; 

  return (<>
      <SEO
        title={seoTitle}
        description={seoDescription}
        lang={language}
        image={seoImage.file.url}
      />
        <Parallax photo={featuredImage} />
        <div className="main-page container my-4">
          <div className="row">
            <div className='body col-sm-10 offset-sm-2'>
              <h1>{title}</h1>
              {documentToReactComponents(body.json)}
            </div> 
          </div>
        </div>
  </>)
}

const MusicPreview = ({data}) => {
  const {
    featuredImage,
    title,
    composer,
    dateComposed,
    shortDescription    
  } = data;
  return <Link
    to={`${kebabCase(title)}`} 
    className="card music-preview"
  >
    <div className="top d-flex justify-content-between">
      <div className="col-6 image" style={{
        backgroundImage: `url(${featuredImage.file.url})`,
        backgrounsPosition: 'center',
        backgroundSize: 'cover',
      }}>
        {/* <img
          className="img-fluid"
          src={featuredImage.file.url}
          alt={featuredImage.title}
        /> */}
      </div>
      <div className="col-6 my-auto text-center">
        <h4 className="card-title">{title}</h4>
        <h6>-{composer.name}-</h6>
        <hr />
        <p>{shortDescription}</p>
      </div>
    </div>
  </Link>
}

const MusicPage = ({ path, data }) => {
  console.log(data);
  return <Layout
      path={path}
    >
      <Page data={data.contentfulPage} />
      <div className="container">
        <div className="row mb-4">
          {data.allContentfulMusic.nodes.map(data => (
            <div className="col-sm-6 col-md-4 mb-4">
              <MusicPreview data={data} key={data.id} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  }

export default MusicPage

export const query = graphql`
  query($id: String!, $musicIds: [String!]!) {
    site {
      ...SiteMetadata
    }
    contentfulPage(id: { eq: $id }) {
      ...PageFragment
    }
    allContentfulMusic(filter: {id: {in: $musicIds}}) {
      nodes {
        ...MusicFragment
      }
    }
  }
`
