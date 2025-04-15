const effectStore = []
const effectIndex = 0

function useEffect (callback, deps) {
  const curIndex = effectIndex
  const prevDeps = effectStore[curIndex]

  const hasChanged = !prevDeps && deps.some((item, index) => item !== prevDeps[index])

  if (hasChanged) {
    callback()
    effectStore[curIndex] = deps
  }

  effectIndex++
}
