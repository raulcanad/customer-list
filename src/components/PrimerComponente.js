import React, { useState } from 'react';

const PrimerComponente = () => {
  const urls = [
    { name: 'Zamb', url: 'https://www-zamb-ssb-ua.zamba.co/version.json' },
    { name: 'Talo', url: 'https://www-talo-srp-ua.optimahq.com/version.json' }
  ];

  const [finalUrl, setFinalUrl] = useState(null);

  const handleButtonClick = (url) => {
    setFinalUrl(url);
  };

  return (
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
  );
};

export default PrimerComponente;
