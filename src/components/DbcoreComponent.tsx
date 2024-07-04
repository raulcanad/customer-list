import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [customers, setCustomers] = useState<{ name: string, uat: string, prod: string }[]>([
    { name: 'SPOR', uat: 'http://localhost:5000/api/dbcore', prod: 'http://localhost:5001/api/dbcore' },
    { name: 'DAZU', uat: 'http://localhost:5002/api/dbcore', prod: 'http://localhost:5003/api/dbcore' },
    { name: 'TALO', uat: 'http://localhost:5004/api/dbcore', prod: 'http://localhost:5005/api/dbcore' },
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
      const mmfixedoddsUatUrl = 'http://localhost:5000/api/mmfixedodds';
      const mmfixedoddsProdUrl = 'http://localhost:5001/api/mmfixedodds';
      const mmtexasUatUrl = 'http://localhost:5000/api/mmtexas';
      const mmtexasProdUrl = 'http://localhost:5001/api/mmtexas';
      const mmfowarpUatUrl = 'http://localhost:5000/api/mmfowarp';
      const mmfowarpProdUrl = 'http://localhost:5001/api/mmfowarp';
      const mmUatUrl = 'http://localhost:5000/api/mm';
      const mmProdUrl = 'http://localhost:5001/api/mm';

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
