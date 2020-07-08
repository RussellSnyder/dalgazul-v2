import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import './music-page.scss'

const MemberPage = ({ path, data, location }) => {
  const {
    name,
    photo,
    role,
    longDescription,
    shortDescription,
    language,
  } = data.contentfulMember;

  return (
    <Layout
        language={language}
        path={path}
      >
        <SEO 
          title={`Dalgazul | ${name}`}
          description={shortDescription}
          image={photo.file.url}
          lang={language.name}
          location={location}
        />
        <div className="container">
          <div className="row mb-4 mb-sm-5">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <img
                className="d-block w-100 img-fluid"
                src={photo.file.url}
                alt={name}
              />
            </div>
            <div className="col-sm-6 my-auto text-center">
              <h1>{name}</h1>
              <hr />
              <h6>{role}</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-10 offset-sm-1">
              {longDescription && documentToReactComponents(longDescription.json)}
            </div>
          </div>
        </div>

      </Layout>
  )
}

export default MemberPage

export const query = graphql`
  query($id: String!) {
    site {
      ...SiteMetadata
    }
    contentfulMember(id: {eq: $id}) {
      ...MemberFragment
    }
  }
`
