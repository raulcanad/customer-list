import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/DbcoreComponent.css';

const DbcoreComponent: React.FC = () => {
  const [version, setVersion] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setVersion(response.data[0]); // Assuming the result is a single value
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dbcore-component">
      <div className="dbcore-component-content">
        <table>
          <caption className='caption'>BACK END</caption>
          <tbody>
            <tr>
              <th>DBCORE Version:</th>
              <td>{version}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DbcoreComponent;
