import React from 'react'
import Helmet, { HelmetProps } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'
import { createAbsoluteUri } from '../lib/utils'

const Head: React.FC<HelmetProps> = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          siteLanguage
          user {
            twitter
          }
        }
      }
      avatar: file(relativePath: { eq: "avatar.jpeg" }) {
        publicURL
      }
    }
  `)

  const {
    user,
    title,
    description,
    siteUrl,
    siteLanguage,
  } = data.site.siteMetadata

  return (
    <Helmet title={title}>
      <html lang={siteLanguage} />
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={siteUrl} />
      <meta
        property="og:image"
        content={createAbsoluteUri(siteUrl, data.avatar.publicURL)}
      />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={`@${user.twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={siteUrl}></meta>
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={createAbsoluteUri(siteUrl, data.avatar.publicURL)}
      />
    </Helmet>
  )
}

export default Head
