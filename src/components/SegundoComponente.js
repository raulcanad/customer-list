import React, { useState } from 'react';
import { urlsUat, urlsProd } from './urls';
import './VersionComponent.css'; 

const VersionComponent = () => {
  const [uatVersion, setUatVersion] = useState(null);
  const [prodVersion, setProdVersion] = useState(null);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);

  const handleSelectChange = (event) => {
    const index = event.target.value;
    setSelectedCustomerIndex(index);
    handleButtonClick(urlsUat[index].url, urlsProd[index].url);
  };

  const handleButtonClick = (uatUrl, prodUrl) => {
    setUatVersion(null);
    setProdVersion(null);

    fetch(uatUrl)
      .then(response => response.json())
      .then(data => {
        const cleanData = filterSubmodules(data);
        setUatVersion(cleanData);
      })
      .catch(error => console.error('Error fetching the UAT version:', error));

    fetch(prodUrl)
      .then(response => response.json())
      .then(data => {
        const cleanData = filterSubmodules(data);
        setProdVersion(cleanData);
        fillMissingFields(cleanData);
      })
      .catch(error => console.error('Error fetching the Production version:', error));
  };

  const filterSubmodules = data => {
    const cleanData = {};
    for (const key in data) {
      if (!key.startsWith('_')) {
        cleanData[key] = data[key];
      }
    }
    return cleanData;
  };

  const fillMissingFields = prodData => {
    if (uatVersion && prodData) {
      const mergedData = { ...uatVersion };
      for (const key in prodData) {
        if (!(key in mergedData)) {
          mergedData[key] = '';
        }
      }
      setUatVersion(mergedData);
    }
  };

  return (
    <div className="select-wrapper">
      <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
        <option value="" disabled>Select a customer</option>
        {urlsUat.map((customer, index) => (
          <option key={index} value={index}>{customer.name}</option>
        ))}
      </select>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>UAT Value</th>
              <th>Production Value</th>
            </tr>
          </thead>
          <tbody>
            {uatVersion && prodVersion ? (
              Object.keys({ ...uatVersion, ...prodVersion }).map(key => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    {typeof uatVersion[key] === 'object' ? JSON.stringify(uatVersion[key]) : uatVersion[key]}
                  </td>
                  <td>
                    {typeof prodVersion[key] === 'object' ? JSON.stringify(prodVersion[key]) : prodVersion[key]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  {uatVersion === null && prodVersion === null ? 'Please select a URL to fetch version information.' : 'Loading...'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionComponent;
