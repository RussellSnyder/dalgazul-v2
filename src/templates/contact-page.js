import React, { useState } from "react"
import i18n from "i18next";
import { useTranslation } from "react-i18next";

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { Link, graphql } from "gatsby"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Img from "gatsby-image"
import Parallax from '../components/parallax'
import Page from '../components/page'

const ContactPage = ({ path, data }) => {
  const { t, i18n } = useTranslation();

  return <Layout
      language={data.contentfulPage.language.name}
      path={path}
    >
      <SEO
        title={data.site.title}
      />
      <Page data={data.contentfulPage} />
      <div className="container mb-4 pb-4">
        <form
          name={`${data.contentfulPage.language.name}-contact`}
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          // action=""
        >
          <input type="hidden" name="form-name" value="contact" />
          <div className="form-group">
            <label>{t('name')}</label>
            <input
              placeholder={t('name_placeholder')}
              className="form-control"
              type="text"
              name="name" />
          </div>
          <div className="form-group">
            <label>{t('email')}</label>
            <input
              placeholder={t("email_placeholder")}
              className="form-control"
              type="email"
              name="email"
            />
          </div>
          <div className="form-group">
            <label>{t('message')}</label>
            <textarea
              className="form-control"
              name="message"
              placeholder={t("message_placeholder")}
            />
          </div>
          <button type="submit" className="mt-2 btn btn-primary col-12">{t('send')}</button>
        </form>
      </div>
    </Layout>
  }

export default ContactPage

export const query = graphql`
  query($id: String!) {
    site {
      ...SiteMetadata
    }
    contentfulPage(id: { eq: $id }) {
      ...PageFragment
    }
  }
`