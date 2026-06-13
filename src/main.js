// Reveal.js core CSS
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/white.css'

// Custom theme & animations
import '../css/theme.css'
import '../css/animations.css'

// Reveal.js core + plugins
import Reveal from 'reveal.js'
import Notes from 'reveal.js/plugin/notes/notes.esm.js'

const deck = new Reveal({
    hash: true,
    history: false,
    center: false,
    controls: true,
    controlsLayout: 'bottom-right',
    controlsTutorial: false,
    progress: true,
    slideNumber: 'c/t',

    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    width: '100%',
    height: '100%',
    margin: 0,
    minScale: 1,
    maxScale: 1,

    showNotes: false,

    plugins: [Notes],
})

deck.initialize()

// --- Animated number counters ---
deck.on('slidechanged', (event) => {
    const counters = event.currentSlide.querySelectorAll('[data-count-to]')
    counters.forEach((el) => {
        const target = parseInt(el.dataset.countTo)
        const suffix = el.dataset.countSuffix || ''
        const duration = 1500
        const start = performance.now()

        function animate(now) {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            el.textContent = Math.floor(target * eased) + suffix
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    })
})
