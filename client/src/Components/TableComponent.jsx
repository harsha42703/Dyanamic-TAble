import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dracula } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const TableComponent = () => {
  const [data, setData] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newLevel, setNewLevel] = useState('Medium');
  const [editMode, setEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [editQuestion, setEditQuestion] = useState('');
  const [editCode, setEditCode] = useState('');
  const [editLevel, setEditLevel] = useState('Medium');

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://dynamic-table-hzhj.onrender.com/api/questions');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleAdd = async () => {
    if (!newQuestion.trim()) {
      alert('Question is required');
      return;
    }
    try {
      const response = await axios.post('https://dynamic-table-hzhj.onrender.com/api/questions', {
        question: newQuestion,
        code: newCode || '// Your code here',
        level: newLevel,
      });
      setData([...data, response.data]);
      setNewQuestion('');
      setNewCode('');
      setNewLevel('Medium');
    } catch (error) {
      console.error('Error adding question', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    try {
      await axios.delete(`https://dynamic-table-hzhj.onrender.com/api/questions/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting question', error);
    }
  };

  const handleEditClick = (item) => {
    setEditMode(true);
    setCurrentEditId(item._id);
    setEditQuestion(item.question);
    setEditCode(item.code);
    setEditLevel(item.level);
  };

  const handleEditSave = async () => {
    if (!editQuestion.trim()) {
      alert('Question is required');
      return;
    }
    try {
      const response = await axios.put(`https://dynamic-table-hzhj.onrender.com/api/questions/${currentEditId}`, {
        question: editQuestion,
        code: editCode || '// Your code here',
        level: editLevel,
      });
      const updatedData = data.map((item) =>
        item._id === currentEditId ? response.data : item
      );
      setData(updatedData);
      setEditMode(false);
      setCurrentEditId(null);
      setEditQuestion('');
      setEditCode('');
      setEditLevel('Medium');
    } catch (error) {
      console.error('Error editing question', error);
    }
  };

  const handleViewCode = (item) => {
    navigate(`/view-code/${item._id}`); // Use navigate instead of history.push
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-bold text-purple-600 mb-4">Accenture Questions Table</h2>
      <div className="mb-4 flex justify-between items-center">
        <textarea
          type="text"
          placeholder="New Question"
          value={editMode ? editQuestion : newQuestion}
          onChange={(e) => editMode ? setEditQuestion(e.target.value) : setNewQuestion(e.target.value)}
          className="mr-2 p-2 border rounded w-full max-w-md bg-white shadow-sm"
          rows={4}
        />
        <textarea
          placeholder="New Code"
          value={editMode ? editCode : newCode}
          onChange={(e) => editMode ? setEditCode(e.target.value) : setNewCode(e.target.value)}
          className="mr-2 p-2 border rounded w-full max-w-md bg-white shadow-sm"
          rows={4}
        />
        <select
          value={editMode ? editLevel : newLevel}
          onChange={(e) => editMode ? setEditLevel(e.target.value) : setNewLevel(e.target.value)}
          className="py-6 px-8 left-align border rounded bg-white shadow-sm">
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        {editMode ? (
          <button onClick={handleEditSave} className="ml-2 bg-yellow-500 text-white p-2 rounded shadow-md">
            Save
          </button>
        ) : (
          <button onClick={handleAdd} className="ml-2 bg-sky-500 text-white p-2 rounded shadow-md">
            Add
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 rounded shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 border-b">Question</th>
              <th className="p-4 border-b">Code</th>
              <th className="p-4 border-b">Level</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="p-4 border-b">
                  <div className="overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.question}
                  </div>
                </td>
                <td className="p-4 border-b text-white rounded-lg">
                  <button
                    onClick={() => handleViewCode(item)}
                    className="bg-blue-500 text-white p-2 rounded shadow-md">
                    View Code
                  </button>
                </td>
                <td className="p-4 border-b">{item.level}</td>
                <td className="p-4 border-b flex">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="mr-2 bg-yellow-500 text-white p-2 rounded shadow-md">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white p-2 rounded shadow-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
