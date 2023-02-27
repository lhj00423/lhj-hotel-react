import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { API_URL } from '../config/aplurl';
import './ReservationSign.css'

const ReservationSign = () => {
    const reserve = useSelector(state=>state.reserve)
    const [formData, setFormData] = useState({
        rv_email:"",
        rv_desc:"",
        rv_phone:"",
        rv_name:"",
        rv_roomno:reserve.rv_room.roomno,
        rv_checkin:reserve.rv_date.checkin,
        rv_checkout:reserve.rv_date.checkout,
        rv_adult:reserve.rv_adult,
        rv_child:reserve.rv_child,
        rv_roomname:reserve.rv_room.roomname,
        rv_price:reserve.rv_room.price
    });
    const onChange = (e) =>{  
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const addReserve = () => {
        axios.post(`${API_URL}/addReservation`,formData)
        .then(res=>console.log(res))
        .catch(e=>console.log(e))
    }
    return (
        <div className='reverveSign'>
            <div className='reserveCustomer'>
                <h3>고객정보입력</h3>
                <table className='defaulttable'>
                    <tbody>
                        <tr>
                            <td>성명</td>
                            <td>
                                <input type="text" name="rv_name" onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td>
                                <input type="text" name="rv_email" onChange={onChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>연락처</td>
                            <td>
                                <input type="text" name="rv_phone"onChange={onChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>기타요청사항</td>
                            <td>
                               <textarea name='rv_desc' onChange={onChange}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='reserveInfo'>
                <h3>예약정보</h3>
                    <ul>
                        <li><span>체크인</span><span>{reserve.rv_date.checkin}</span></li>
                        <li><span>체크아웃</span><span>{reserve.rv_date.checkout}</span></li>
                        <li><span>투숙인원</span><span>성인 : {reserve.rv_adult}명 어린이 : {reserve.rv_child}명</span></li>
                        <li><span>객실타입</span><span>{reserve.rv_room.roomname}</span></li>
                    </ul>
                    <div className='totalPrice'>
                        <div>총 합계 금액(VAT 포함가)</div>
                        <div className='price'>{reserve.rv_room.price}<span>원</span></div>
                    </div>
                    <div>
                        <button onClick={addReserve}>예약하기</button>
                    </div>
            </div>
        </div>
    );
};

export default ReservationSign;