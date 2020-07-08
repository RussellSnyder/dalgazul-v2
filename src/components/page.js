import React from "react"
import SEO from "../components/seo"

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Parallax from '../components/parallax'

const Page = ({data, location}) => {
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
      lang={language.name}
      image={seoImage.file.url}
      url={`${data.site.siteMetadata.url}${location.pathname}/`}          
    />
    <Parallax photo={featuredImage} />
    <div className="main-page container my-4">
      <div className="row">
        <div className='body col-12'>
          <h1>{title}</h1>
          {documentToReactComponents(body.json)}
        </div> 
      </div>
    </div>
  </>)
}

export default Page