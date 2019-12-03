// Circuit view box dimensions
const viewBoxWidth = 960
const viewBoxHeight = 560

// Distance utility function
function dist(x1, y1, x2, y2) {
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1))
}

// Define transition utility function
function defineTransition(el, value) {
  // Clear any previous transition
  el.style.transition = 'none'
  el.style.WebkitTransition = 'none'
  // Trigger a layout so styles are calculated & the browser
  // picks up the starting position before animating
  el.getBoundingClientRect()
  // Define our transition
  el.style.transition = value
  el.style.WebkitTransition = value
}

// Determine direction of line in relation to view box center
function lineDirection(line) {
  // Distance from start of line to center
  var p1 = line.getPointAtLength(0)
  var d1 = dist(p1.x, p1.y, viewBoxWidth/2, viewBoxHeight/2)
  // Distance from end of line to center
  var p2 = line.getPointAtLength(line.getTotalLength())
  var d2 = dist(p2.x, p2.y, viewBoxWidth/2, viewBoxHeight/2)
  // Direction is true if line starts in center
  return d1 < d2
}

// Play the circuit transition
function circuitTransition() {
  console.log('transition')

  // Grow circuit lines outwards from center
  for (let line of document.querySelector('#lines').children) {
    // Set up the starting positions
    var length = line.getTotalLength()
    line.style.strokeDasharray = length + ' ' + length
    line.style.strokeDashoffset = lineDirection(line) ? length : -length
    // Define our transition
    defineTransition(line, 'stroke-dashoffset 3s ease-in-out')
    // Go!
    line.style.strokeDashoffset = '0'
  }

  // Fade in circles (same routing as above)
  circles = document.querySelector('#Circles')
  circles.style.opacity = 0
  defineTransition(circles, 'opacity 1s ease-in')
  circles.style.opacity = 1
}


// If page is visible...
if (document.visibilityState === 'visible') {
  // ...play the transition immediatly...
  circuitTransition()
} else {
  // ...otherwise hide the circuit...
  for (let group of document.querySelectorAll('svg g')) {
    group.style.display = 'none'
  }
  // ...and play the transition once the page is visible
  function onVisibilitychange() {
    if (document.visibilityState !== 'visible') {
      return
    }
    for (let group of document.querySelectorAll('svg g')) {
      group.style.display = 'inline'
    }
    circuitTransition()
    document.removeEventListener("visibilitychange", onVisibilitychange)
  }
  document.addEventListener("visibilitychange", onVisibilitychange)
}
