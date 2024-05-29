import React, { useState, ChangeEvent } from 'react';
import { urlsUat, urlsProd } from './urls';
import './VersionComponent.css';

interface VersionData {
  [key: string]: any;
}

const VersionComponent: React.FC = () => {
  const [uatVersion, setUatVersion] = useState<VersionData | null>(null);
  const [prodVersion, setProdVersion] = useState<VersionData | null>(null);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setSelectedCustomerIndex(index);
    handleButtonClick(urlsUat[index].url, urlsProd[index].url);
  };

  const handleButtonClick = (uatUrl: string, prodUrl: string) => {
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

  const filterSubmodules = (data: VersionData): VersionData => {
    const cleanData: VersionData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && !key.startsWith('_')) {
        cleanData[key] = data[key];
      }
    }
    return cleanData;
  };

  const fillMissingFields = (prodData: VersionData) => {
    if (uatVersion && prodData) {
      const mergedData: VersionData = { ...uatVersion };
      for (const key in prodData) {
        if (Object.prototype.hasOwnProperty.call(prodData, key) && !(key in mergedData)) {
          mergedData[key] = '';
        }
      }
      setUatVersion(mergedData);
    }
  };

  return (
    <div className="version-component">
      <div className="select-wrapper">
        <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
          <option value="" disabled>Select a customer</option>
          {urlsUat.map((customer, index) => (
            <option key={index} value={index}>{customer.name}</option>
          ))}
        </select>
      </div>
      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>DATA</th>
              <th>UAT</th>
              <th>PROD</th>
            </tr>
          </thead>
          <tbody>
            {(uatVersion !== null && prodVersion !== null) ? (
              Object.keys({ ...uatVersion, ...prodVersion }).map(key => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    {key === 'Link' && selectedCustomerIndex !== null ? <button className="button" onClick={() => window.open(urlsUat[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>UAT</button> : typeof uatVersion[key] === 'object' ? JSON.stringify(uatVersion[key]) : uatVersion[key]}
                  </td>
                  <td>
                    {key === 'Link' && selectedCustomerIndex !== null ? <button className="button" onClick={() => window.open(urlsProd[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>PROD</button> : typeof prodVersion[key] === 'object' ? JSON.stringify(prodVersion[key]) : prodVersion[key]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  {(uatVersion === null && prodVersion === null) ? 'Please select a URL to fetch version information.' : 'Loading...'}
                </td>
              </tr>
            )}
            {/* New row for the link */}
            {selectedCustomerIndex !== null && (
              <tr>
                <td>Link</td>
                <td><button className="button" onClick={() => window.open(urlsUat[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>UAT</button></td>
                <td><button className="button" onClick={() => window.open(urlsProd[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>PROD</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VersionComponent;
