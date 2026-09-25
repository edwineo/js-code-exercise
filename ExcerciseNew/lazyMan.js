// LazyMan(“Hank”)输出:
// Hi! This is Hank!

// LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
// Hi! This is Hank!
// //等待10秒..
// Wake up after 10
// Eat dinner~

// LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
// Hi This is Hank!
// Eat dinner~
// Eat supper~

// LazyMan(“Hank”).eat(“supper”).sleepFirst(5)输出
// //等待5秒
// Wake up after 5
// Hi This is Hank!
// Eat supper

class LazyMan {
  constructor (name) {
    this.tasks = []
    this.name = name
    const task = () => {
      console.log(this.name)
      this.next()
    }
    this.tasks.push(task)
    setTimeout(() => {
      this.next()
    }, 0)
  }

  next () {
    const task = this.tasks.shift()
    task && task()
  }

  sleep (time) {
    this.sleepWrapper(time)
    return this
  }

  sleepFirst (time) {
    this.sleepWrapper(time, true)
    return this
  }

  sleepWrapper (time, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log('sleep')
        this.next()
      }, time * 1000)
    }
    if (isFirst) {
      this.tasks.unshift(task)
    } else {
      this.tasks.push(task)
    }
  }

  run () {
    const task = () => {
      console.log('run')
      this.next()
    }
    this.tasks.push(task)
    return this
  }
}

function lazyMan (name) {
  return new LazyMan(name)
}
lazyMan('Edwin').run().sleepFirst(3)