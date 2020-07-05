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

export const HomePageFragment = graphql`
  fragment HomePageFragment on ContentfulHomePage {
    language
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