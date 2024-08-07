import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [customers, setCustomers] = useState<{ name: string, uat: string, prod: string }[]>([

    { name: 'BALLERS', uat: 'https:///www-webapps-version-ball-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-ball-prod.optima.com/api/dbcore' },
    { name: 'BETSSON', uat: 'https:///www-webapps-version-beson-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-beson-prod.optima.com/api/dbcore' },
    { name: 'CAGE', uat: 'https:///www-webapps-version-cage-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-cage-prod.optima.com/api/dbcore' },
    { name: 'NT', uat: 'https:///www-webapps-version-nt-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-nt-prod.optima.com/api/dbcore' },
    { name: 'PENT', uat: 'https:///www-webapps-version-pent-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-pent-prod.optima.com/api/dbcore' },
    { name: 'SPOR', uat: 'https://www-webapps-version-spor-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-spor-prod.optima.com/api/dbcore' },
    { name: 'TALO', uat: 'https:///www-webapps-version-talo-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-talo-prod.optima.com/api/dbcore' },
    { name: '10BET', uat: 'https:///www-webapps-version-tenbet-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-tenbet-prod.optima.com/api/dbcore' },
    { name: 'ZAMBA', uat: 'https:///www-webapps-version-zamb-uat.optima.com/api/dbcore', prod: 'https:///www-webapps-version-zamb-prod.optima.com/api/dbcore' },

    // Add more customers as needed
  ]);

  const [selectedCustomerIndex, setSelectedCustomerIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [versions, setVersions] = useState<{
    [key: string]: {
      dbcore: { uat: string, prod: string },
      mmfixedodds: { uat: string, prod: string },
      mmtexas: { uat: string, prod: string },
      mmfowarp: { uat: string, prod: string },
      mm: { uat: string, prod: string }
    }
  }>({});

  useEffect(() => {
    if (selectedCustomerIndex !== null) {
      setLoading(true);
      const { uat: dbcoreUatUrl, prod: dbcoreProdUrl } = customers[selectedCustomerIndex];
      const mmfixedoddsUatUrl = 'https://www-webapps-version-spor-uat.optima.com/api/mmfixedodds';
      const mmfixedoddsProdUrl = 'https:///www-webapps-version-spor-prod.optima.com/api/mmfixedodds';
      const mmtexasUatUrl = 'https://www-webapps-version-spor-uat.optima.com/api/mmtexas';
      const mmtexasProdUrl = 'https:///www-webapps-version-spor-prod.optima.com/api/mmtexas';
      const mmfowarpUatUrl = 'https://www-webapps-version-spor-uat.optima.com/api/mmfowarp';
      const mmfowarpProdUrl = 'https:///www-webapps-version-spor-prod.optima.com/api/mmfowarp';
      const mmUatUrl = 'https://www-webapps-version-spor-uat.optima.com/api/mm';
      const mmProdUrl = 'https:///www-webapps-version-spor-prod.optima.com/api/api/mm';

      Promise.all([
        axios.get(dbcoreUatUrl).then(response => response.data[0]), // Assuming data[0] is the version string
        axios.get(dbcoreProdUrl).then(response => response.data[0]),
        axios.get(mmfixedoddsUatUrl).then(response => response.data[0]),
        axios.get(mmfixedoddsProdUrl).then(response => response.data[0]),
        axios.get(mmtexasUatUrl).then(response => response.data[0]),
        axios.get(mmtexasProdUrl).then(response => response.data[0]),
        axios.get(mmfowarpUatUrl).then(response => response.data[0]),
        axios.get(mmfowarpProdUrl).then(response => response.data[0]),
        axios.get(mmUatUrl).then(response => response.data[0]),
        axios.get(mmProdUrl).then(response => response.data[0])
      ]).then(([
        dbcoreUatData, dbcoreProdData,
        mmfixedoddsUatData, mmfixedoddsProdData,
        mmtexasUatData, mmtexasProdData,
        mmfowarpUatData, mmfowarpProdData,
        mmUatData, mmProdData
      ]) => {
        setVersions({
          ...versions,
          [customers[selectedCustomerIndex].name]: {
            dbcore: { uat: dbcoreUatData, prod: dbcoreProdData },
            mmfixedodds: { uat: mmfixedoddsUatData, prod: mmfixedoddsProdData },
            mmtexas: { uat: mmtexasUatData, prod: mmtexasProdData },
            mmfowarp: { uat: mmfowarpUatData, prod: mmfowarpProdData },
            mm: { uat: mmUatData, prod: mmProdData }
          }
        });
      }).catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
    }
  }, [selectedCustomerIndex]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(event.target.value, 10);
    setSelectedCustomerIndex(index);
  };

  return (
    <div className="dbcore-component">
      <div className="dbcore-component-content">
        <div className="select-wrapper">
          {selectedCustomerIndex === null && (
            <p className="caption" style={{ textAlign: 'center', margin: '10px 0' }}>SCHEME-DB-VERSION</p>
          )}
          <select onChange={handleSelectChange} value={selectedCustomerIndex !== null ? selectedCustomerIndex : ''}>
            <option value="" disabled>Select a customer</option>
            {customers.map((customer, index) => (
              <option key={index} value={index}>{customer.name}</option>
            ))}
          </select>
        </div>
        {selectedCustomerIndex !== null && (
          <table className="data-table">
            <caption className='caption'>SCHEME-DB-VERSION</caption>
            <tbody>
              <tr>
                <th></th>
                <th>UAT</th>
                <th>PROD</th>
              </tr>
              {loading ? (
                <tr>
                  <td colSpan={3}>Loading...</td>
                </tr>
              ) : (
                <>
                  <tr>
                    <th>DBCORE Version:</th>
                    <td>{versions[customers[selectedCustomerIndex].name]?.dbcore.uat}</td>
                    <td>{versions[customers[selectedCustomerIndex].name]?.dbcore.prod}</td>
                  </tr>
                  <tr>
                    <th>MMFIXEDODDS Version:</th>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmfixedodds.uat}</td>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmfixedodds.prod}</td>
                  </tr>
                  <tr>
                    <th>MMTEXAS Version:</th>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmtexas.uat}</td>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmtexas.prod}</td>
                  </tr>
                  <tr>
                    <th>MMFOWARP Version:</th>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmfowarp.uat}</td>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mmfowarp.prod}</td>
                  </tr>
                  <tr>
                    <th>MM Version:</th>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mm.uat}</td>
                    <td>{versions[customers[selectedCustomerIndex].name]?.mm.prod}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DbcoreComponent;
