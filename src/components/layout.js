import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import '../i18n';
import Header from "./header"
import SocialMedia from "./social-media"
import "./layout.scss"
import { FaRegCopyright } from "react-icons/fa";

const Layout = ({ children, language, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        ...SiteMetadata
      }
    }
  `)
  return (
    <>
      <Header
        language={language}
        siteTitle={data.site.siteMetadata.title}
        path={path}
        headerLogo={data.site.siteMetadata.headerLogo}
        socialData={data.site.siteMetadata.social}
      />
      <div>
        <SocialMedia
          vertical
          sticky
          socialData={data.site.siteMetadata.social}
        />
        <main>{children}</main>
        <footer className="container p-4">
          <div className="row">
            <div className="px-5 px-md-3 col-md-6 offset-lg-1 col-lg-4 text-center mb-3">
              <SocialMedia
                socialData={data.site.siteMetadata.social}
              />
            </div>
            <div className="col-md-6 offset-lg-1 text-center">
              <h5 className="my-3">
                <FaRegCopyright /> {new Date().getFullYear()} | Dalgazul
              </h5>
            </div>
          </div>

        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}


export default Layout
