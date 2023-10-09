import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function ModalComponent({ type, fetchData, setIsModalOpen, data, setData }) {
  const [formData, setFormData] = useState(initializeForm());
  const [selectedId, setSelectedId] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  function initializeForm() {
    return data.length > 0
      ? Object.keys(data[0]).reduce((obj, key) => {
          obj[key] = '';
          return obj;
        }, {})
      : {};
  }

  useEffect(() => {
    if (type === 'update' && showUpdateForm && selectedData) {
      setFormData(selectedData);
    }
  }, [showUpdateForm, selectedData, type]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'selectedId') {
      setSelectedId(value);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (type === 'delete') {
      const newData = data.filter((d) => d.id.toString() !== selectedId.trim());
      setData(newData);
    } else if (type === 'update' && !showUpdateForm) {
      const selected = data.find((d) => d && d.id && d.id.toString() === selectedId.trim());
      if (!selected) {
        alert('No item with the provided ID found!');
        return;
      }
      setSelectedData(selected);
      setShowUpdateForm(true);
      return;
    } else if (type === 'update' && showUpdateForm) {
      const newData = data.map((d) => (d.id.toString() === selectedId.trim() ? formData : d));
      setData(newData);
    }
    fetchData();
    setIsModalOpen(false);
    setShowUpdateForm(false);
  };
  

  return (
    <Modal show onHide={() => setIsModalOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{type.charAt(0).toUpperCase() + type.slice(1)} Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {type !== 'add' && !showUpdateForm && (
            <Form.Group controlId={`formSelectedId`}>
              <Form.Label>Server ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter server-id"
                name="selectedId"
                value={selectedId}
                onChange={handleInputChange}
              />
            </Form.Group>
          )}

          {(type === 'add' || (type === 'update' && showUpdateForm)) &&
            Object.keys(formData).map((key) => (
              <Form.Group controlId={`form${key}`} key={key}>
                <Form.Label>{key}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter ${key}`}
                  name={key}
                  value={formData[key] || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>
            ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>
          {type === 'update' && !showUpdateForm ? 'Next' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;
