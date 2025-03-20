import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Table, Spinner, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";  // logo

const TabletList = () => {
    const [tablets, setTablets] = useState([]); // State to store tablet data
    const [loading, setLoading] = useState(true); // State to manage loading spinner

    // This function fetches the tablet data from the server and updates the state
    const fetchTablets = () => {
        setLoading(true); // Set loading to true when data fetch starts
        axios.get(`${process.env.REACT_APP_API_URL}/tablets`, { withCredentials: true })
            .then(response => {
                setTablets(response.data); // Store fetched tablet data
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching tablets:", error); // Log error if fetching fails
                setLoading(false); // Set loading to false if there's an error
            });
    };

    // This function fetches all records (including tablets and others) from the server
    const fetchAllRecords = () => {
        setLoading(true); // Set loading to true when data fetch starts
        axios.get(`${process.env.REACT_APP_API_URL}/all`, { withCredentials: true })
            .then(response => {
                setTablets(response.data); // Store all fetched records (tablets, etc.)
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch(error => {
                console.error("Error fetching all records:", error); // Log error if fetching fails
                setLoading(false); // Set loading to false if there's an error
            });
    };

    // This function triggers the server to fetch devices and add them to the database
    const fetchAndAddRecords = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/fetch-devices`, { withCredentials: true })
            .then(() => {
                console.log("Records successfully added to the database"); // Log success message
                fetchTablets();  // Fetch updated tablet data after adding records
            })
            .catch(error => {
                console.error("Error adding records:", error); // Log error if adding records fails
            });
    };

    // Fetch tablet data on initial render
    useEffect(() => {
        fetchTablets(); // Initial fetch to display tablet data
    }, []);

    // If loading, show a spinner
    if (loading) return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /></div>;

    return (
        <Container className="mt-4 custom-container">
            {/* Company Logo and Title */}
            <Row className="mb-4 text-center">
                <Col>
                    <img src={logo} alt="Company Logo" className="logo" style={{ backgroundColor: "blue" }} />
                    <h1 className="text-primary mt-3">Device Atlas</h1>
                </Col>
            </Row>

            {/* Buttons for triggering different data fetch actions */}
            <Row className="mb-4 text-center">
                <Col>
                    <Button variant="primary" onClick={fetchAndAddRecords} size="lg" className="mx-2">Fetch and Add Records</Button>
                    <Button variant="secondary" onClick={fetchTablets} size="lg" className="mx-2">Show Tablets</Button>
                    <Button variant="success" onClick={fetchAllRecords} size="lg" className="mx-2">Show All Devices</Button>
                </Col>
            </Row>

            {/* Displaying tablet devices in a table */}
            <Table striped bordered hover responsive className="custom-table">
                <thead className="bg-primary text-white">
                    <tr>
                        <th>Model</th>
                        <th>Vendor</th>
                        <th>OS</th>
                        <th>OS Version</th>
                        <th>Browser</th>
                    </tr>
                </thead>
                <tbody>
                    {tablets.map((tablet, index) => (
                        <tr key={index}>
                            <td>{tablet.model}</td>
                            <td>{tablet.vendor}</td>
                            <td>{tablet.osName}</td>
                            <td>{tablet.osVersion}</td>
                            <td>{tablet.browserName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TabletList;
