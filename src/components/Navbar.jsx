import React ,{useState,useEffect}from 'react'
import {Button,Menu,Typography,Avatar} from 'antd';
import { Link } from 'react-router-dom';
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuFoldOutlined, MenuOutlined} from '@ant-design/icons';
import icon from '../assets/images/cryptocurrency.png';
const Navbar = function () {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(null);

    //one time calling useEffect 
    useEffect(()=>{
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize',handleResize);
        handleResize();
        return() => window.removeEventListener('resize',handleResize);

    },[])
    //use effect when ever screen size changes 
    useEffect(()=>{
        if(screenSize < 768) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);

        }
    },[screenSize])

    return (
        <>
        <div className='nav-container'>

            <div className="logo-container">
                <Avatar src={icon} size="large"/>
                <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoworld</Link>
                </Typography.Title>
                <button className='menu-control-container' onClick={()=> setActiveMenu(!activeMenu)}>
                    <MenuOutlined/> </button>               
            </div>
            {activeMenu &&(
            <Menu theme='dark'>
                <Menu.Item icon={<HomeOutlined/>}>
                    <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item icon={<FundOutlined/>}>
                    <Link to="/cryptocurrencies">Cryptocurrencies</Link>
                </Menu.Item>
                <Menu.Item icon={<MoneyCollectOutlined/>}>
                    <Link to="/exchanges">Exchanges</Link>
                </Menu.Item>
                <Menu.Item icon={<BulbOutlined/>}>
                    <Link to="/news">News</Link>
                </Menu.Item>
            </Menu>
            )}
        </div>
        
        </>
    )
}

export default Navbar;
