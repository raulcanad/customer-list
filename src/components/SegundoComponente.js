import React, { useState } from 'react';

const VersionComponent = () => {
  const [uatVersion, setUatVersion] = useState(null);
  const [prodVersion, setProdVersion] = useState(null);
  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState(null);

  const urlsUat = [
    { name: 'Zamb', url: 'https://www-zamb-ssb-ua.zamba.co/version.json' },
    { name: 'Talo', url: 'https://www-talo-srp-ua.optimahq.com/version.json' },
    { name: '10bet', url: 'https://www-tenb-ssb-uat.playingops.com/version.json' },
    { name: 'Ballers', url: 'https://www-ball-ssb-uc.ballerspr.com/version.json' },
    { name: 'Bson', url: 'https://www-bson-ssb-ua.betsson.fr/version.json' },
    { name: 'Pent', url: 'https://www-xlbe-ssb-uat.uatsecure.com/version.json' },
    { name: 'Dazu', url: 'https://www-dazu-ssb-uat.uatsecure.com/version.json' },
  ];

  const urlsProd = [
    { name: 'Zamb', url: 'https://www-zamb-ssb-pr.zamba.co/version.json' },
    { name: 'Talo', url: 'https://www-talo-ssb-pr.optimahq.com/version.json' },
    { name: '10bet', url: 'https://www-tenb-ssb-pr.10bet.mx/version.json' },
    { name: 'Ballers', url: 'https://www-ball-ssb-pr.ballerspr.com/version.json' },
    { name: 'Bson', url: 'https://www-bson-ssb-pr.betsson.fr/version.json' },
    { name: 'Pent', url: 'https://www-pent-ssb-pr.ncinteg-peg.tech/version.json' },
    { name: 'Dazu', url: 'https://www-dazu-ssb-pr.daznbet.com/version.json' },
  ];

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
    <div style={{ marginBottom: '1cm' }}>
      <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
        <option value="" disabled>Select a customer</option>
        {urlsUat.map((customer, index) => (
          <option key={index} value={index}>{customer.name}</option>
        ))}
      </select>
      <div style={{ maxHeight: '400px', marginTop: '10px' }}>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '4px' }}></th>
              <th style={{ border: '1px solid black', padding: '4px' }}>UAT Value</th>
              <th style={{ border: '1px solid black', padding: '4px' }}>Production Value</th>
            </tr>
          </thead>
          <tbody>
            {uatVersion && prodVersion ? (
              Object.keys({ ...uatVersion, ...prodVersion }).map(key => (
                <tr key={key}>
                  <td style={{ border: '1px solid black', padding: '4px' }}>{key}</td>
                  <td style={{ border: '1px solid black', padding: '4px' }}>
                    {typeof uatVersion[key] === 'object' ? JSON.stringify(uatVersion[key]) : uatVersion[key]}
                  </td>
                  <td style={{ border: '1px solid black', padding: '4px' }}>
                    {typeof prodVersion[key] === 'object' ? JSON.stringify(prodVersion[key]) : prodVersion[key]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ border: '1px solid black', padding: '4px', textAlign: 'center' }}>
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
