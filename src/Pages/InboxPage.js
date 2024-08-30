import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa';

const InboxPage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from API
    axios.get('https://teemahlwitty.pythonanywhere.com/api/contactmessages/')
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the messages!', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this message!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        axios.delete(`https://teemahlwitty.pythonanywhere.com/api/contactmessages/${id}/`)
          .then(() => {
            setMessages(messages.filter(message => message.id !== id));
            Swal.fire(
              'Deleted!',
              'The message has been deleted.',
              'success'
            );
          })
          .catch(error => {
            console.error('There was an error deleting the message!', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the message.',
              'error'
            );
          });
      }
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 mt-20 container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Inbox</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          {messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages to display</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 table-auto">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">S/N</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map((message, index) => (
                    <tr key={message.id}>
                      <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{message.name}</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{message.email}</td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{message.subject}</td>
                      <td className="px-6 py-4 text-justify whitespace-normal text-sm text-gray-500">{message.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
