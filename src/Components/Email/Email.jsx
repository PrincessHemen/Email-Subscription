import React, { useState } from 'react';
import './Email.css';
import send_icon from '../Assets/send-mail.png';

const Email = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to Google Sheet using Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwaEx5lwaRR_KcdadbTz_AniLVyWJcTETpkUVTiuBYqFuFsTfB7pPw_nVVEnlXw1-oa7w/exec';
    const formData = new FormData(); 
    formData.append('email', email);

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSubmitted(true);
        console.log('Data successfully sent to Google Sheet');
        setTimeout(() => {
          setSubmitted(false);
          setEmail(''); // Resetting the email input field
        }, 5000); // 5000 milliseconds = 5 seconds
      } else {
        console.error('Failed to send data to Google Sheet');  
      }
      
      
    } catch (error) {
      console.error('Error sending data to Google Sheet:', error);
    }
  };

  return (
    <div className="hero">
      <h3>Coming Soon</h3>
      <h1>
        <span>Doosh Inc.</span> <br /> Our Brand New Website is on its Way!
      </h1>
      <p>Subscribe for More Details</p>
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <input
            type="email"
            name="email"
            placeholder="Your email id..." 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">
            {' '}
            <img src={send_icon} alt="send message icon" />
          </button>
        </div>
      </form>
      {submitted && <p className="thanks">Thank You for Subscribing!</p>}
    </div>
  )
}

export default Email;
