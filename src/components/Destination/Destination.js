import './Destination.scss';
import React, { useState, useEffect } from 'react';
import moonImg from 'images/destination/image-moon.png'
import marsImg from 'images/destination/image-mars.png'
import titanImg from 'images/destination/image-titan.png'
import europaImg from 'images/destination/image-europa.png'
import {dataJ} from 'data.js';

const Destination = () => {
    let [destination, setDestination] = useState('moon')
    let [img, setImg] = useState(moonImg)
    let [data, setData] = useState({})
    
    const changeDestination = (d) => {
        setDestination(d)
        switch (d) {
            case 'mars':
                setImg(marsImg)
                break;
            case 'moon':
                setImg(moonImg)
                break;
            case 'europa':
                setImg(europaImg)
                break;
            case 'titan':
                setImg(titanImg)
                break;
            default:
                break;
        }
    }

    useEffect(()=>{
        let index = dataJ.destinations.findIndex(m=>m.name.toLowerCase() === destination.toLowerCase())
        setData(dataJ.destinations[index])
    }, [destination])

    return (
        <div className="destContainer">
            <p className="navText w-100  navTextMB mb-4"><span style={{opacity:0.25}}>01</span> Pick your destination</p>
            <div className="destContent">
                <img src={img} alt="planet " className="planetImg mb-4"/>
                <div>
                    <nav className="destNav mb-3">
                        <p className={destination === 'moon' ? "navText  active" : 'navText hoverLine purple'} onClick={()=>changeDestination('moon')}>moon</p>
                        <p className={destination === 'mars' ? " navText active" : 'navText hoverLine purple'}  onClick={()=>changeDestination('mars')}>mars</p>
                        <p className={destination === 'europa' ? " navText active" : 'navText hoverLine purple'} onClick={()=>changeDestination('europa')}>europa</p>
                        <p className={destination === 'titan' ? " navText active" : 'navText hoverLine purple'}  onClick={()=>changeDestination('titan')}>titan</p>
                    </nav>
                    <div className="text-div mb-3 ">
                        <h1 className="destinationH1">{destination}</h1>
                        <p className="bodyText">{data.description}</p>
                    </div>
                    <hr className="whiteLine" />
                    <div className="text-div2">
                        <div className="mb-3">
                            <p className="subheading2">Avg. distance</p>
                            <p className="subheading1">{data.distance}</p>
                        </div>
                        <div>
                            <p className="subheading2">Est. travel time</p>
                            <p className="subheading1">{data.travel}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Destination;