import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import '../i18n';
import Header from "./header"
import "./layout.scss"

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
      />
      <div>
        <main>{children}</main>
        <footer className="container text-center p-4">
          © {new Date().getFullYear()} - Dalgazul
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}


export default Layout
