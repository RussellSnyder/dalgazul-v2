import React, { useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image"
import Parallax from '../components/parallax'

const VideoPage = ({ path, data }) => {

  return <Layout
      // language={language}
      path={path}
    >
      <SEO
        // title={title}
      />
      <h1>Video</h1>  

    </Layout>
  }

export default VideoPage