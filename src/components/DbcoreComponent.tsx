import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [versionUat, setVersionUat] = useState<string>('');
  const [versionProd, setVersionProd] = useState<string>('');
  const [versionUatMmfix, setVersionUatMmfix] = useState<string>('');
  const [versionProdMmfix, setVersionProdMmfix] = useState<string>('');
  const [versionUatMmtex, setVersionUatMmtex] = useState<string>('');
  const [versionProdMmtex, setVersionProdMmtex] = useState<string>('');
  const [versionUatMmfowarp, setVersionUatMmfowarp] = useState<string>('');
  const [versionProdMmfowarp, setVersionProdMmfowarp] = useState<string>('');
  const [versionUatMm, setVersionUatMm] = useState<string>('');
  const [versionProdMm, setVersionProdMm] = useState<string>('');
  useEffect(() => {
    fetchDbcoreDataUat();
    fetchDbcoreDataProd();
    fetchMmfixedoddsDataUat();
    fetchMmfixedoddsDataProd();
    fetchMmtexasDataUat();
    fetchMmtexasDataProd();
    fetchMmfowarpDataUat();
    fetchMmfowarpDataProd();
    fetchMmDataUat();
    fetchMmDataProd();

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

  const fetchMmtexasDataUat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mmtexas');
      setVersionUatMmtex(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMTEXAS data:', error);
    }
  };

  const fetchMmtexasDataProd = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/mmtexas');
      setVersionProdMmtex(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMTEXAS data:', error);
    }
  };

  const fetchMmfowarpDataUat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mmfowarp');
      setVersionUatMmfowarp(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMFOWARP data:', error);
    }
  };

  const fetchMmfowarpDataProd = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/mmfowarp');
      setVersionProdMmfowarp(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MMFOWARP data:', error);
    }
  };

  const fetchMmDataUat = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/mm');
      setVersionUatMm(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MM data:', error);
    }
  };

  const fetchMmDataProd = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/mm');
      setVersionProdMm(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching MM data:', error);
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
            <tr>
              <th>MMTEXAS Version:</th>
              <td>{versionUatMmtex}</td>
              <td>{versionProdMmtex}</td>
            </tr>
            <tr>
              <th>MMFOWARP Version:</th>
              <td>{versionUatMmfowarp}</td>
              <td>{versionProdMmfowarp}</td>
            </tr>
            <tr>
              <th>MM Version:</th>
              <td>{versionUatMm}</td>
              <td>{versionProdMm}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DbcoreComponent;
