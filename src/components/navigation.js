import React, { useState } from 'react';
import './navigation.scss';
import { TiWaves } from 'react-icons/ti'
import { GrClose } from 'react-icons/gr'
import LanguageSelector, { getCurrentLocaleFromPath } from "./language-selector";
import { Link } from "gatsby"

const navLinks = (path) => {
  const currentLocale = getCurrentLocaleFromPath(path)

  return [
    {
      title: "Music",
      path: `${currentLocale.path}music`,
      disabled: true,
    },
    {
      title: "Videos",
      path: `${currentLocale.path}videos`,
      disabled: true,
    },
    {
      title: "Live",
      path: `${currentLocale.path}live`,
      disabled: true,
    },
    {
      title: "Bio",
      path: `${currentLocale.path}bio`,
      disabled: true,
    },
    {
      title: "Contact",
      path: `${currentLocale.path}contact`
    },
  ]
}

const Navigation = ({ path }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="d-none d-sm-flex justify-content-center">
        {navLinks(path).map(link => {
          return <Link
            key={link.path}
            className="mx-3"
            to={link.path}
          >
            {link.title}
          </Link>
        })}  
      </div>
      <div className="d-block d-sm-none">
        <TiWaves className="hamburger clickable" onClick={() => setIsOpen(true)} />
        <div
          id="myNav"
          className="overlay"
          style={{
            height: isOpen ? '100vh' : '0'
          }}
        >
          <GrClose className="clickable closebtn" onClick={() => setIsOpen(false)} />
          <div className="overlay-content">
            {navLinks(path).map(link => {
              return <Link
                key={link.path}
                className=""
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.title}
              </Link>
            })}  
            <div className="d-sm-none">
              <LanguageSelector path={path} />
            </div>
          </div>
        </div>
      </div> 
    </>
  );
}

export default Navigation
