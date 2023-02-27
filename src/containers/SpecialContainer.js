import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../config/aplurl';
import { getDatas } from '../modules/special';
import SpecialOffer from '../pages/SpecialOffer';
import SpecialOfferPage from '../pages/SpecialOfferPage';

const SpecialContainer = ({ ismain,limits }) => {
    const specialData = async () => {
        const data = await axios.get(`${API_URL}/specials/${limits}`);
        return data;
    }
    const { loading, data, error } = useSelector(state=>state.special.specials);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getDatas(specialData))
    },[dispatch])
    if(loading) return <div>로딩중...</div>
    if(error) return <div>에러 발생!!!!</div>
    if(!data) return <div>데이터가 없음!!!!</div> 
    if(ismain) {
    return (
        <SpecialOffer data={data}/> 
    );
    }else {
        return(
            <SpecialOfferPage data={data}/>
        )
    }
};

export default SpecialContainer;