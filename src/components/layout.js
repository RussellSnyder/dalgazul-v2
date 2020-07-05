import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import "./layout.scss"

const Layout = ({ children, language, path }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        ...SiteMetadata
      }
      headerLogo: imageSharp(original: {src: { regex: "/logo/" }}) {
        sizes(maxWidth: 150) {
          ...GatsbyImageSharpSizes_tracedSVG
        }
      }
    }
  `)

  return (
    <>
      <Header
        language={language}
        path={path}
        headerLogo={data.headerLogo}
      />
      <div>
        <main>{children}</main>
        <footer className="container text-center">
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
