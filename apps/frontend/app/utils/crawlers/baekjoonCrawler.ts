import { CheerioAPI } from "cheerio";
import { SubmitProblemRequestDto } from "@banbok/shared";

import { SiteCrawler } from "../../_type/crawler.type";

export const baekjoonCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("acmicpc.net"),

  crawl: async (
    $: CheerioAPI,
    url: string,
  ): Promise<SubmitProblemRequestDto> => {
    const title = $("#problem_title").text().trim();

    return {
      title,
      site: "Baekjoon",
      link: url,
    };
  },
};
