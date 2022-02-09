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


    const changeTech = (d) => {
        setTech(d)
        switch (d) {
            case 'launch vehicle':
                setImg(lauchImgMobile)
                break;
            case 'spaceport':
                setImg(spaceportImgMobile)
                break;
            case 'space capsule':
                setImg(capsuleImgMobile)
                break;
            default:
                break;
        }
    }

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
                bigDots={screenWidth < 1440 ? false : true}
                changeIndexDots={(i) => changeIndex(i)}>
                    {dataJ.technology.map((e, idx)=> 
                        <div key={idx} className="techCarousel">
                            <img src={screenWidth < 1440 ? e.images.landscape : e.images.portrait} alt="technology image" className="techImg"/>
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