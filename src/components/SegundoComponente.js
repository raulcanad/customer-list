import React, { useEffect, useState } from 'react';


const VersionComponent = () => {
  const [version, setVersion] = useState(null);
  
  const urls = [
    { name: 'Zamb', url: 'https://www-zamb-ssb-ua.zamba.co/version.json' },
    { name: 'Talo', url: 'https://www-talo-srp-ua.optimahq.com/version.json' },
    { name: '10bet', url: 'https://www-tenb-ssb-uat.playingops.com/version.json'},
    { name: 'Ballers', url: 'https://www-ball-ssb-uc.ballerspr.com/version.json'},
    { name: 'Bson', url: 'https://www-bson-ssb-ua.betsson.fr/version.json'},
  ];

  const [finalUrl, setFinalUrl] = useState(null);

  const handleButtonClick = (url) => {
    setFinalUrl(url);
  };
  const zamb = finalUrl

  useEffect(() => {
    fetch(finalUrl)
      .then(response => response.json())
      .then(data => setVersion(data))
      .catch(error => console.error('Error fetching the version:', error));
  }, [finalUrl]);

  return (
    
    <div>
        <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(({ name, url }) => (
            <tr key={url}>
              <td>{name}</td>
              <td>
                <button onClick={() => handleButtonClick(url)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {finalUrl && (
        <div>
          Selected URL: {finalUrl}
        </div>
      )}
    </div>
      {version ? (
        <div>
          <h2>Version Information</h2>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px' }}>{zamb}</th>
                <th style={{ border: '1px solid black', padding: '8px' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(version).map(([key, value]) => (
                <tr key={key}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{key}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{value.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default VersionComponent;
