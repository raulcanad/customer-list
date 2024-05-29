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
  const [showSubmodulePopup, setShowSubmodulePopup] = useState<boolean>(false); // State to control the display of the submodule pop-up
  const [showButtonsOnly, setShowButtonsOnly] = useState<boolean>(false); // State to control displaying only buttons
  // Access the URLs for UAT environment
  const urlsUat = urlsData.urlsUat;

// Access the URLs for Production environment
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
    // Check if submodules are present in either UAT or Prod versions
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
    setCustomerSelected(true); // Set the flag to true when a customer is selected for the first time
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
        return true; // Submodule found
      }
    }
    return false;
  };

  return (
    <div className="version-component">
      {showSubmodulePopup && ( // Conditionally render the submodule pop-up
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
      {customerSelected && ( // Only show the table if a customer has been selected at least once
        <div className="data-table-wrapper">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>DATA</th>
                  <th>UAT</th>
                  <th>PROD</th>
                </tr>
              </thead>
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
          )}
        </div>
      )}
    </div>
  );
};

export default VersionComponent;
