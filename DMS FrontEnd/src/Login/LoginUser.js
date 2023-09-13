import React, { useState } from 'react'
import './LoginUser.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginUser() {
    const [userid, setUserid] = useState('');
    const [pass, setpass] = useState('');
    const [disableLogin, setDisableLogin] = useState(true);

    const navigate = useNavigate();

    const updateDisableLogin = (newUserid, newPass) => {
        setDisableLogin(newUserid === '' || newPass === '');
    };

    const onChangeUserid = (event) => {
        setUserid(event.target.value);
        updateDisableLogin(event.target.value, pass);
    }

    const onChangePassword = (event) => {
        setpass(event.target.value);
        updateDisableLogin(userid, event.target.value);
    }

    const loginUser = (e) => {
        e.preventDefault();

        let data = {
            userID: userid,
            password: pass
        }

        return axios.post('http://localhost:8082/emp/data/login', data).then(res => {
            if (res.data) {
                sessionStorage.setItem('userid', data.userID);
                navigate('/docmeta');
            }
            else {
                alert("username or password is not valid");
            }

        }).catch(err => {
            alert("username or password is not valid");
        })
    }

    const forgetPassword = () => {
        navigate('/fgt-pwd');
    }

    return (
        <div className='login-page'>
            <nav className='log-nav'>
                <h1 className='nav-head'>DOCUMENT MANAGEMENT SYSTEM</h1>
            </nav>

            <form className='login-form'>

                <h1>LOGIN</h1>

                <div className='text'>
                    <label>User ID</label>
                    <input type='text' value={userid} onChange={onChangeUserid} placeholder='Enter User ID' />
                </div>

                <div className='text'>
                    <label>Password</label>
                    <input type='password' value={pass} onChange={onChangePassword} placeholder='Enter Password' />
                </div>

                <div className='text'>
                    <button disabled={disableLogin} className='log-btn' onClick={loginUser}>Login</button>
                    <button className='fgt-pswd' onClick={forgetPassword}>forget password?</button>
                </div>

            </form>

        </div>
    )
}

export default LoginUser;