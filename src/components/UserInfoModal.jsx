import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../assets/userInfoModal.css';

const UserInfoModal = ({ userId, isOpen, onRequestClose, onSave }) => {
  const [userInfo, setUserInfo] = useState({
    first_name: '',
    last_name: '',
    personal_email: '',
    role: '',
    city: '',
    phone: '',
    timezone: '',
  });

  useEffect(() => {
    if (isOpen) {
      fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(data => setUserInfo(data))
        .catch(error => console.error('Error fetching user info:', error));
    }
  }, [isOpen, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('User info updated:', data);
        onSave();
        onRequestClose();
      })
      .catch(error => console.error('Error updating user info:', error));
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="User Info">
      <div className="user-info-modal">
        <h2>Update User Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="first_name">First Name</label>
            <input 
              type="text" 
              name="first_name" 
              value={userInfo.first_name} 
              onChange={handleChange} 
              placeholder="First Name" 
            />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label>
            <input 
              type="text" 
              name="last_name" 
              value={userInfo.last_name} 
              onChange={handleChange} 
              placeholder="Last Name" 
            />
          </div>
          <div>
            <label htmlFor="personal_email">Personal Email</label>
            <input 
              type="email" 
              name="personal_email" 
              value={userInfo.personal_email} 
              onChange={handleChange} 
              placeholder="Personal Email" 
              disabled 
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <input 
              type="text" 
              name="role" 
              value={userInfo.role} 
              onChange={handleChange} 
              placeholder="Role" 
              disabled 
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input 
              type="text" 
              name="city" 
              value={userInfo.city} 
              onChange={handleChange} 
              placeholder="City" 
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input 
              type="text" 
              name="phone" 
              value={userInfo.phone} 
              onChange={handleChange} 
              placeholder="Phone" 
            />
          </div>
          <div>
            <label htmlFor="timezone">Timezone</label>
            <input 
              type="text" 
              name="timezone" 
              value={userInfo.timezone} 
              onChange={handleChange} 
              placeholder="Timezone" 
            />
          </div>
          <button type="submit">Update User Info</button>
          <button type="button" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
