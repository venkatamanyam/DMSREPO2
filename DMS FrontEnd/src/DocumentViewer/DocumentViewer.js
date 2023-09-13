import { useEffect, useState } from 'react';
import './DocumentViewer.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function DocumentViewer() {
    const [fileUrl, setFileUrl] = useState('');

    const navigate = useNavigate();

    const { item } = useParams();

    useEffect(() => {
        const showFile = () => {
            axios
                .get(`http://localhost:8082/doc/data/open/file/${item}`, { responseType: 'arraybuffer' })
                .then((res) => {
                    const contentType = res.headers['content-type'];
                    const blob = new Blob([res.data], { type: contentType });
                    if (contentType.includes('pdf')) {
                        // For PDF files, create a PDF Blob and use it in embed tag
                        const pdfUrl = URL.createObjectURL(blob);
                        setFileUrl(pdfUrl);
                    } else if (contentType.includes('image/jpeg') || contentType.includes('image/jpg')) {
                        // For JPEG images, display them directly in the browser
                        const imageUrl = URL.createObjectURL(blob);
                        setFileUrl(imageUrl);
                    } else {
                        // Handle other types of files if needed
                        alert('Unsupported file format');
                    }
                })
                .catch((err) => {
                    alert(err);
                });
        }

        showFile();

    }, [item])

    const backPage = () => {
        navigate(`/doc-tag-viewer/${sessionStorage.getItem('tag')}`);
    }

    return (
        <div>
            <nav className='dept_doc_nav'>
                <h1>Documents</h1>
                <button onClick={backPage} className='back_btn'>Back</button>
            </nav>

            <div style={{ textAlign: 'center' }}>
                <h1>Documents</h1>
                {
                    <embed className='docs' src={fileUrl} width="840" height="400" />
                }
                <div className='space'></div>
            </div>
        </div>
    )
}

export default DocumentViewer;