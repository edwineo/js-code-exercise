// http://example.com
// https://www.example.com
// https://www.example.com:443
// https://www.example.com?query=abc&query=abc
// https://www.example.com/?query=abc
// https://www.example.com#myHome
// https://www.example.com?query=abc#section1

// get the { protocol, domain, queryParam, hash }

// Answer
// 1. 直接使用浏览器内置的 URL API
function get(path) {
  const parsedUrl = new URL(path);
  const queryParams = {};

  parsedUrl.searchParams.forEach((value, key) => {
    if (queryParams[key]) {
      queryParams[key].push(value);
    } else {
      queryParams[key] = [value];
    }
  });

  return {
    protocol: parsedUrl.protocol,
    domain: parsedUrl.hostname,
    queryParam: queryParams,
    hash: parsedUrl.hash,
  };
}

// 2. 不使用 API，手动解析。使用函数拆分的方案
// 考虑可维护性与边界处理
// https://www.example.com:443/path?a=1&b=2#home
// │       │                    │       │
// │       │                    │       └ hash
// │       │                    └ query
// │       └ domain
// └ protocol

function parseUrl(url) {
  const [urlPart, hash = ""] = splitOnce(url, "#");
  const [base, query = ""] = splitOnce(urlPart, "?");
  const [protocol, domain] = splitOnce(base, "://");

  return {
    protocol,
    domain,
    queryParam: parseQuery(query),
    hash,
  };
}

function splitOnce(str, separator) {
  const index = str.indexOf(separator);
  if (index === -1) {
    return [str];
  }

  return [str.slice(0, index), str.slice(index + separator.length)];
}

function parseQuery(query) {
  if (!query) {
    return {};
  }

  return query?.split("&")?.reduce((res, item) => {
    const [key, value = ""] = item.split("=");
    if (res[key]) {
      res[key].push(value)
    } else {
      res[key] = [value]
    }
    return res;
  }, {});
}

console.log(get("https://www.example.com?key1=abc&key2=abcd&key1=abcd#nihao"));
