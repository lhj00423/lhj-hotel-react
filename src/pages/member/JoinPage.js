import axios from 'axios';
import React, { useState } from 'react';
import PopupDom from '../../components/PopupDom';
import PopupPostCode from '../../components/PopupPostCode';
import Title from '../../components/Title';
import { API_URL } from '../../config/aplurl';

const JoinPage = () => {
    const [ formData, setFormData ] = useState({
        m_name:"",
        m_pass:"",
        m_passch:"",
        m_nickname:"",
        m_email:"",
        m_phone:"",
        m_add1:"",
        m_add2:""
    });
    const onChange = (e) =>{
        const { name , value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    //팝업창 관련 상태관리 
    const [isPopupOpen,setIsPopupOpen] = useState(false);
    //팝업창 열기
    const openPostCode = () => {
        setIsPopupOpen(true);
    }
    //팝업창 닫기 
    const closePostCode = () => {
        setIsPopupOpen(false);
    }
    // 주소 넣기
    const onAddData = (data) => {
        console.log(data);
        setFormData({
            ...formData,
            m_add1: data.address
        })
    }
    //폼전송 이벤트
    const onSubmit = (e) => {
        e.preventDefault();
        //입력이 다 외었는지 체크
        if(formData.m_name !== "" && formData.m_pass !== "" && formData.m_phone !== "" && formData.m_add1 !== ""
        && formData.m_add2 !== "" && formData.m_email !== ""){
            addMember();
        }
    }
    const addMember = () => {
        console.log("호출")
        axios.post(`${API_URL}/join`, formData)
        .then(res =>{
            alert("등록되었습니다.");
        })
        .catch( e =>{
            console.log("에러 발생!")
            console.log(e);
        })
    }
    return (
        <div className='inner'>
            <Title title="Join" />
            <div>
                <form onSubmit={onSubmit}>
                    <table className='defaulttable'>
                        <tbody>
                            <tr>
                                <td>이름</td>
                                <td><input name="m_name" type="text" value={formData.m_name} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>이메일 주소(아이디)</td>
                                <td><input name="m_email" type="text" value={formData.m_email} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input name="m_pass" type="password" value={formData.m_pass} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>비밀번호 체크</td>
                                <td><input name="m_passch" type="password" value={formData.m_passch} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>별명</td>
                                <td><input name="m_nickname" type="text" value={formData.m_nickname} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>전화번호</td>
                                <td><input name="m_phone"type="text" value={formData.m_phone} onChange={onChange} /></td>
                            </tr>
                            <tr>
                                <td>주소</td>
                                <td><input name="m_add1" type="text" value={formData.m_add1} onChange={onChange} />
                                <input name="m_add2" type="text" value={formData.m_add2} onChange={onChange} />
                                <button onClick={openPostCode}>우편번호 검색</button>
                                <div id='popupDom'>
                                    {isPopupOpen && (
                                        <PopupDom>
                                            <PopupPostCode onClose={closePostCode}
                                            onAddData={onAddData} />
                                        </PopupDom>
                                    )}
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <button type='submit'>등록</button>
                                    <button type='reset'>취소</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    );
};

export default JoinPage;