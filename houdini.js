/// <reference path="houdini.d.ts"/>

function getPropFactor(ctx) {
  return function (name, defaultValue) {
    const d = ctx.get(name)
    if (!d) {
      return defaultValue
    } else {
      if (d.length <= 0) {
        return defaultValue
      } else {
        return d[0]
      }
    }
  }
}

function hasPropFactor(ctx) {
  return function (name) {
    const d = ctx.get(name)
    if (!d) {
      return false
    } else {
      if (d.length <= 0) {
        return false
      } else {
        return true
      }
    }
  }
}

/**
 * @param {unknown} f 
 * @param {number} d 
 * @returns 
 */
function parseFloatWhenNaN(f, d) {
  const t = parseFloat(f)
  if (isNaN(t)) {
    return d
  }
  return t
}

/**
 * @param {string} input 
 * @returns 
 */
function parsePoint(input) {
  let [x = 0, y = 0] = String(input).split(',')
  x = parseFloatWhenNaN(x, 0)
  y = parseFloatWhenNaN(y, 0)
  return {
    x, y
  }
}

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {(input:number)=>number}
 */
function minAndMaxFactor(min, max) {
  return function (input) {
    if (input > max) {
      return max
    }
    if (input < min) {
      return min
    }

    return input
  }
}

registerPaint('custom-painter',
  class {
    /**
     * @returns {InputProperty[]}
     */
    static get inputProperties() {
      return [
        '--mow-color',
        '--mow-point'
      ]
    }
    /**
     * @param {CanvasRenderingContext2D} ctx 
     * @param {PaintSize} size
     * @param {StylePropertyMapReadOnly} props 
     */
    paint(ctx, size, props) {
      const getProp = getPropFactor(props)
      const hasProp = hasPropFactor(props)
      let target = 'x'

      if (size.width > size.height) {
        target = 'y'
      }

      if (hasProp('--mow-color')) {
        const bgColor = getProp('--mow-color', 'red')
        const point = parsePoint(getProp('--mow-point', '0,0'))
        const midPoint = {
          x: size.width / 2,
          y: size.height / 2
        }

        ctx.fillStyle = bgColor
        ctx.arc(
          midPoint.x,
          midPoint.y,
          minAndMaxFactor(10, target === 'y' ? size.height : size.width)(
            target === 'y'
              ? Math.abs(point.y - midPoint.y)
              : Math.abs(point.x - midPoint.x)
          ),
          Math.PI * 2, 0)
        ctx.fill()
      }
    }
  })