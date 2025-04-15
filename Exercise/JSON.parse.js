
const json = "{'name':'Edwin'}"
function jsonParse (json) {
  const obj = (new Function(`return ${json}`))()
  return obj
}
console.log(jsonParse(json))