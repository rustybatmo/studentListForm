import { URL_PREFIX } from "./util/Common";

export default function getUrls(isDomainMapped) {
  let urls = [
    {
      name: "root",
      pattern: "/",
    },
    {
      name: "module",
      pattern: "/:module",
    },
    {
      name: "modulePage",
      pattern: "/:module/:page",
    },
    {
      name: "edit",
      pattern: "/:module/edit/:id",
    },
    {
      name: "list",
      pattern: "/schools/:id/studentlist",
    },
  ];

  return urls.map((url) => {
    url.pattern = `${URL_PREFIX}${url.pattern}`;
    return url;
  });
}
