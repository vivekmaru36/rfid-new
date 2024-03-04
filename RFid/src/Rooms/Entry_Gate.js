import React, { useState, useEffect } from 'react';

const EntryGate = () => {
  const [rfidNumber, setRfidNumber] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [userIP, setUserIP] = useState('');

  useEffect(() => {
    // Check if the RFID number is 10 digits and send it
    if (rfidNumber.length === 10 && userLocation && userIP) {
      sendRfidNumberWithLocationAndIP(rfidNumber, userLocation, userIP); // Replace with your actual function to send the number
      setRfidNumber(''); // Reset the RFID number after sending
    }
  }, [rfidNumber, userLocation, userIP]);

  const sendRfidNumberWithLocationAndIP = async (rfidNumber, userLocation, userIP) => {
    try {

      // Make an HTTP POST request to the /hrfid endpoint with the RFID number, location, and IP data
      const response = await fetch('http://localhost:3500/HardwareRoom/EntryGate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rfid: rfidNumber, geoLocation: `${userLocation?.latitude},${userLocation?.longitude}` , Ip: userIP , ucurrentTime: new Date().toISOString() }),
      });

      if (response.ok) {
        console.log('RFID number sent successfully From Entry Gate');
        // Optionally, you can handle success actions here
      } else {
        console.error('Failed to send RFID number From Entry Gate');
        // Optionally, you can handle error actions here
      }
    } catch (error) {
      console.error('Error sending RFID number : ', error);
      // Optionally, you can handle error actions here
    }
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        error => {
          console.error('Error getting user location:', error);
          setUserLocation(null);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setUserLocation(null);
    }
  };

  const fetchUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setUserIP(data.ip);
    } catch (error) {
      console.error('Error fetching user IP:', error);
      setUserIP('');
    }
  };

  useEffect(() => {
    handleLocation(); // Fetch user location when component mounts
    fetchUserIP(); // Fetch user IP when component mounts
  }, []);

  return (
    <div>
      <h2>RFID Form For Entry Gate</h2>
      <input
        type="text"
        value={rfidNumber}
        onChange={(e) => setRfidNumber(e.target.value)}
        placeholder="Swipe RFID card..."
        autoFocus
      />
      <p>Current RFID Number: {rfidNumber}</p>
      {userLocation && (
        <p>
          User Location: Latitude - {userLocation.latitude}, Longitude - {userLocation.longitude}
        </p>
      )}
      {userIP && (
        <p>User IP Address: {userIP}</p>
      )}
    </div>
  );
};

export default EntryGate;