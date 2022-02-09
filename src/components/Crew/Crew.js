import './Crew.scss';
import React, { useState, useEffect } from 'react';
import {dataJ} from 'data.js';
import dougImg from 'images/crew/image-douglas-hurley.png'
import anImg from 'images/crew/image-anousheh-ansari.png'
import markImg from 'images/crew/image-mark-shuttleworth.png'
import victorImg from 'images/crew/image-victor-glover.png'

import Carrousel from 'shared/Carrousel/Carrousel'

const Crew = () => {
    let [crew, setCrew] = useState('douglas Hurley')
    let [index, setIndex] = useState(0)
    let [img, setImg] = useState(dougImg)
    let [data, setData] = useState({})
    let [slide, setSlide] = useState(false)
    let [width, setWidth] = useState(window.innerWidth)

    useEffect(()=>{
        let index = dataJ.crew.findIndex(m=>m.name.toLowerCase() === crew.toLowerCase())
        setData(dataJ.crew[index])
    }, [crew])

    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
        
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const changeCrew = (d) => {
        setCrew(d)
        switch (d) {
            case 'douglas hurley':
                setImg(dougImg)
                break;
            case 'mark shuttleworth':
                setImg(markImg)
                break;
            case 'victor glover':
                setImg(victorImg)
                break;
            case 'anousheh ansari':
                setImg(anImg)
                break;
            default:
                break;
        }
    }

    const changeIndex = (i) => {
        if(i === 5){
            return;
        }
        setIndex(i)
    }


    return (
        <div className="crewContainer">
            <p className="navText navTextDeskt w-100 mb-4"><span style={{opacity:0.25}}>02</span> Meet your crew</p>
            {/* <div className="dots my-3">
                <span className={index === 0 || index === 4 ? 'circle' : 'circle opacity'}></span>
                <span className={index === 1 ? 'circle' : 'circle opacity'}></span>
                <span className={index === 2 ? 'circle' : 'circle opacity'}></span>
                <span className={index === 3 ? 'circle' : 'circle opacity'}></span>
            </div> */}
            <Carrousel
            smallDots={true}
            arrows={width > 1439 ? true : false}
            show={1}
            infiniteLoop={true}
            changeIndexDots={(i) => changeIndex(i)}>
                {dataJ.crew.map((e, idx)=> 
                    <div className="carrouselContainer" key={idx}>
                        <div className="crewImgDiv">
                            <img src={e.images.png} alt="crew" />
                        </div>
                        <div key={idx} className="crewTextDiv">
                            <p className="subheading3">{e.role}</p>
                            <p className="subheading1">{e.name}</p>
                            <p className="bodyText bodyTextCrew">{e.bio} </p>
                        </div>
                    </div>
                )}
            </Carrousel>
        </div>
    );
}

export default Crew;