import './style.scss'

const title = document.querySelector('.test__heading')
const popup = document.getElementById('memeFollow')
const img = popup.querySelector('.test__meme-follow-img')

const OFFSET_X = 20
const OFFSET_Y = 16

let raf = null

if (title && popup && img) {
  function clampToViewport(x, y) {
    const vw = innerWidth, vh = innerHeight
    const pw = popup.offsetWidth || 180
    const ph = popup.offsetHeight || 180

    return [
      Math.min(Math.max(8, x), vw - pw - 8),
      Math.min(Math.max(8, y), vh - ph - 8),
    ]
  }

  function follow(e) {
    const [nx, ny] = clampToViewport(e.clientX + OFFSET_X, e.clientY + OFFSET_Y)
    popup.style.transform = `translate3d(${nx}px, ${ny}px, 0)`
  }

  function onMouseMove(e) {
    if (raf) cancelAnimationFrame(raf)
    requestAnimationFrame(() => follow(e))
  }

  title.addEventListener('mouseenter', () => {
    const src = title.getAttribute('data-meme')
    if (src) {
      img.src = src
    }
    popup.classList.add('is-visible')
    title.addEventListener('mousemove', onMouseMove)
  })

  title.addEventListener('mouseleave', () => {
    popup.classList.remove('is-visible')
    popup.style.transform = 'translate3d(-9999px,-9999px,0)'
    title.removeEventListener('mousemove', onMouseMove)
    if (raf) cancelAnimationFrame(raf)
    raf = null
  })
}