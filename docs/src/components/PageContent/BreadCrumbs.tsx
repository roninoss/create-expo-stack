import clsx from "clsx";

import { SIDEBAR, SIDEBAR_HEADER_MAP, type OuterHeaders } from "../../consts";
import { getIsRtlFromLangCode, getLanguageFromURL } from "../../languages";
import { ChevronRightIcon } from "@radix-ui/react-icons";
type SlugType = "" | "deployment" | "usage";

export default function BreadCrumbs() {
  const lang = getLanguageFromURL(window.location.href);
  const _isRtl = getIsRtlFromLangCode(lang ?? "en");
  const slugToEntryPath = (slug: SlugType): OuterHeaders => {
    switch (slug) {
      case "":
        return "rn.new";
      case "usage":
        return "Usage";
      case "deployment":
        return "Deployment";
    }
  };

  const pathname = window.location.pathname.endsWith("/")
    ? window.location.pathname.slice(0, -1)
    : window.location.pathname;

  const slug =
    pathname.slice(1).split("/").length > 2
      ? pathname.slice(1).split("/")[1]
      : "" || "";

  const actualEntries =
    SIDEBAR[lang][
      slugToEntryPath(
        slug === undefined || slug === "" ? "" : (slug as SlugType),
      )
    ];

  const getPathNameFromLink = (link: string) => {
    return [...(actualEntries ?? [])].find((entry) => entry.link === link)
      ?.text;
  };

  const getHeaderName = (header: OuterHeaders) => {
    if (lang === "en") return header;
    return SIDEBAR_HEADER_MAP[lang][header];
  };

  const breadcrumbs = pathname
    .split("/")
    .slice(pathname.split("/").length > 3 ? -2 : -1)
    .map((crumb) => {
      const path = pathname
        .split("/")
        .slice(0, pathname.split("/").indexOf(crumb) + 1)
        .join("/");

      return {
        href: `${window.location.protocol}//${window.location.host}${path}`,
        key: crumb,
        text:
          getPathNameFromLink(path.slice(path.indexOf(lang))) ??
          getHeaderName(
            `${crumb[0]?.toUpperCase()}${crumb.slice(1)}` as OuterHeaders,
          ),
      };
    });

  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        Docs
      </div>
      <ChevronRightIcon className="h-4 w-4" />
      {breadcrumbs.map((crumb, _index) => (
        <div key={crumb.key} className="font-medium text-foreground">
          {crumb.text}
        </div>
      ))}
    </div>
  );
}

function _BreadCrumbsArrow(props: { isRtl: boolean }) {
  return (
    <svg
      className={clsx(props.isRtl && "rotate-180")}
      width="16"
      height="16"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m9.005 4l8 8l-8 8L7 18l6.005-6L7 6z"
      />
    </svg>
  );
}
