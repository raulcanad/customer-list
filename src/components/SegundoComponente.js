import React, { useEffect, useState } from 'react';

const VersionComponent = () => {
  const [version, setVersion] = useState(null);
  const [finalUrl, setFinalUrl] = useState(null);

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

  const handleButtonClick = (url) => {
    setFinalUrl(url);
  };

  useEffect(() => {
    if (finalUrl) {
      fetch(finalUrl)
        .then(response => response.json())
        .then(data => setVersion(data))
        .catch(error => console.error('Error fetching the version:', error));
    }
  }, [finalUrl]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '48%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '4px' }}>UAT</th>
            </tr>
          </thead>
          <tbody>
            {urlsUat.map(({ name, url }) => (
              <tr key={url}>
                <td style={{ border: '1px solid black', padding: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{name}</span>
                  <button onClick={() => handleButtonClick(url)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '48%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '4px' }}>Production</th>
            </tr>
          </thead>
          <tbody>
            {urlsProd.map(({ name, url }) => (
              <tr key={url}>
                <td style={{ border: '1px solid black', padding: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{name}</span>
                  <button onClick={() => handleButtonClick(url)}>Select</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {finalUrl && (
        <div>
          Selected URL: {finalUrl}
        </div>
      )}
      {version ? (
        <div>
          <h2>Version Information</h2>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '4px' }}>Key</th>
                <th style={{ border: '1px solid black', padding: '4px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(version).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ border: '1px solid black', padding: '4px' }}>{key}</td>
                  <td style={{ border: '1px solid black', padding: '4px' }}>{value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        finalUrl ? <p>Loading...</p> : <p>Please select a URL to fetch version information.</p>
      )}
    </div>
  );
};

export default VersionComponent;
