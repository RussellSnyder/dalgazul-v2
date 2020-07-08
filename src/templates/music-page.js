import React from "react"

import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import './music-page.scss'
import Page from '../components/page'

const MusicPreview = ({data}) => {
  const {
    featuredImage,
    title,
    composer,
    // dateComposed,
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
      }}/>
      <div className="col-6 my-auto text-center">
        <h4 className="card-title">{title}</h4>
        <h6>-{composer.name}-</h6>
        <hr />
        <p>{shortDescription}</p>
      </div>
    </div>
  </Link>
}

const MusicPage = ({ path, data, location }) => {
  return <Layout
      path={path}
    >
      <Page location={location} data={data.contentfulPage} />
      <div className="container">
        <div className="row mb-4">
          {data.allContentfulMusic.nodes.map(data => (
            <div className="col-sm-6 mb-4">
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
