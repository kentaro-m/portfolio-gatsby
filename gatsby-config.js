require('dotenv').config()
const querystring = require('querystring')
const path = require('path')

const siteMetadata = {
  title: "Kentaro Matsushita - @kentaro-m",
  author: "Kentaro Matsushita",
  description: "kentarom's portfolio site",
  siteUrl: 'https://kentarom.com',
  siteLanguage: 'ja',
  shortName: 'kentarom',
  skills: [
    { type: 'Node.js', level: 80 },
    { type: 'React', level: 70 },
    { type: 'JavaScript', level: 60 },
    { type: 'TypeScript', level: 40 },
    { type: 'Java', level: 60 },
    { type: 'Go', level: 40 },
    { type: 'AWS', level: 70 },
    { type: 'MySQL', level: 50 },
    { type: 'Docker', level: 40 }
  ],
  user: {
    name: 'Kentaro Matsushita',
    github: 'kentaro-m',
    qiita: 'kentaro_m',
    speaker_deck: 'kentarom',
    twitter: '_kentaro_m',
    facebook: 'kentaro.m9',
    linkedin: 'kentarom'
  },
  blog: {
    url: 'https://blog.kentarom.com/',
    feed_url: 'https://blog.kentarom.com/rss.xml',
    article_count: '5'
  },
  github: {
    topic: 'my-portfolio'
  },
  speaker_deck: {
    slides_count: '6'
  }
}

const qs = querystring.stringify({
  rss_url: `https://speakerdeck.com/${siteMetadata.user.speaker_deck}.atom`,
  count: siteMetadata.speaker_deck.slides_count,
  api_key: process.env.RSS2JSON_API_TOKEN
})

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.shortName,
        start_url: '/',
        background_color: '#4173B3',
        theme_color: '#4173B3',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `assets`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-source-qiita`,
      options: {
        accessToken: process.env.QIITA_API_TOKEN,
        userName: siteMetadata.user.qiita,
        fetchPrivate: false,
      }
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: siteMetadata.blog.feed_url,
        name: `BlogPosts`,
      }
    },
    {
      resolve: "gatsby-source-apiserver",
      options: {
        url: `https://api.rss2json.com/v1/api.json?${qs}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        },
        name: 'Slides'
      }
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: process.env.GITHUB_API_TOKEN,
        graphQLQuery: `
        query ($q: String="", $nFirst: Int=0) {
          allGithubData: search(query: $q, type: REPOSITORY, first: $nFirst) {
            edges {
              node {
                ... on Repository {
                  id
                  name
                  description
                  url
                }
              }
            }
          }
        }
        `,
        variables: {
          q: `topic:${siteMetadata.github.topic} user:${siteMetadata.user.github}`,
          nFirst: 10
        }
      }
    },
    `gatsby-plugin-typescript`
  ],
}
