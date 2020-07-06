import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const HomePage = ({ path, data }) => {
  const { contentfulHomePage } = data; 
  const {
    language,
    title,
    subtitle,
    // featuredImage,
    shortDescription,
    seoTitle,
    seoDescription,
    seoImage,
  } = contentfulHomePage


  return <Layout
      language={language}
      path={path}
    >
      <SEO
        lang={language}
        description={seoDescription}
        title={seoTitle}
        image={seoImage.file.url}
      />
      <div
        className="container pb-4 text-center text-sm-left"
        id="home"
      >
        <div className="row">
          <div className="col-md-6 my-auto">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            <div className="short">
              {shortDescription}
            </div>
          </div>
          <div className="col-md-6">
            <iframe
              title={title}
              style={{
                border: 0,
                width: '100%',
                height: '540px',
               }}
               src="https://bandcamp.com/EmbeddedPlayer/album=3159251444/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/" seamless>
                 <a href="http://dalgazul.bandcamp.com/album/dalgazul">Dalgazul by Dalgazul</a>
            </iframe>
            {/* <Img
              sizes={featuredImage.sizes}
              alt={`${subtitle} logo`}
              title={`${title}`}
            /> */}
          </div>
        </div> 
      </div>  
    </Layout>
  }

export default HomePage

export const query = graphql`
  query($id: String!) {
    site {
      ...SiteMetadata
    }
    contentfulHomePage(id: { eq: $id }) {
      ...HomePageFragment
    }
  }
`
