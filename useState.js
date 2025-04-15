const App = () => {
  const value = useDebounce('123', 1000)
}

const useDebounce = (str, delay) => {
  const [value, setValue] = useState(str)
  const [timer, setTimer] = useState(null)

  if (!timer) {
    const timeout = setTimeout(() => {
      setValue(str)
      setTimer(timeout)
    }, delay)
  }

  return value
}
