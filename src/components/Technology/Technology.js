import './Technology.scss';
import React, { useState, useEffect } from 'react';
import lauchImgMobile from 'images/technology/image-launch-vehicle-landscape.jpg'
import capsuleImgMobile from 'images/technology/image-space-capsule-landscape.jpg'
import spaceportImgMobile from 'images/technology/image-spaceport-landscape.jpg'
import {dataJ} from 'data.js';
import Carrousel from 'shared/Carrousel/Carrousel'

const Technology = () => {
    let [tech, setTech] = useState('launch vehicle')
    let [img, setImg] = useState(lauchImgMobile)
    let [data, setData] = useState({})
    let [index, setIndex] = useState(1)
    let [screenWidth, setWidth] = useState(window.innerWidth)
    let [imgHeight, setImgHeight] = useState(0)

    useEffect(()=>{
        let index = dataJ.technology.findIndex(m=>m.name.toLowerCase() === tech.toLowerCase())
        setData(dataJ.technology[index])
    }, [tech])

    useEffect(()=>{
        function handleResize() {
            setWidth(window.innerWidth)
        }
        
        window.addEventListener('resize', handleResize)
        
        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    })

    const handleImageLoad = (event) => {
        // Do whatever you want here
        const imageHeight = event.target.clientHeight;
        setImgHeight(imageHeight)
        console.log(imageHeight)
    }

    //316 - 390
    //115px - 162

    const changeIndex = (i) => {
        if(i === 4){
            return;
        }
        setIndex(i)
    }

    return (
        <div className="techContainer">
            <p className="navText mb-4  navTextTech w-100"><span style={{opacity:0.25}}>02</span> Space launch 101</p>
            

                <Carrousel
                arrows={false}
                show={1}
                infiniteLoop={true}
                bigDots={true}
                dotsHeight={imgHeight}
                changeIndexDots={(i) => changeIndex(i)}>
                    {dataJ.technology.map((e, idx)=> 
                        <div key={idx} className="techCarousel">
                            <img onLoad={handleImageLoad} src={screenWidth < 1440 ? e.images.landscape : e.images.portrait}  alt="technology image" className="techImg"/>
                            <div className="techText mt-3">
                                <p className="subheading2">The terminology...</p>
                                <p className="subheading1">{e.name}</p>
                                <p className="bodyText" style={{fontSize:'1.1rem'}}>{e.description} </p>
                            </div>
                        </div>
                    )}
                </Carrousel>


        </div>
    );
}

export default Technology;