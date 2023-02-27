import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/aplurl';
import { getData } from '../modules/special'; 
import RoomDetailpage from '../pages/RoomDetailpage';

const RoomDetailContainer = () => {
    const {no} = useParams(); //roomDetail 1/2
    const {loading, data, error} = useSelector(state=>state.special.special)
    const getRoomData = async () => {
        const data =axios.get(`${API_URL}/room/${no}`)
        return data;
    } 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getData(getRoomData))
    },[dispatch,no]) 
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!!!!</div>
    if(!data) return <div>데이터가 없음!!!!</div>
    return (
        <RoomDetailpage data={data}/>
    );
};

export default RoomDetailContainer;