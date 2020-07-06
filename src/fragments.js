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
      headerLogo
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