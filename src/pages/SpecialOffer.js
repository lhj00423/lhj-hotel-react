import React from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../config/aplurl';
import './SpecialOffer.css';
function SpecialList({list}){
    return (
        <li>
            <div className='imgdiv'>
                <img src={`${API_URL}/upload/event/${list.e_img1}`} alt=""/>
            </div>
            <div className='textdiv'>
                <h3>{list.e_title}</h3>
                <p>
                    {list.e_titledesc}
                </p>
                <div>
                    <Link to={`/special/${list.e_no}`}>
                    +<br/>
                    READ MORE
                    </Link>
                </div>
            </div>
        </li>
    )
}
const SpecialOffer = ({ data }) => {
    return (
        <div className='special'>
            <div className='inner'>
                <h2><span>스페셜 오퍼</span>생각 밖의 선물, 마이다스 호텔 & 리조트</h2>
                <ul>
                    {data.map(d=><SpecialList list={d} key={d.e_no}/>)}
                </ul>
            </div>
        </div>
    );
};

export default SpecialOffer;