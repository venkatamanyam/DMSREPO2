import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './DepartmentDocument.css';

function DepartmentDocument() {
    const [records, setRecords] = useState([]);

    const { dept } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    })

    const fetchData = () => {
        axios.get(`http://localhost:8082/doc/data/get/part/data/${dept}`).then(res => {
            setRecords(res.data);
        }).catch(err => {
            alert(err);
        })
    }

    const downloadFile = (docTitle) => {
        axios
            .get(`http://localhost:8082/doc/data/open/file/${docTitle}`, { responseType: 'arraybuffer' })
            .then((res) => {
                const contentType = res.headers['content-type'];
                const blob = new Blob([res.data], { type: contentType });
                if (contentType.includes('pdf') || contentType.includes('zip')) {
                    // For PDF files, create a PDF Blob and use it in embed tag
                    const pdfUrl = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pdfUrl;
                    downloadLink.download = docTitle; // Specify the desired filename
                    downloadLink.click();
                }                
                else if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) {
                    // For JPEG images, display them directly in the browser
                    const imageUrl = URL.createObjectURL(blob);
                    const downloadLink = document.createElement('a');
                    downloadLink.href = imageUrl;
                    downloadLink.download = docTitle; // Specify the desired filename
                    downloadLink.click();
                } else {
                    // Handle other types of files if needed
                    alert('Unsupported file format');
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

    const backPage = () =>{
        navigate('/docmeta');
    }

    const deleteFile = (docTitle) =>{
        return axios.delete(`http://localhost:8082/doc/data/del/file/${docTitle}`).then(res=>{
            alert(res.data);
        }).catch(err=>{
            alert(err);
        })
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
                        <th>Logo</th>
                        <th>User ID</th>
                        <th>Document Name</th>
                        <th>Download</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((names, index) =>
                        <tr key={index}>
                            <td>abc</td>
                            <td>{names.userID}</td>
                            <td>{names.docTitle}</td>
                            <td><button className='dwd-btn' onClick={() => downloadFile(names.docTitle)}>download</button></td>
                            <td><button className='del-btn' onClick={()=>deleteFile(names.docTitle)}>delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DepartmentDocument