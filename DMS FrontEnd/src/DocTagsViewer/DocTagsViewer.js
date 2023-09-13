import React, { useEffect, useState } from 'react';
import './DocTagsViewer.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function DocTagsViewer() {

    const [records, setRecords] = useState([]);
    const navigate = useNavigate();

    const { tag } = useParams();

    const backPage = () => {
        sessionStorage.removeItem('tag');
        navigate('/docmeta');
    }

    useEffect(() => {
        sessionStorage.setItem('tag',tag);
        const getDocDetails = () => {
            axios.get(`http://localhost:8082/doc/data/get/docs/details/${tag}`).then(resp => {
                setRecords(resp.data);
            }).catch(err => {
                alert(err);
            })
        }

        getDocDetails();
    },[tag]);

    const readFile = (docTitle) => {
        navigate(`/doc-viewer/${docTitle}`);
    }


    return (
        <div>
            <nav className='dept_doc_nav'>
                <h1>Documents</h1>
                <button onClick={backPage} className='back_btn'>Back</button>
            </nav>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Document ID</th>
                        <th>Document Title</th>
                        <th>User Id</th>
                        <th>Location</th>
                        <th>User Group</th>
                        <th>Read</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((names, index) =>
                        <tr key={index}>
                            <td>{names.docID}</td>
                            <td>{names.docTitle}</td>
                            <td>{names.userID}</td>
                            <td>{names.location}</td>
                            <td>{names.userGroup}</td>
                            <td><button className='opn-file' onClick={()=>readFile(names.docTitle)}>Open File</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DocTagsViewer;