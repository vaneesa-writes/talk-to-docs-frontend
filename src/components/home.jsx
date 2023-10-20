// DocumentUpload.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import talktodoc from './utils/requests';


function DocumentUpload({onDocumentUpload,docName}) {
  const [document, setDocument] = useState(null);
  const navigate = useNavigate();

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    setDocument(file);
    onDocumentUpload( e.target.files[0].name)
  };

  const handleUpload = async () => {
    console.log("document uploaded")
    
    if(await talktodoc.doctrain(docName,document)){
      navigate("/chat");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-4">Upload Your Document</h1>
      <input
        type="file"
        accept=".pdf, .docx"
        onChange={handleDocumentUpload}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleUpload}
      >
        Upload
      </button>
    </div>
  );
}

export default DocumentUpload;
