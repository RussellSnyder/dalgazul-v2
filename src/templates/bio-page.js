import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import { kebabCase } from "lodash"
import './bio-page.scss'
import Page from '../components/page'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import locale from '../constants/locales';

const MemberPreview = ({data, imagePosition}) => {
  const {
    name,
    photo,
    role,
    shortDescription,
    language,
  } = data;

  const Image = () => (
    <div className="d-none d-md-block col-md-6 image" style={{
      backgroundImage: `url(${photo.file.url})`,
      backgrounsPosition: 'center',
      backgroundSize: 'cover',
    }}/>
  )
  const MobileImage = () => <img
    className="d-block w-100 d-md-none mb-4 mobile-image img-fluid"
    src={photo.file.url}
    alt={name}
  />

  const textClassName = `text text-center px-md-5 col-md-6 my-auto ${imagePosition === 'left' ? 'text-md-left' : 'text-md-right'}`
  return <Link
    to={`${locale[language.name].path}member/${kebabCase(name)}`} 
    className="member-preview row"
  >
    {imagePosition === "left" && <Image />}
    <div className={textClassName}>
      <h4>{name}</h4>
      <h6>{role}</h6>
      {shortDescription && documentToReactComponents(shortDescription.json)}
    </div>
    <MobileImage />
    {imagePosition === "right" && <Image />}
  </Link>
}

const BioPage = ({ path, data }) => {
  return <Layout
      path={path}
    >
      <Page data={data.contentfulPage} />
      <div className="container">
          {data.allContentfulMember.nodes.map((data, i) => (
            <div className="mb-4 pb-4">
              <MemberPreview
                key={data.id}
                imagePosition={i % 2 === 0 ? "left" : "right"}
                data={data}
              />
          </div>
          ))}
      </div>
    </Layout>
  }

export default BioPage

export const query = graphql`
  query($id: String!, $memberIds: [String!]!) {
    site {
      ...SiteMetadata
    }
    contentfulPage(id: { eq: $id }) {
      ...PageFragment
    }
    allContentfulMember(filter: {id: {in: $memberIds}}) {
      nodes {
        ...MemberFragment
      }
    }
  }
`
