import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import SkillBars from '../components/SkillBars'
import QiitaItems, { Post as QiitaPost } from '../components/QiitaItems'
import Header from '../components/Header'
import Slides, { Item as SlideItem } from '../components/Slides'
import BlogPosts, { Post as BlogPost } from '../components/BlogPosts'
import GitHubRepos, { Repo } from '../components/GitHubRepos'
import Head from '../components/Head'

type User = {
  name: string
  github: string
  twitter: string
  qiita: string
  speaker_deck: string
  facebook: string
  linkedin: string
}

type Skill = {
  type: string
  level: number
}

type HomeIndexProps = {
  data: {
    allQiitaPost: {
      edges: QiitaPost[]
    }
    allSlides: {
      edges: [
        {
          node: {
            items: SlideItem[]
          }
        }
      ]
    }
    allFeedBlogPosts: {
      edges: BlogPost[]
    }
    allGithubData: {
      edges: [
        {
          node: {
            data: {
              allGithubData: {
                edges: Repo[]
              }
            }
          }
        }
      ]
    }
    site: {
      siteMetadata: {
        user: User
        skills: Skill[]
        blog: {
          url: string
        }
      }
    }
  }
}

const HomeIndex: React.FC<HomeIndexProps> = ({ data }) => {
  const qiitaPosts = data.allQiitaPost.edges
  const slides = data.allSlides.edges[0].node.items
  const blogPosts = data.allFeedBlogPosts.edges
  const repos = data.allGithubData.edges[0].node.data.allGithubData.edges
  const { user, skills, blog } = data.site.siteMetadata

  return (
    <Layout>
      <Head />
      <Header user={user} />
      <div id="main">
        <SkillBars backgroundColor="#4173B3" skills={skills} />
        {repos && repos.length > 0 && (
          <GitHubRepos repos={repos} user={user.github} />
        )}
        {qiitaPosts && qiitaPosts.length > 0 && (
          <QiitaItems posts={qiitaPosts} user={user.qiita} />
        )}
        {blogPosts && blogPosts.length > 0 && (
          <BlogPosts posts={blogPosts} blogUrl={blog.url} />
        )}
        {slides && slides.length > 0 && (
          <Slides items={slides} user={user.speaker_deck} />
        )}
      </div>
    </Layout>
  )
}

export default HomeIndex

export const query = graphql`
  query {
    site {
      siteMetadata {
        skills {
          type
          level
        }
        blog {
          url
        }
        user {
          name
          github
          qiita
          speaker_deck
          twitter
          facebook
          linkedin
        }
      }
    }
    allQiitaPost {
      edges {
        node {
          id
          title
          url
          created_at
        }
      }
    }
    allSlides(filter: { items: { elemMatch: { title: { ne: null } } } }) {
      edges {
        node {
          items {
            guid
            title
            link
            thumbnail
            pubDate
          }
        }
      }
    }
    allFeedBlogPosts {
      edges {
        node {
          id
          title
          link
          pubDate
        }
      }
    }
    allGithubData {
      edges {
        node {
          data {
            allGithubData {
              edges {
                node {
                  id
                  name
                  description
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
