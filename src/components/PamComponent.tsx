import React, { useState, useEffect, ChangeEvent } from 'react';
import '../style/Pam.css';
import urlsData from '../settings/Pam.json';

interface VersionData {
  [key: string]: any;
}

const PamComponent: React.FC = () => {
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
    <div className="pam-component">
      <h1 className="title">PAM'S VERSIONS</h1>
      <div className="select-wrapper">
        <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
          <option value="" disabled>Select a customer</option>
          {urlsUat.map((customer, index) => (
            <option key={index} value={index}>{customer.name}</option>
          ))}
        </select>
      </div>
      {customerSelected && (
        <>
          {showSubmodulePopup && (
            <div className="popup">
              <p className="mobile-toast">Please note that submodules are deployed in PAM for this customer. Click the button for more data.</p>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>DATA</th>
                    <th>UAT</th>
                    <th>PROD</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Release</td>
                    <td>{uatVersion && uatVersion.release}</td>
                    <td>{prodVersion && prodVersion.release}</td>
                  </tr>
                  <tr>
                    <td>Build</td>
                    <td>{uatVersion && uatVersion.build}</td>
                    <td>{prodVersion && prodVersion.build}</td>
                  </tr>
                  <tr className="table-row-mobile">
                    <td>Link</td>
                    <td>
                      {selectedCustomerIndex !== null && (
                        <button className="button" onClick={() => window.open(urlsUat[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>
                          UAT
                        </button>
                      )}
                    </td>
                    <td>
                      {selectedCustomerIndex !== null && (
                        <button className="button" onClick={() => window.open(urlsProd[selectedCustomerIndex].url, '_blank', 'width=600,height=400')}>
                          PROD
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
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
                  {!showButtonsOnly && uatVersion && prodVersion && (
                    <>
                      <tr>
                        <td>Release</td>
                        <td>{uatVersion.release}</td>
                        <td>{prodVersion.release}</td>
                      </tr>
                      <tr>
                        <td>Build</td>
                        <td>{uatVersion.build}</td>
                        <td>{prodVersion.build}</td>
                      </tr>
                      <tr>
                        <td>Msg-Version</td>
                        <td>{uatVersion['msg-version']}</td>
                        <td>{prodVersion['msg-version']}</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PamComponent;
