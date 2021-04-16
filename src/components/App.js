import { logDOM } from '@testing-library/dom'
import React, { useState, useEffect, useRef } from 'react'

const App = () => {
  const [boxes, setBoxes] = useState([])

  const wrapperRef = useRef(null)
  const singleBoxContainer = useRef(null)
  let elems = document.querySelectorAll('.box-container')

  useEffect(() => {
    console.log(wrapperRef.current)
    main()
  }, [])

  const main = () => {
    const wrapper = wrapperRef.current // left off here
    const singleBoxContainer = document.querySelector('.box-container')
    const boxContainerWidth = singleBoxContainer.clientWidth
    let elems = document.querySelectorAll('.box-container')
    // let prevRatio = 0.0

    wrapper.scroll(boxContainerWidth, 0)

    const clone = singleBoxContainer.cloneNode(true)

    let options = {
      root: wrapper,
      rootMargin: '0px',
      threshold: 0.2, // this can be altered if need be
    }

    // calls the handleScroll function if the middle scroll element is leaving the observed area
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        console.log(entry)
        // scrolling right
        if (!entry.isIntersecting && entry.boundingClientRect.left > 20) {
          // prevRatio = entry.intersectionRatio
          // console.log(prevRatio)
          handleScroll(elems[2])
        }
        // scrolling left
        // if (!entry.isIntersecting && entry.boundingClientRect.left < 20) {
        //   handleScroll(elems[0])
        // }
        // prevRatio = entry.intersectionRatio
        // console.log(prevRatio)
      })
    }

    let observer = new IntersectionObserver(callback, options)

    const attachObservers = () => {
      observer.observe(elems[1])
      console.log(boxContainerWidth)
      setInterval(
        () => console.log(wrapper.scrollLeft, wrapper.clientWidth),
        125
      )
    }

    attachObservers()

    const handleScroll = (element) => {
      let scrollMultiplier = element === elems[2] ? 0.4 : 2.2

      element === elems[2] ? wrapper.prepend(element) : wrapper.append(element)
      // wrapper.scrollLeft = Math.round(
      //   wrapper.scrollWidth - boxContainerWidth * scrollMultiplier
      // )
      // 550
      // wrapper.clientWidth
      observer.unobserve(elems[1])
      observer.observe(elems[1])
      wrapper.scrollLeft = boxContainerWidth * 1.35
      // wrapper.scrollLeft = Math.round(boxContainerWidth * scrollMultiplier)

      elems = document.querySelectorAll('.box-container')
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
      <div className={`box ${item}`}>
        <span>{item}</span>
      </div>
    )
  })

  return (
    <div className='container'>
      <div ref={wrapperRef} className='wrapper'>
        <div className='box-container'>{renderedBoxes}</div>
        <div className='box-container'>{renderedBoxes}</div>
        <div className='box-container'>{renderedBoxes}</div>
      </div>
    </div>
  )
}

export default App
