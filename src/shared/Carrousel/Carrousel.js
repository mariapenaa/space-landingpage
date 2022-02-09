import React, {useState, useEffect} from 'react'
import './Carrousel.scss'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const Carousel = (props) => {
  const {children, show, infiniteLoop, changeIndexDots, arrows} = props
    const [currentIndex, setCurrentIndex] = useState(0)
    const [length, setLength] = useState(children.length)
    const [touchPosition, setTouchPosition] = useState(null)

    const [isRepeating, setIsRepeating] = useState(infiniteLoop && children.length > show)

    const [transitionEnabled, setTransitionEnabled] = useState(true)

    // Set the length to match current children from props
    useEffect(() => {
      setLength(children.length)
      setIsRepeating(infiniteLoop && children.length > show)
  }, [children, infiniteLoop, show])

  useEffect(() => {
    if (isRepeating) {
        if (currentIndex === show || currentIndex === length) {
            setTransitionEnabled(true)
        }
    }
  }, [currentIndex, isRepeating, show, length])


    useEffect(()=> {
      const interval = setInterval(()=>{
        let number = length - show
        if (currentIndex < (length - show)) {
          setCurrentIndex(prevState => prevState + 1)
        }else{
          setCurrentIndex(length)
          /* setTransitionEnabled(false) */
        }
      }, 5000)
      
      return () => {
        if (interval) {
          clearInterval(interval)
        }
      }
    })

    useEffect(()=>{
      changeIndexDots(currentIndex)
    }, [currentIndex])

/*     const updateIndex = (newIndex) => {
      if (newIndex < 0) {
        newIndex = children.length - 1;
      } else if (newIndex >= children.length ) {
        newIndex = 0;
      }
      setCurrentIndex(newIndex);
    }; */


    const next = () => {
      if (isRepeating || currentIndex < (length - show)) {
          setCurrentIndex(prevState => prevState + 1)
      }
    }
  
    const prev = () => {
      if (isRepeating || currentIndex > 0) {
          setCurrentIndex(prevState => prevState - 1)
      }
    }

    const handleTouchStart = (e) => {
      const touchDown = e.touches[0].clientX
      setTouchPosition(touchDown)
    }

    const handleTouchMove = (e) => {
      const touchDown = touchPosition
      if(touchDown === null) {
          return
      }
      const currentTouch = e.touches[0].clientX
      const diff = touchDown - currentTouch
      if (diff > 5) {
          next()
      }
      if (diff < -5) {
          prev()
      }
      setTouchPosition(null)
    }

    const handleTransitionEnd = () => {
      if (isRepeating) {
          if (currentIndex === 0) {
              setTransitionEnabled(false)
              setCurrentIndex(length)
          } else if (currentIndex === length + show) {
              setTransitionEnabled(false)
              setCurrentIndex(show)
          }
      }
    }

  const renderExtraPrev = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[length - 1 - index])
        }
        output.reverse()
        return output
    }

    const renderExtraNext = () => {
        let output = []
        for (let index = 0; index < show; index++) {
            output.push(children[index])
        }
        return output
    }

    return (
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {arrows ?
          <button className="left-arrow" onClick={prev} >
            <ArrowBackIosIcon className="arrowIcon"/>
          </button> : <span></span>
          }
              {props.bigDots ?
                <div className="dots2 my-3" style={{top:props.dotsHeight+(0.05*props.dotsHeight)+'px'}}>
                    <span className={ currentIndex === 0 || currentIndex === 3 ? 'circle2' : 'circle2 opacity2'} onClick={()=>setCurrentIndex(0)}>1</span>
                    <span className={currentIndex === 1 ? 'circle2' : 'circle2 opacity2'} onClick={()=>setCurrentIndex(1)}>2</span>
                    <span className={currentIndex === 2 ? 'circle2' : 'circle2 opacity2'} onClick={()=>setCurrentIndex(2)}>3</span>
                </div> : <span></span>
              }
              {props.smallDots ?
                <div className="dots my-3">
                  <span className={currentIndex === 0 || currentIndex === 4 ? 'circle' : 'circle opacity'} onClick={()=>setCurrentIndex(0)}></span>
                  <span className={currentIndex === 1 ? 'circle' : 'circle opacity'} onClick={()=>setCurrentIndex(1)}></span>
                  <span className={currentIndex === 2 ? 'circle' : 'circle opacity'} onClick={()=>setCurrentIndex(2)}></span>
                  <span className={currentIndex === 3 ? 'circle' : 'circle opacity'} onClick={()=>setCurrentIndex(3)}></span>
                </div>: <span></span>
              }
            <div className="carousel-content-wrapper"  
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}>
                <div className="carousel-content"
                  style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: !transitionEnabled ? 'none' : undefined, }}
                    onTransitionEnd={() => handleTransitionEnd()} >
                        {
                            (length > show && isRepeating) &&
                            renderExtraPrev()
                        }
                        {children}
                        {
                            (length > show && isRepeating) &&
                            renderExtraNext()
                        }
                </div>
            </div>
            {arrows ? 
          <button onClick={next} className="right-arrow">
            <ArrowForwardIosIcon className="arrowIcon"/>
          </button> : <span></span>
            }
        </div>
      </div>
    )
}

export default Carousel