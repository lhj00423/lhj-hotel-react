import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import { API_URL } from '../config/aplurl';
import { getCookie } from '../util/cookie';

const WriteEvent = () => {
    const navigate = useNavigate();
    const isLogin = useSelector(state=>state.logincheck.isLogin);
    const username = getCookie("username");
    const [formData, setFormData] = useState({
        e_title: "",
        e_time: "",
        e_titledesc: "",
        e_desc: "",
        e_category: "special",
        e_img1: "",
        e_img2: ""
    }) 
    const onChange = (e) =>{
        const { name , value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    //input 타입이 file인 input이 onChange되었을때 호출되는 함수
    //변경된 파일을 서버로 업로드 전송하기
    const onChangeImage= (e) => {
        const {name} = e.target;
        //폼테크 생성하기
        const imageFormData = new FormData();
        //폼태그에 데이터 추가하기
        imageFormData.append('img',e.target.files[0]);
        //전송
        axios.post(`${API_URL}/upload`,imageFormData,{
            headers:{'content-type':'multipart/formdata'}
        }).then(res=>{
            console.log(res);
            setFormData({
                ...formData,
                [name]: res.data.imageUrl
            })
            console.log(formData)
        })
        .catch(e=>console.log(e))
    }
    //폼전송
    const onSubmit = (e) => {
        //form 태그 전송 이벤트 삭제
        e.preventDefault();
        //인풋체크후 addEvnet 호출
        addEvent();

    }
    const addEvent = () => {
        axios.post(`${API_URL}/event`,formData)
        .then(res=>{
            alert("등록되었습니다.");
            navigate('/special');
        })
        .catch(e=>console.log(e))
    }
    useEffect(()=>{
        if(!isLogin || username !== 'admin'){
            alert("관리자가 접근할수 있습니다.");
            navigate('/');
        }
    },[isLogin,username,navigate])
    if(!isLogin || username !== 'admin') return null;
    return (
        <div className='inner'>
            <Title title="Event"/>
            <form onSubmit={onSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" name="e_title" 
                            value={formData.e_title} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>기간</td>
                            <td><input type="text" name="e_time" 
                            value={formData.e_time} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>간략설명</td>
                            <td><input type="text" name="e_titledesc" 
                            value={formData.e_titledesc} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>분류</td>
                            <td>
                                <select name="e_category" value={formData.e_category}
                                onChange={onChange}>
                                    <option value="special">스페셜</option>
                                    <option value="promotion">프로모션</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>이미지1</td>
                            <td>
                                <input type="file" name="e_img1" 
                                onChange={onChangeImage} />
                                {formData.e_img1 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img1}`}
                                    width="80px" alt=""/>
                                    </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>이미지2</td>
                            <td>
                                <input type="file" name="e_img2"
                                onChange={onChangeImage}/>
                                {formData.e_img2 && <div>
                                    <img src={`${API_URL}/upload/event/${formData.e_img2}`}
                                    width="80px" alt=""/>
                                    </div>}
                            </td>
                        </tr>
                        <tr>
                            <td>상세설명글</td>
                            <td>
                                <textarea name="e_desc" value={formData.e_desc}
                                onChange={onChange}></textarea> 
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type="submit">등록</button>
                                <button type="reset">취소</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default WriteEvent;