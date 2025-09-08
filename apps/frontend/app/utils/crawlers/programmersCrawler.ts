import { CheerioAPI } from "cheerio";
import { SubmitProblemRequestDto } from "@banbok/shared";

import { SiteCrawler } from "../../_type/crawler.type";

export const programmersCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("school.programmers.co.kr"),

  crawl: async (
    $: CheerioAPI,
    url: string,
  ): Promise<SubmitProblemRequestDto> => {
    const title = $(".challenge-title").text().trim();

    return {
      title,
      site: "Programmers",
      link: url,
    };
  },
};
