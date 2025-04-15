function requestAnimationFrame2Interval(fn, delay) {
  let timer = null;
  let start = Date.now();
  let end = Date.now();

  function loop() {
    timer = window.requestAnimationFrame(loop);
    end = Date.now();
    if (end - start >= delay) {
      fn();
      start = Date.now();
    }
  }
  window.requestAnimationFrame(loop);
  return timer
}

