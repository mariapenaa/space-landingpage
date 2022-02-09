import './Header.scss';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from 'images/shared/logo.svg'
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { SettingsApplicationsRounded } from '@material-ui/icons';
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles({
    drawer: {
        '&.MuiBackdrop-root' : {
            backgroundColor:'transparent',
        },
        "& .MuiPaper-root" : {
            backgroundColor: 'rgba(255, 255, 255, 0.04',
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(21.5485px)',
            width:'80%'

        }
    },
    fullList: {
        width: 'auto',
    },
  });



const Header = () => {
    let [open, setOpen] = useState(false)
    let [tab, setTab] = useState('')

    const location = useLocation();
    
    useEffect(()=> {
        if(location.pathname==='/'){
            setTab('home')
        }else{
            setTab(location.pathname.substring(1))
        }
    }, [])

    const tabClick = (d) => {
        setTab(d)
        setOpen(false)
    }
    const classes = useStyles();
    return (
        <header>
            <img src={logo} alt="logo" />
            <hr className="whiteLine homeLine"/>
            <MenuIcon className="menuIcon" onClick={()=>setOpen(true)}/>

                <Drawer
                    className={classes.drawer}
                    anchor='right'
                    open={open}
                    onClose={()=>setOpen(false)}

                >
                    <div className="w-100 d-flex justify-content-end p-4">
                        <CloseIcon className="menuIcon" onClick={()=>setOpen(false)}/>
                    </div>
                    <ul className="drawerList">
                        <li onClick={()=>tabClick('home')}><Link to="/" className={tab === 'home' ? 'navText active' : 'navText hoverLine'} ><span style={{fontWeight:'bold'}}>00</span> Home</Link></li>
                        <li onClick={()=>tabClick('crew')}><Link to="/crew" className={tab === 'crew' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>01</span> Crew</Link></li>
                        <li onClick={()=>tabClick('destination')}> <Link to="/destination" className={tab === 'destination' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>02</span> Destination</Link></li>
                        <li onClick={()=>tabClick('technology')}><Link to="/technology" className={tab === 'tech' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>03</span> Technology</Link></li>
                    </ul>
                </Drawer>
    
            <ul className="drawerList2">
                    <li onClick={()=>tabClick('home')}><Link to="/" className={tab === 'home' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>00 </span>   Home</Link></li>
                    <li onClick={()=>tabClick('crew')}><Link to="/crew" className={tab === 'crew' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>01</span> Crew</Link></li>
                    <li onClick={()=>tabClick('destination')}> <Link to="/destination" className={tab === 'destination' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>02</span> Destination</Link></li>
                    <li onClick={()=>tabClick('technology')}><Link to="/technology" className={tab === 'tech' ? 'navText active' : 'navText hoverLine'}><span style={{fontWeight:'bold'}}>03</span> Technology</Link></li>
                </ul>
        </header>
    );
}

export default Header;