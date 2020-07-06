import { graphql } from "gatsby"

export const SiteFramgent = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      title
      url
      social {
        facebook
        youtube
      }
    }
  }
`;

export const ContributorFragment = graphql`
  fragment ContributorFragment on ContentfulMember {
    id
    language {
      name
    }
    name
    photo {
      title
      file {
        url
      }
    }
    role
    shortDescription {
      json
    }
    longDescription {
      json
    }
  }
`;

export const MusicFragment = graphql`
  fragment MusicFragment on ContentfulMusic {
    id
    language {
      name
    }
    title
    featuredImage {
      title
      file {
        url
      }
      fluid(maxHeight: 300) {
        sizes
        src
        srcSet
      }
      resize(height: 200) {
        src
        width
        height
      }
    }

    dateComposed(formatString: "MMMM, YYYY")
    shortDescription
    longDescription {
      json
    }
    youtubeId
    soundcloudId
    bandcampId
    composer {
      name
    }
    lyrics {
      json
    }
    translatedLyrics {
      json
    }
  }
`;

export const HomePageFragment = graphql`
  fragment HomePageFragment on ContentfulHomePage {
    language {
      name
    }
    title
    subtitle
    shortDescription
    featuredImage {
      title
      file {
        url
      }
      sizes(maxWidth: 1280) {
        ...GatsbyContentfulSizes_tracedSVG
      }
    }
    seoTitle
    seoDescription
    seoImage {
      title
      file {
        url
      }
    }
  }
`;

export const PageFragment = graphql`
  fragment PageFragment on ContentfulPage {
    language {
      name
    }
    pageType
    title
    featuredImage {
      title
      file {
        url
      }
      sizes(maxWidth: 1280) {
        ...GatsbyContentfulSizes_tracedSVG
      }
    }
    body {
      json
    }
    seoTitle
    seoDescription
    seoImage {
      title
      file {
        url
      }
    }
  }
`;