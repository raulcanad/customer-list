import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [versionUat, setVersion] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setVersion(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const [versionProd, setVersionProd] = useState<string>('');

  useEffect(() => {
    fetchDataDos();
  }, []);

  const fetchDataDos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/data');
      setVersionProd(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dbcore-component">
      <div className="dbcore-component-content">
        <table className="data-table">
          <caption className='caption'>SCHEME-DB-VERSION</caption>
          <tbody>
            <tr>
              <th></th>
              <th>UAT</th>
              <th>PROD</th>
            </tr>
            <tr>
              <th>DBCORE Version:</th>
              <td>{versionUat}</td>
              <td>{versionProd}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DbcoreComponent;
