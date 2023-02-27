import React, { useEffect } from 'react';
//import { MdFace } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogin, setLogout } from '../modules/logincheck';
import { getCookie, removeCookie } from '../util/cookie';
import './Header.css';
const Header = () => {
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const username = getCookie("username");
    const dispatch = useDispatch();
    const logoutClick = () => {
        removeCookie('username');
        removeCookie('useremail');
        dispatch(setLogout());
    }
    useEffect(()=>{
        const loop =setInterval(()=>{
            const username = getCookie("username")
            if(username){
                dispatch(setLogin());
            }else{
                dispatch(setLogout());
                clearInterval(loop);
            }
        },3000)
        
    },[dispatch,username]) 
    return (
        <header>
            <h1><Link to="/"><img class="mainlogo" src='/images/mainlogo.png' alt=''/></Link></h1>
            <ul className='menu'>
                <li><Link to="/special">스페셜오퍼</Link></li>
                <li><Link to="/room">객실안내</Link></li>
                <li><Link to="/reservation">객실예약</Link></li>
                <li>부대시설</li>
                <li>웨딩&컨벤션</li>
                <li>이용안내</li>
                { isLogin && username === 'admin' ? 
                <>
                    <li><Link to='/writeevent'>이벤트 등록</Link></li> 
                    <li><Link to='/writeroom'>객실 등록</Link></li>
                </>
                :null}
            </ul>
            <div>
                <div className='iconDiv'>
                    {/* <MdFace/> */}
                    <p>LOTTE HOTEL REWARDS</p>
                    <ul className='membermenu'>
                        { isLogin ? 
                        <><li onClick={logoutClick}>로그아웃</li>
                        <li><Link to="/join">회원정보</Link></li></> : 
                        <><li><Link to="/login">로그인</Link></li>
                        <li><Link to="/join">회원가입</Link></li></>
                        }
                    </ul>
                </div>
            </div>
            
        </header>
    );
};

export default Header;