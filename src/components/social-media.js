import React from 'react';
import {
  FaBandcamp,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaSoundcloud,
} from 'react-icons/fa';
import './social-media.scss'

const SocialMedia = ({ socialData, vertical, sticky, extraClass }) => {
  return <ul className={`
    social
    ${extraClass}
    ${vertical ? 'vertical' : ''}
    ${sticky ? 'sticky' : ''}
  `}>
    <li>
      <a href={socialData.facebook} target="_blank" rel="noreferrer">
        <FaFacebook />
      </a>
    </li>
    <li>
      <a href={socialData.youtube} target="_blank" rel="noreferrer">
        <FaYoutube />
      </a>
    </li>
    <li>
      <a href={socialData.instagram} target="_blank" rel="noreferrer">
        <FaInstagram />
      </a>
    </li>
    <li>
      <a href={socialData.bandcamp} target="_blank" rel="noreferrer">
        <FaBandcamp />
      </a>
    </li>
    <li>
      <a href={socialData.soundcloud} target="_blank" rel="noreferrer">
        <FaSoundcloud />
      </a>
    </li>
  </ul>
}

export default SocialMedia