/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Meta = ConcatArray<PropertyMeta | NameMeta>

type PropertyMeta = {
  property: string
  content: GatsbyTypes.Maybe<string>
}

type NameMeta = {
  name: string
  content: GatsbyTypes.Maybe<string>
}

type Props = {
  description?: string
  lang?: string
  meta?: Meta
  title: string
}

const SEO: React.FC<Props> = ({
  description = "",
  lang = "en",
  meta = [],
  title,
}: Props) => {
  const { site } = useStaticQuery<GatsbyTypes.SiteMetaQuery>(
    graphql`
      query SiteMeta {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site?.siteMetadata?.description
  const defaultTitle = site?.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site?.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default SEO
