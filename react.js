// use React to get the width of the div element
// please also consider the width change when window resize
// you can use Element.getBoundingClientRect() to get width
//

import { useEffect } from 'react'
const MyComponent = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    function getSize () {
      const element = document.getElementById('img')
      const rect = element.getBoundingClientRect()
      setWidth(rect.width)
    }
    getSize()
    window.addEventListener('resize', getSize)
    return () => {
      window.removeEventListener('resize', getSize)
    }
  }, [])

  // your code
  return (
    <div id="img" style={{ display: "inline-block", width: "30%"}}>the content's width is: {{width}}px</div>
  )
}