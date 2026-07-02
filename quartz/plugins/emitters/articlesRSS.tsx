import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"

interface Options {
  /** Only pages carrying this tag are included in the feed. */
  articleTag: string
  /** Max number of items in the feed. Omit for no limit. */
  rssLimit?: number
  /** Emit the full rendered HTML of each article instead of its description. */
  rssFullHtml: boolean
  /** Output slug (file name without extension) for the feed. */
  rssSlug: string
  /** Feed title. Falls back to "<site title> — Articles". */
  title?: string
}

const defaultOptions: Options = {
  articleTag: "type/article",
  rssLimit: 20,
  rssFullHtml: false,
  rssSlug: "articles",
}

type FeedItem = {
  slug: FullSlug
  title: string
  description: string
  richContent?: string
  date?: Date
}

function generateArticlesRSS(
  cfg: GlobalConfiguration,
  items: FeedItem[],
  feedSlug: string,
  feedTitle: string,
  limit?: number,
): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, item: FeedItem): string => `<item>
    <title>${escapeHTML(item.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description><![CDATA[ ${item.richContent ?? item.description} ]]></description>
    <pubDate>${item.date?.toUTCString()}</pubDate>
  </item>`

  const body = items
    .sort((a, b) => {
      if (a.date && b.date) {
        return b.date.getTime() - a.date.getTime()
      } else if (a.date && !b.date) {
        return -1
      } else if (!a.date && b.date) {
        return 1
      }
      return a.title.localeCompare(b.title)
    })
    .slice(0, limit ?? items.length)
    .map((item) => createURLEntry(simplifySlug(item.slug), item))
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(feedTitle)}</title>
      <link>https://${joinSegments(base, encodeURI(feedSlug))}.xml</link>
      <description>Articles on ${escapeHTML(cfg.pageTitle)}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${body}
    </channel>
  </rss>`
}

export const ArticlesRSS: QuartzEmitterPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }

  return {
    name: "ArticlesRSS",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const items: FeedItem[] = []

      for (const [tree, file] of content) {
        if (!(file.data.frontmatter?.tags ?? []).includes(opts.articleTag)) {
          continue
        }

        items.push({
          slug: file.data.slug!,
          title: file.data.frontmatter?.title ?? "Untitled",
          description: file.data.description ?? "",
          richContent: opts.rssFullHtml
            ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
            : undefined,
          date: getDate(cfg, file.data) ?? new Date(),
        })
      }

      const feedTitle = opts.title ?? `${cfg.pageTitle} — Articles`

      yield write({
        ctx,
        content: generateArticlesRSS(cfg, items, opts.rssSlug, feedTitle, opts.rssLimit),
        slug: opts.rssSlug as FullSlug,
        ext: ".xml",
      })
    },
    externalResources: (ctx) => ({
      additionalHead: [
        <link
          rel="alternate"
          type="application/rss+xml"
          title={opts.title ?? `${ctx.cfg.configuration.pageTitle} — Articles`}
          href={`https://${ctx.cfg.configuration.baseUrl}/${opts.rssSlug}.xml`}
        />,
      ],
    }),
  }
}
