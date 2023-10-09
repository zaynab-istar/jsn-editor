import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanel';
import ResultPanel from './ResultPanel';
import ModalComponent from './ModalComponent';


function JsonEditor() {
  const [data, setData] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const result = await response.json();
      setData(result);
      setHasFetchedData(true);
    } catch (error) {
      console.error('Failed to fetch data', error);
    }
  };

  return (
    <div className="container-fluid json-container">
      <div className="row">
        <SidePanel fetchData={fetchData} setIsModalOpen={setIsModalOpen} setModalType={setModalType} setSelectedItem={setSelectedItem} />
        {hasFetchedData ? <ResultPanel data={data} /> : <div className="col-8 p-3 d-flex align-items-center justify-content-center"><div className="placeholder-text">Here You Can Modify Your Json File!</div></div>}
      </div>
      {isModalOpen && <ModalComponent type={modalType} item={selectedItem} fetchData={fetchData} setIsModalOpen={setIsModalOpen} data={data} setData={setData} />}
    </div>
  );
}

export default JsonEditor;
