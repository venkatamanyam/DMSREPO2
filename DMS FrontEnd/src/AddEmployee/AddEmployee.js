import { useNavigate } from 'react-router-dom';
import './AddEmployee.css';
import { useState } from 'react';
import axios from 'axios';

function AddEmployee() {
    const [uName, setUName] = useState('');
    const [auth, setAuth] = useState('');
    const [userGroup, setUserGroup] = useState('');
    const [userOrg, setUserOrg] = useState('');
    const [loc, setLoc] = useState('');

    const navigate = useNavigate();

    const backFunc = () =>{
        navigate('/docmeta');
    }

    const onChangeAUthority = (event) =>{
        setAuth(event.target.value);
    }

    const onChangeName =(event) =>{
        setUName(event.target.value);
    }

    const onChangeUserGroup = (event) => {
        setUserGroup(event.target.value);
    }

    const onChangeUserOrg = (event) => {
        setUserOrg(event.target.value);
    }

    const onChangeLocation = (event) => {
        setLoc(event.target.value);
    }


    const RegisterEmp=(e)=>{
        e.preventDefault();

        let data = {
            userName:uName,
            authority:auth,
            userGroup:userGroup,
            userOrg:userOrg,
            location:loc
        }

        axios.post('http://localhost:8082/emp/data/add',data).then(res=>{
            alert(res.data);
            setUName('');
            setAuth('');
            setUserGroup('');
            setUserOrg('');
            setLoc('');
        }).catch(err=>{
            alert(err);
        })
    }

    return (
        <div>
            <nav className='emp-nav'>
                <h1 className='emp-nav-head'>Employee Registration</h1>
                <button className='emp-back-btn' onClick={backFunc}>Back</button>
            </nav>
            <form className='Employee-Regsiter-Form'>
                <h1>Register</h1>
                <div className='texts'>
                    <label>UserName</label>
                    <input type='text' value={uName} onChange={onChangeName} placeholder='User Name' />
                </div>
                <div className='texts'>
                    <label>Authority</label>
                    <select value={auth} onChange={onChangeAUthority}>
                        <option value="">select an option</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="USER">USER</option>
                    </select>
                </div>
                <div className='texts'>
                    <label>User Group</label>
                    <select value={userGroup} onChange={onChangeUserGroup}>
                        <option value="">Select an option</option>
                        <option value="hr">HR</option>
                        <option value="dev">DEV</option>
                        <option value="sup">SUP</option>
                        <option value="testing">TESTING</option>
                    </select>
                </div>

                <div className='texts'>
                    <label>User Organization</label>
                    <select value={userOrg} onChange={onChangeUserOrg}>
                        <option value="">Select an Option</option>
                        <option value="cms.hr.payroll">CMS.HR.PAYROLL</option>
                        <option value="cms.dev.payroll">CMS.DEV.PAYROLL</option>
                        <option value="cms.sup.payroll">CMS.SUP.PAYROLL</option>
                        <option value="cms.testing.payroll">CMS.TESTING.PAYROLL</option>
                    </select>
                </div>

                <div className='texts'>
                    <label>User Location</label>
                    <select value={loc} onChange={onChangeLocation}>
                        <option value="">Select an Option</option>
                        <option value="india.delhi">INDIA.DELHI</option>
                        <option value="india.karnataka.bengaluru">INDIA.KARNATAKA.BENGALURU</option>
                        <option value="india.kolkata">INDIA.KOLKATA</option>
                        <option value="india.telangana.hyderabad">INDIA.TELANGANA.HYDERABAD</option>
                    </select>
                </div>
                <button className='reg-btn' onClick={RegisterEmp}>Register</button>
            </form>
        </div>
    )
}

export default AddEmployee;