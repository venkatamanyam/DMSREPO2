import React, { useState } from 'react';
import './ForgetPassword.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {

    const [otp, setOtp] = useState(0);
    const [uid, setUid] = useState('');
    const [otpValue, setOtpValue] = useState(0);
    const [otpField, setOtpField] = useState(true);
    const [pwdField, setPwdField] = useState(false);
    const [newPass, setNewPass] = useState('');

    const navigate = useNavigate();

    const forgetPassword = (e) => {
        e.preventDefault();

        var userID = uid;

        if (userID === "" ) {
            alert("Enter user ID for OTP");
        }
        else {
            return axios.post(`http://localhost:8082/emp/data/change/pwd/otp/${userID}`).then(res => {
                if (res.data !== "" && res.data !== null) {
                    alert("OTP Sent Successfully");
                    setOtpValue(res.data);
                    setOtpField(false);
                }
                else {
                    alert("employee not found");
                }
            }).catch(err => {
                alert(err);
            })
        }
    }

    const OTPVerify = () => {

        if (otp === otpValue) {
            setOtpValue(0);
            setOtp(0);
            setPwdField(true);
        }
        else {
            alert("OTP not matched");
        }
    }

    const onChangeOTP = (event) => {
        setOtp(Number(event.target.value));
    }

    const onChangeUid = (event) => {
        setUid(event.target.value);
    }

    const onChangeNewPassword = (event) => {
        setNewPass(event.target.value);
    }

    const resetPassword = (value) => {
        let data = {
            userID: uid,
            password: value
        }

        return axios.put('http://localhost:8082/emp/data/pwd/req/chng', data).then(res => {
            alert(res.data);
            setOtpField(true);
            setPwdField(false);
            setUid('');
            setNewPass('');
            navigate('/');
        }).catch(err => {
            alert(err);
        })

    }

    const backPage = () => {
        sessionStorage.removeItem('tag');
        navigate('/');
    }

    return (
        <div>
            <nav className='log-nav'>
                <h1 className='nav-head'>DOCUMENT MANAGEMENT SYSTEM</h1>
                <button onClick={backPage} className='back_btn'>Back</button>
            </nav>

            {otpField ?
                <form className='fgt-form'>
                    <div className='textss'>
                        <label>User ID</label>
                        <input type='text' value={uid} onChange={onChangeUid} placeholder='Enter User ID' />
                    </div>
                    <button onClick={forgetPassword}>Get OTP</button>
                </form>
                :
                <form className='fgt-form'>
                    <div className='textss'>
                        <label>User ID</label>
                        <input disabled type='text' value={uid} onChange={onChangeUid} placeholder='Enter User ID' />
                    </div>
                    <button disabled onClick={forgetPassword}>Get OTP</button>
                </form>
            }

            {otpValue ?
                <form className='fgt-form'>
                    <div className='textss'>
                        <label>Enter OTP</label>
                        <input value={otp} onChange={onChangeOTP} type='number' />
                    </div>
                    <button onClick={() => OTPVerify()}>Submit</button>
                </form>
                :
                <form className='fgt-form'>
                    <div className='textss'>
                        <label>Enter OTP</label>
                        <input disabled value={otp} onChange={onChangeOTP} type='number' />
                    </div>
                    <button disabled onClick={() => OTPVerify()}>Submit</button>
                </form>
            }

            {
                pwdField ?
                    <form className='fgt-form'>
                        <div className='textss'>
                            <label>Enter New Password</label>
                            <input value={newPass} onChange={onChangeNewPassword} type='text' />
                        </div>
                        <button onClick={() => resetPassword(newPass)}>Submit</button>
                    </form>
                    :
                    <form className='fgt-form'>
                        <div className='textss'>
                            <label>Enter New Password</label>
                            <input disabled value={newPass} onChange={onChangeNewPassword} type='text' />
                        </div>
                        <button disabled onClick={() => resetPassword(newPass)}>Submit</button>
                    </form>
            }

        </div>
    )
}

export default ForgetPassword;