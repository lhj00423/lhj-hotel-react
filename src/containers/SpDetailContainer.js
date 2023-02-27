import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config/aplurl';
import { getData } from '../modules/special';

const SpDetailContainer = () => {
    const { no } = useParams();
    const { data, loading, error } = useSelector(state=>state.special.special);
    const dispatch = useDispatch();
    const getSpecialData = async () => {
        const data = await axios.get(`${API_URL}/special/${no}`);
        return data;
    }
    useEffect(()=>{
        dispatch(getData(getSpecialData))
    },[dispatch , no])
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!!!!</div>
    if(!data) return <div>데이터가 없음!!!!</div> 
    return ( 
        <div>
            <h2>{data[0].e_title}</h2>
        </div>
    );
};

export default SpDetailContainer;