import * as cheerio from "cheerio";
import { SubmitProblemRequestDto } from "@banbok/shared";

import { SiteCrawler } from "../_type/crawler.type";

import { baekjoonCrawler } from "./crawlers/baekjoonCrawler";
import { leetcodeCrawler } from "./crawlers/leetcodeCrawler";
import { programmersCrawler } from "./crawlers/programmersCrawler";

export class CrawlerManager {
  private crawlers: SiteCrawler[] = [
    baekjoonCrawler,
    programmersCrawler,
    leetcodeCrawler,
  ];

  async crawl(url: string): Promise<SubmitProblemRequestDto> {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const crawler = this.crawlers.find((c) => c.canHandle(url));
    if (!crawler) {
      throw new Error("지원하지 않는 사이트입니다.");
    }

    return await crawler.crawl($, url);
  }
}
