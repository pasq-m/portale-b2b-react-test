import React, { useState } from 'react';
import { Row, Form, Dropdown } from 'react-bootstrap';
//import { Row, Form, Dropdown } from '../../../../node_modules/bootstrap/dist/js/bootstrap.js';

const regioniItaliane = [
    'ABR', 'BAS', 'CAL', 'CAM', 'EMR', 'FVG', 'LAZ', 'LIG', 'LOM', 'MAR',
    'MOL', 'PIE', 'PUG', 'SAR', 'SIC', 'TOS', 'TRE', 'UMB', 'VAO', 'VEN',
];

const RegForm = () => {
    const [selectedReg, setSelectedReg] = useState('');

    const handleRegSelect = (province) => {
        setSelectedReg(province);
    };

    const renderRegForm = () => {
        if (selectedReg === '') {
            return null;
        }

        return (
            <Form.Group controlId="provinceDetails">
                <Form.Label>{''}</Form.Label>
                <Form.Control type="text" value={selectedReg} readOnly />
                {/* Aggiungi altri campi del form per i dettagli della provincia qui */}
            </Form.Group>
        );
    };

    return (
        <Form>
            <Form.Group controlId="provinceSelect">
                <Dropdown>
                    <Row>
                        <Dropdown.Toggle variant="primary" id="provinceDropdown">
                            Seleziona
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {regioniItaliane.map((regione, index) => (
                                <Dropdown.Item key={index} onClick={() => handleRegSelect(regione)}>
                                    {regione}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Row>
                </Dropdown>
            </Form.Group>
            {renderRegForm()}
        </Form>
    );
}

export default RegForm;
