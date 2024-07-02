import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [versionUat, setVersionUat] = useState<string>('');
  const [versionProd, setVersionProd] = useState<string>('');
  const [versionUatMmfix, setVersionUatMmfix] = useState<string>('');
  const [versionProdMmfix, setVersionProdMmfix] = useState<string>('');

  useEffect(() => {
    fetchDbcoreDataUat();
    fetchDbcoreDataProd();
    fetchMmfixedoddsDataUat();
    fetchMmfixedoddsDataProd();

  }, []);

  const fetchDbcoreDataUat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dbcore');
      setVersionUat(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching DBCORE data:', error);
    }
  };
  const fetchDbcoreDataProd = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/dbcore');
      setVersionProd(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching DBCORE data:', error);
    }
  };

  const fetchMmfixedoddsDataUat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mmfixedodds');
      setVersionUatMmfix(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMFIXEDODDS data:', error);
    }
  };

  const fetchMmfixedoddsDataProd = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/mmfixedodds');
      setVersionProdMmfix(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMFIXEDODDS data:', error);
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
            <tr>
              <th>MMFIXEDODDS Version:</th>
              <td>{versionUatMmfix}</td>
              <td>{versionProdMmfix}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DbcoreComponent;
