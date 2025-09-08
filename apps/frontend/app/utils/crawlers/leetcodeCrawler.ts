import { CheerioAPI } from "cheerio";
import { SubmitProblemRequestDto } from "@banbok/shared";

import { SiteCrawler } from "../../_type/crawler.type";

export const leetcodeCrawler: SiteCrawler = {
  canHandle: (url: string) => url.includes("leetcode.com/problems"),

  crawl: async (
    _: CheerioAPI,
    url: string,
  ): Promise<SubmitProblemRequestDto> => {
    const slugMatch = url.match(/leetcode\.com\/problems\/([^\/]+)/);
    const slug = slugMatch?.[1] || "Unknown Title";

    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      title,
      site: "Leetcode",
      link: url,
    };
  },
};
