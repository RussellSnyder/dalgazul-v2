import React from "react"
import { navigate, Link, graphql } from "gatsby"
import Navigation from './navigation';
import Img from "gatsby-image"
import Headroom from 'react-headroom'
import './header.scss';
import LanguageSelector, { getCurrentLocaleFromPath } from "./language-selector";

export default ({ siteTitle, path, headerLogo }) => (
  <Headroom>
    <div className="row">
      <div className="offset-1 col-3 offset-sm-4 col-sm-4 mb-sm-4 mb-md-0 offset-md-1 col-md-2">
        <Link to={getCurrentLocaleFromPath(path).path} >
          <Img  
            sizes={headerLogo.sizes}
            alt={`${siteTitle} main logo`}
            title={`${siteTitle} main logo`}
          />
        </Link>
      </div>
      <div className="col-6 offset-sm-2 col-sm-8 col-md-4 my-auto text-center">
        <Navigation path={path} />
      </div>
      <div className="col-md-2 text-sm-right flex-row-reverse my-auto d-none d-sm-block d-md-flex">
        <LanguageSelector path={path} />
      </div>

    </div>
  </Headroom>
)