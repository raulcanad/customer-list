import React, { useState, useEffect, ChangeEvent } from 'react';
import './VersionComponent.css';
import urlsData from './urls.json';

interface VersionData {
  [key: string]: any;
}

const VersionComponent: React.FC = () => {
  const [uatVersion, setUatVersion] = useState<VersionData | null>(null);
  const [prodVersion, setProdVersion] = useState<VersionData | null>(null);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null);
  const [customerSelected, setCustomerSelected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSubmodulePopup, setShowSubmodulePopup] = useState<boolean>(false);
  const [showButtonsOnly, setShowButtonsOnly] = useState<boolean>(false);

  const urlsUat = urlsData.urlsUat;
  const urlsProd = urlsData.urlsProd;

  useEffect(() => {
    if (selectedCustomerIndex !== null) {
      setLoading(true);
      const uatUrl = urlsUat[selectedCustomerIndex].url;
      const prodUrl = urlsProd[selectedCustomerIndex].url;
      fetchVersions(uatUrl, prodUrl);
    }
  }, [selectedCustomerIndex]);

  useEffect(() => {
    if (uatVersion && hasSubmodules(uatVersion)) {
      setShowSubmodulePopup(true);
      setShowButtonsOnly(true);
    } else if (prodVersion && hasSubmodules(prodVersion)) {
      setShowSubmodulePopup(true);
      setShowButtonsOnly(true);
    } else {
      setShowSubmodulePopup(false);
      setShowButtonsOnly(false);
    }
  }, [uatVersion, prodVersion]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setSelectedCustomerIndex(index);
    setCustomerSelected(true);
  };

  const fetchVersions = (uatUrl: string, prodUrl: string) => {
    Promise.all([
      fetch(uatUrl).then(response => response.json()),
      fetch(prodUrl).then(response => response.json())
    ]).then(([uatData, prodData]) => {
      setUatVersion(filterSubmodules(uatData));
      setProdVersion(filterSubmodules(prodData));
    }).catch(error => console.error('Error fetching versions:', error))
    .finally(() => setLoading(false));
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

  const hasSubmodules = (data: VersionData): boolean => {
    for (const key in data) {
      if (typeof data[key] === 'object') {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="version-component">
      {showSubmodulePopup && (
        <div className="popup">
          <p>Please note that submodules are deployed for this customer. Click the button for more data.</p>
        </div>
      )}
      <div className="select-wrapper">
        <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
          <option value="" disabled>Select a customer</option>
          {urlsUat.map((customer, index) => (
            <option key={index} value={index}>{customer.name}</option>
          ))}
        </select>
      </div>
      {customerSelected && (
        <div className="data-table-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className={`data-table ${showButtonsOnly ? 'no-border' : ''}`}>
              {!showButtonsOnly && (
                <thead>
                  <tr>
                    <th>DATA</th>
                    <th>UAT</th>
                    <th>PROD</th>
                  </tr>
                </thead>
              )}
              <tbody>
                {!showButtonsOnly && uatVersion && prodVersion && Object.keys({ ...uatVersion, ...prodVersion }).map(key => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>
                      {key === 'Link' && selectedCustomerIndex !== null ? <button className="button" onClick={() => window.open(urlsUat[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>UAT</button> : typeof uatVersion[key] === 'object' ? JSON.stringify(uatVersion[key]) : uatVersion[key]}
                    </td>
                    <td>
                      {key === 'Link' && selectedCustomerIndex !== null ? <button className="button" onClick={() => window.open(urlsProd[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>PROD</button> : typeof prodVersion[key] === 'object' ? JSON.stringify(prodVersion[key]) : prodVersion[key]}
                    </td>
                  </tr>
                ))}
                {selectedCustomerIndex !== null && (
                  <tr>
                    <td>Link</td>
                    <td><button className="button" onClick={() => window.open(urlsUat[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>UAT</button></td>
                    <td><button className="button" onClick={() => window.open(urlsProd[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>PROD</button></td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default VersionComponent;
