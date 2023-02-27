import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/aplurl';
import { getDatas } from '../modules/special';
import RoomPage from '../pages/RoomPage';
const roomData = async () => {
        const data = await axios.get(`${API_URL}/room`);
        return data;
    }   
const RoomContainer = ({isreserve,reserveRoom}) => {
    const {loading, data, error} = useSelector(state=>state.special.specials);
    const dispatch = useDispatch();
    useEffect(()=>{ 
        dispatch(getDatas(roomData))
    },[dispatch])
    if(loading) return <div>로딩중입니다.</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return <div>데이터가 없음</div>
    return (
        <div>
            <RoomPage data={data} isreserve={isreserve} reserveRoom={reserveRoom}/> 
        </div>
    );
}; 

export default RoomContainer;