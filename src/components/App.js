import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  const [boxes, setBoxes] = useState([])

  const wrapperRef = useRef(null)
  const singleBoxContainer = useRef(null)
  let elems = document.querySelectorAll('.box-container')

  useEffect(() => {
    console.log(wrapperRef.current)
    // main()
  }, [])

  const main = () => {
    const wrapper = wrapperRef.current // left off here
    const singleBoxContainer = document.querySelector('.box-container')
    const boxContainerWidth = singleBoxContainer.clientWidth
    let elems = document.querySelectorAll('.box-container')

    window.onload = () => {
      wrapper.scroll(boxContainerWidth, 0)
    }

    const clone = singleBoxContainer.cloneNode(true)

    let options = {
      root: wrapper,
      rootMargin: '0px',
      threshold: [0.25, 0.75], // this can be altered if need be
    }

    // calls the handleScroll function if the middle scroll element is leaving the observed area
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting && entry.boundingClientRect.left > 20) {
          handleScroll(elems[2])
        }
        if (!entry.isIntersecting && entry.boundingClientRect.left < 20) {
          handleScroll(elems[0])
        }
      })
    }

    let observer = new IntersectionObserver(callback, options)

    const attachObservers = () => {
      observer.observe(elems[1])
    }

    attachObservers()

    const handleScroll = (element) => {
      // set the x coordinate multiplier of where the scrollbar
      // will reposition after the scroll elements are altered
      let scrollMultiplier = element === elems[2] ? 1.25 : 2.25

      // if element 2 is passed into this current function
      // you will move the element to the beginning of the scroll elements
      // else move it to the end
      element === elems[2] ? wrapper.prepend(element) : wrapper.append(element)

      // reposition the scroll position to the middle of the scroll elements
      wrapper.scrollLeft =
        wrapper.scrollWidth - boxContainerWidth * scrollMultiplier

      // reassign the variable that points to the scroll elements
      // because the scroll elements have been altered
      elems = document.querySelectorAll('.box-container')
      // rebinding the observer to the middle element in the scroll field
      observer.unobserve(elems[1])
      observer.observe(elems[1])
    }
  }

  const renderedBoxes = [
    'artists',
    'artwork',
    'location',
    'theme',
    'medium',
  ].map((item) => {
    return (
      <div class={`box ${item}`}>
        <span>{item}</span>
      </div>
    )
  })

  return (
    <div class='container'>
      <div ref={wrapperRef} class='wrapper'>
        <div class='box-container'>{renderedBoxes}</div>
        <div class='box-container'>{renderedBoxes}</div>
        <div class='box-container'>{renderedBoxes}</div>
      </div>
    </div>
  )
}

export default App
