import React from "react"
import { useTranslation } from "react-i18next";

import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Page from '../components/page'

const ContactPage = ({ path, data }) => {
  const { t } = useTranslation();

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
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-6 offset-sm-3">{t('name')}
              <input
                id="name"
                placeholder={t('name_placeholder')}
                className="form-control"
                type="text"
                name="name" />
            </label>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-6 offset-sm-3">{t('email')}
              <input
                id="email"
                placeholder={t("email_placeholder")}
                className="form-control"
                type="email"
                name="email"
              />
            </label>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-6 offset-sm-3">{t('message')}
              <textarea
                id="email"
                className="form-control"
                name="message"
                placeholder={t("message_placeholder")}
              />
            </label>
          </div>
          <button type="submit" className="mt-2 btn btn-primary col-sm-6 offset-sm-3 col-12">{t('send')}</button>
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