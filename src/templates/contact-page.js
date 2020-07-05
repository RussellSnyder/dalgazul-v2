import React, { useState } from "react"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image"
import Parallax from '../components/parallax'

const ContactPage = ({ path, data }) => {

  return <Layout
      // language={language}
      path={path}
    >
      <SEO
        title={data.site.title}
      />
      <div className="container">
        <h1>Contact</h1>  

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          // action=""
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="form-group">
            <label>Your Name:</label>
            <input className="form-control" type="text" name="name" />
          </div>
          <div className="form-group">
            <label>Your Email: </label>
            <input className="form-control" type="email" name="email" />
          </div>
          <div className="form-group">
            <label>Message: </label>
            <textarea className="form-control" name="message"></textarea>
          </div>
          <button type="submit" className="mt-2 btn btn-primary col-12">Send</button>
        </form>
      </div>
    </Layout>
  }

export default ContactPage

export const query = graphql`
  query {
    site {
      ...SiteMetadata
    }
  }
`
