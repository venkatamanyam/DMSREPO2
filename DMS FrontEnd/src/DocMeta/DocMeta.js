import { useEffect, useRef, useState } from 'react';
import './DocMeta.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DocMeta() {

    const [userGroup, setUserGroup] = useState('');
    const [userOrg, setUserOrg] = useState('');
    const [loc, setLoc] = useState('');
    const [file, setFile] = useState(null);
    const [search, setSearch] = useState('');
    const [res, setRes] = useState([]);
    const [uName, setUName] = useState('');
    const [docTags, setDocTags] = useState('');
    const [isApiCallEnabled, setIsApiCallEnabled] = useState(false);

    const hr = 'hr';
    const dev = 'dev';
    const sup = 'sup';
    const testing = 'testing';

    const [role, setRole] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
    })

    const fileInputRef = useRef(null);

    // to get the user id
    var uid = sessionStorage.getItem('userid');


    const onChangeFile = (event) => {
        setFile(event.target.files[0]);
    }

    const onChangeSearch = (event) => {
        setSearch(event.target.value);
    }

    const onChangeDocTags = (event) => {
        const selectedValue = event.target.value;
        setDocTags(selectedValue);
        setIsApiCallEnabled(selectedValue !== '');
    }

    const isAllowedFile = (fileName) => {
        const allowedExtensions = ['jpg', 'jpeg', 'pdf', 'zip'];
        const fileExtension = fileName.split('.').pop().toLowerCase();
        return allowedExtensions.includes(fileExtension);
    }

    const uploadData = (e) => {
        e.preventDefault();

        let data = {
            userID: uid,
            userGroup: userGroup,
            userOrg: userOrg,
            location: loc,
            docTags: docTags
        }

        let formData = new FormData();

        if (file) {
            if (isAllowedFile(file.name)) {
                if (isApiCallEnabled) {
                    formData.append('file', file);
                    return axios.post('http://localhost:8082/doc/data/add', data)
                        .then(res => {
                            // alert("1");
                            var id = res.data.id;
                            formData.append('id', id);

                            axios.put('http://localhost:8082/doc/data/file/add', formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            }).then(res => {
                                // alert("2");
                                alert(res.data);
                                setFile(null);
                                setDocTags('');
                                fileInputRef.current.value = '';
                            }).catch(err => {
                                // alert("3");
                                alert(err.response.data);
                            })

                        }).catch(err => {
                            // alert("4");
                            alert(err.response.data);
                        })
                }
                else {
                    alert("Tags cannot be empty");
                }
            }
            else {
                alert("only jpg, jpeg, zip and pdf files are allowed");
            }

        }
        else {
            alert("empty files not allowed");
        }

    }

    const logout = () => {
        sessionStorage.removeItem('userid');
        navigate('/');
    }

    const getUserDetails = () => {
        axios.get(`http://localhost:8082/emp/data/get/emp/${uid}`).then(res => {
            if (res.data.authority === 'ADMIN') {
                setRole(true);
                setUserGroup(res.data.userGroup);
                setUserOrg(res.data.userOrg);
                setLoc(res.data.location);
                setUName(res.data.userName);
            }
            else {
                setUserGroup(res.data.userGroup);
                setUserOrg(res.data.userOrg);
                setLoc(res.data.location);
                setUName(res.data.userName);
            }
        }).catch(err => {
            alert(err);
        })
    }

    const addEmp = () => {
        navigate('/Add-Emp');
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search) {
            setRes([]);
            return null;
        }
        else {
            axios.get(`http://localhost:8082/doc/data/search/file/${search}`).then(resp => {
                setRes(resp.data);
            }).catch(err => {
                alert(err);
            })
        }
    }

    const openFile = (item) => {
        navigate(`/doc-tag-viewer/${item}`);
    }

    const particularFile = (dept) => {
        navigate(`/dept-doc/${dept}`);
    }

    return (
        <div>
            <div className="nav-bar">
                <h1 className='doc-head'>UPLOAD FILE</h1>

                {role ?
                    <div className="search-container">
                        <input value={search} close onChange={onChangeSearch} onKeyUp={handleSearch} className='search-bar' type='text' placeholder='search here' />
                        {res.length > 0 && (
                            <ul className="suggestions-list">
                                {res.map((item, index) => (
                                    <li onClick={() => openFile(item)} key={index}>{item}</li>
                                ))}
                            </ul>
                        )}
                        <button onClick={handleSearch} className='search-btn'>search</button>
                    </div> : null
                }

                <h3 className='userid'>{uName.toUpperCase()}</h3>
            </div>
            <button className='logout-btn' onClick={logout}>Logout</button>
            {role ? <button className='add-emp-btn' onClick={addEmp}>Add Employee</button> : null}
            <form className='doc-meta-form'>
                <h1>Document Form</h1>

                <div className='text'>
                    <label>User ID</label>
                    <span>:</span>
                    <input type='text' value={uid} disabled placeholder='Enter User ID' />
                </div>

                <div className='text'>
                    <label>User Group</label>
                    <span>:</span>
                    <input value={userGroup} disabled />
                </div>

                <div className='text'>
                    <label>User Organization</label>
                    <span>:</span>
                    <input value={userOrg} disabled />
                </div>

                <div className='text'>
                    <label>User Location</label>
                    <span>:</span>
                    <input value={loc} disabled />
                </div>

                <div className='text'>
                    <label>Document Tags</label>
                    <span>:</span>
                    <select value={docTags} onChange={onChangeDocTags}>
                        <option value="">Select an option</option>
                        <option value="AADHAR,ID PROOF">AADHAR</option>
                        <option value="PAN, ID PROOF">PAN</option>
                        <option value="TRAVEL, BILLS">TRAVEL ALLOWANCES</option>
                        <option value="RELOCATION, BILLS">RELOCATION BILL</option>
                    </select>
                </div>

                <div className='text'>
                    <label>File</label>
                    <span>:</span>
                    <div className="file-input-wrapper">
                        <input type='file' ref={fileInputRef} onChange={onChangeFile} />
                    </div>
                </div>

                <button className='sub-btn' onClick={uploadData}>Submit</button>

            </form>

            {role ?
                <div>
                    <button onClick={() => particularFile(hr)}>HR Docs</button>
                    <button onClick={() => particularFile(dev)}>Development</button>
                    <button onClick={() => particularFile(sup)}>Support</button>
                    <button onClick={() => particularFile(testing)}>Testing</button>
                </div> : null
            }
        </div>
    )
}

export default DocMeta;