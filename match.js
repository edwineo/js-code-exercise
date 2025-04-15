// http://example.com
// https://www.example.com
// https://www.example.com:443
// https://www.example.com?query=abc&query=abc
// https://www.example.com/?query=abc
// https://www.example.com#myHome
// https://www.example.com?query=abc#section1

// get the { protocol, domain, queryParam, hash }

function get(path) {
  let rest = ''
  const protocol = path.split('://')[0]
  rest = path.split('://')[1]

  const domain = rest.split('?')[0]
  rest = rest.split('?')[1]

  const query = rest.split('#')[0]
  const hash = rest.split('#')[1]
  const queryList = query.split('&')
  const queryParam = {}
  queryList.forEach((item) => {
    const key = item.split('=')[0]
    const value = item.split('=')[1]
    queryParam[key] = value
  })

  return {
    protocol: "",
    domain: "",
    queryParam: "",
    hash: "",
  }
}

function get (path) {
  const parsedUrl = new URL(path)
  const queryParams = {}

  parsedUrl.searchParams.forEach((value, key) => {
    if (queryParams[key]) {
      queryParams[key].push(value)
    } else {
      queryParams[key] = [value]
    }
  })
  
  return {
    protocol: parsedUrl.protocol,
    domain: parsedUrl.hostname,
    queryParam: queryParams,
    hash: parsedUrl.hash,
  }
}
console.log(get('https://www.example.com?query=abc&query=abc'))