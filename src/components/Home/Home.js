import './Home.scss';
import React, { useState, useEffect } from 'react';
import data from 'data.js'

const Home = () => {
    return (
        <div className="homeContainer">
            <div className="homeTextDiv">
                <h5 className="mb-2">So, you want to travel to</h5>
                <h1 className="mb-2">Space</h1>
                <p className=" textHome bodyText">Let’s face it; if you want to go to space, you might as well genuinely go to outer space and not hover kind of on the edge of it. Well sit back, and relax because we’ll give you a truly out of this world experience!</p>
            </div>
            <p className="explore ">Explore</p>
        </div>
    );
}

export default Home;