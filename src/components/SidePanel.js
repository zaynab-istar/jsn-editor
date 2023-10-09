import React from 'react';
import { Button } from 'react-bootstrap';

function SidePanel({ fetchData, setIsModalOpen, setModalType, setSelectedItem }) {
  return (
    <div className="col-4 p-3 border-end d-flex flex-column align-items-start">
      <Button variant="primary" onClick={fetchData} className="mb-2 self-stretch">Fetch Data</Button>
      <Button variant="success" onClick={() => { setIsModalOpen(true); setModalType('add'); }} className="mb-2 self-stretch">Add</Button>
      <Button variant="warning" onClick={() => { setIsModalOpen(true); setModalType('update'); }} className="mb-2 self-stretch">Update</Button>
      <Button variant="danger" onClick={() => { setIsModalOpen(true); setModalType('delete'); }} className="mb-2 self-stretch">Delete</Button>
    </div>
  );
}

export default SidePanel;
