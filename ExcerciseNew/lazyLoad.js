// React 组件中的图片懒加载

const LazyImg = ({src, className, alt}) => {
  const imgRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const img = imgRef.current
    if (!img) {
      return
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setLoaded(true)
          observer.unobserve(entry.target)
        }
      })
    })
    // 可以 observe 多个元素，但这里只 observe 了一个
    observer.observe(img)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <img
      ref={imgRef}
      src={loaded ? src : undefined}
      data-src={src}
      className={className}
      alt={alt}
    />
  )
}

const lazyImg2 = (props) => {
  const { src, className, alt, placeholder } = props
  const [loaded, setLoad] = useState(false)
  const imgRef = useRef(null)

  // 在这里处理副作用：监听事件
  useEffect(() => {
    if (!imgRef.current) {
      return
    }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          setLoad(true)
          observer.unobserve(item.target)
        }
      })
    })
    observer.observe(imgRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <img
      src={loaded ? src : placeholder}
      className={className}
      alt={alt}
    />
  )
}

export default LazyImg

// 现代化方案
{/* <img
  src={src}
  loading="lazy"
/> */}
// 浏览器已经原生支持懒加载了