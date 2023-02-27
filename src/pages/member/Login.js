import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title';
import { API_URL } from '../../config/aplurl';
import { getToHome, setLogin } from '../../modules/logincheck';
import { setCookie } from '../../util/cookie';

const Login = () => {
    //input입력값 상태관리
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ loginDate,setLoginDate ] =useState({
        useremail:"",
        userpass:""
    })
    const onChange = (e) =>{
        const { name , value } =e.target;
        setLoginDate({
            ...loginDate,
            [name]:value
        })
    }
    const onSubmit = (e) =>{ 
        //form 전송이벤트 제거
        e.preventDefault();
        //input에 입력 되었는지 확인
        if(loginDate.useremail === '' ||loginDate.userpass === ''){
            alert("이메일과 비밀번호를 입력해주세요.");
        }else{
            axios.post(`${API_URL}/login`, loginDate)
            .then(result => {
                const { m_email, m_nickname} = result.data[0];
                if(m_email && m_nickname){
                    alert("로그인 되었습니다.");
                    //현재시간 객체 생성
                    let expires = new Date();
                    //60분을 더한 값으로 변경
                    expires.setMinutes(expires.getMinutes()+60);
                    //쿠키 생성
                    setCookie('useremail', `${m_email}` , {path : '/', expires});
                    setCookie('username', `${m_nickname}` , {path : '/', expires});
                    dispatch(setLogin());
                    dispatch(getToHome(navigate));
                }
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
    return (
        <div className='inner' id='login'>
            <Title title="Login"/>
            <form onSubmit={onSubmit}>
                <table className='defaulttable small'>
                    <tbody>
                        <tr>
                            <td>아이디(이메일주소)</td>
                            <td><input type="text" name="useremail" value={loginDate.useremail} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="userpass" value={loginDate.userpass} onChange={onChange}/></td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button type='submit'>로그인</button>
                                <button>회원가입</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <Link to="/findid"><span>아이디찾기</span></Link> 
                                <Link to="/findpass"><span>비밀번호찾기</span></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};
//
export default Login;