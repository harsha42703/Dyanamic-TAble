import React, { useState, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CodeViewComponent = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [questionDetails, setQuestionDetails] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCodeAndDetails = async () => {
      try {
        const response = await axios.get(`https://dynamic-table-hzhj.onrender.com/api/questions/${id}`);
        setCode(response.data.code);
        setQuestionDetails(response.data.question);
      } catch (error) {
        console.error('Error fetching code', error);
      }
    };

    if (id) {
      fetchCodeAndDetails();
    }
  }, [id]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="flex flex-col w-screen md:flex-row h-screen p-6">
      <ResizableBox
        width={600}
        height={Infinity}
        minConstraints={[300, Infinity]}
        maxConstraints={[800, Infinity]}
        axis="x"
      >
        <div className="bg-gray-100 p-4 h-full overflow-auto custom-scrollbar">
          <h2 className="text-xl font-bold mb-4">Question Details</h2>
          <p>{questionDetails}</p>
        </div>
      </ResizableBox>
      <div className="flex-1 bg-gray-900 p-4 overflow-auto custom-scrollbar">
        <h2 className="text-xl font-bold text-white mb-4">Code</h2>
        <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
          <button
            className={`mb-4 p-2 rounded shadow-md ${copied ? 'bg-green-500' : 'bg-blue-500'} text-white hover:${copied ? 'bg-green-600' : 'bg-blue-600'}`}
          >
            {copied ? 'Copied!' : 'Copy Code'}
          </button>
        </CopyToClipboard>
        <div className="overflow-x-auto">
          <SyntaxHighlighter language="python" style={dracula}>
            {code}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

export default CodeViewComponent;
