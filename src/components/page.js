import React from "react"
import SEO from "../components/seo"

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Parallax from '../components/parallax'

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
        <div className='body col-12'>
          <h1>{title}</h1>
          {documentToReactComponents(body.json)}
        </div> 
      </div>
    </div>
  </>)
}

export default Page