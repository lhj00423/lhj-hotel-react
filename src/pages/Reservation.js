import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/aplurl';
import RoomContainer from '../containers/RoomContainer';
import { dataUpdate } from '../modules/reserve';
import Example from './Example';
import './Reservation.css';
import ReservationSign from './ReservationSign';

const Reservation = () => {
    const [isShow, setIsShow] = useState(false);
    //체크인, 체크아웃, 스토어에서 받아오기
    const rv_date = useSelector(state=>state.reserve.rv_date);
    const dispatch = useDispatch();
    //예약이 불가능한 방목록
    const [reserveRoom, setReserveRoom] = useState([]);
    const hideDateDiv = (start,end) => {
        if(start && end){
        dispatch(dataUpdate({
            name : "rv_date",
            value:{
                checkin:start,
                checkout:end
            }
        }))
        console.log(start,end);
        setIsShow(false);
            }else{
                return;
                }
            }
    const onChange = (e) => {
        const {name, value} = e.target;
        dispatch(dataUpdate({
            name: name,
            value:value
        }))
    }
    //해당날짜에 예약이 되어있는 객실번호 불러오기
    const searchRoom = (start,end) => {
        axios.get(`${API_URL}/searchRoom?start=${start}&end=${end}`)
        .then(res=>{
                console.log(res.data)
                setReserveRoom(res.data);
            })
        .catch(e=>{
            console.log(e) 
        })
    }
    return (
        <div className='inner'>
            <Title title="Reservation"/>
            <Routes>
                <Route path="/*" element={ 
                <div>
                <div className='reservation'>
                    <ul className='reservsearch'>
                        <li>
                            <div>
                                <span>Check in</span>
                                <input name='rv_checkin' 
                                onChange={onChange} 
                                onClick={()=>setIsShow(!isShow)}
                                value={rv_date.checkin}/>
                            </div>
                            <div>
                                <span>Check out</span>
                                <input name='rv_checkout'
                                onChange={onChange}
                                value={rv_date.checkout}/>
                            </div>
                            <div className='checkdate'>
                                {isShow && <Example hideDateDiv={hideDateDiv}/>}
                            </div>
                        </li>
                        <li> 
                            <div>
                                <span>Adults</span>
                                <select name='rv_adult' onChange={onChange}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span>Cildren</span>
                                <select name='rv_child' onChange={onChange}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                </select>
                            </div>
                        </li>
                        <li onClick={()=>searchRoom(rv_date.checkin,
                            rv_date.checkout)}> 
                            <div>
                                검색
                            </div>
                        </li>
                    </ul>
                </div>
            <RoomContainer isreserve={true} reserveRoom={reserveRoom}/>
        </div>}/>
        <Route path="/register" element={<ReservationSign/>}/> 
        <Route path="/abc" element={<div>abc페이지입니다.</div>}/> 
       </Routes> 
    </div>
    );
};

export default Reservation; 