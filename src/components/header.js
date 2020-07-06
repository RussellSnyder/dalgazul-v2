import React from "react"
import { navigate, Link, graphql } from "gatsby"
import Navigation from './navigation';
import Img from "gatsby-image"
import Headroom from 'react-headroom'
import './header.scss';
import LanguageSelector, { getCurrentLocaleFromPath } from "./language-selector";
import logo from "../images/logo_header.png"

console.log(logo)
export default ({ siteTitle, path }) => (
  <Headroom>
    <div className="d-none d-sm-block d-md-none position-absolute"
      style={{
        right: 0
      }}
    >
      <LanguageSelector path={path} />
    </div>
    <div className="row">
      <div className="offset-1 col-3 offset-sm-4 col-sm-4 mb-sm-4 mb-md-0 offset-md-1 col-md-2">
        <Link to={getCurrentLocaleFromPath(path).path}>
          <img
            className="img-fluid"
            src={logo}
            title={`${siteTitle} main logo`}
            style={{
              minWidth: 110
            }}
          />
        </Link>
      </div>
      <div className="col-6 offset-sm-2 col-sm-8 offset-md-1 col-md-4 my-auto text-center">
        <Navigation path={path} />
      </div>
      <div className="col-md-3 flex-row-reverse my-auto d-none d-md-flex">
        <LanguageSelector path={path} />
      </div>

    </div>
  </Headroom>
)