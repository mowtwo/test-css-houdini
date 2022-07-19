/// <reference path="index.d.ts"/>

CSS.paintWorklet.addModule('./houdini.js')

/**
 * @type {HTMLDivElement}
 */
const paint = document.querySelector('.paint')

paint.addEventListener('mousemove', (e) => {
  paint.style.setProperty('--mow-point', `${e.clientX},${e.clientY}`)
})