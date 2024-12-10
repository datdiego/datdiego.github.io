import React, { useState } from "react";
import { Table, Container, Button } from "react-bootstrap";

// Import JSON data
import publicationsData from "./data/publications.json";

const Publications = () => {
  const [sortConfig, setSortConfig] = useState({ key: "year", direction: "descending" });

  // Sort function
  const sortedPublications = [...publicationsData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });


  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction: prevState.direction === "ascending" && prevState.key === key ? "descending" : "ascending",
    }));
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Publications</h2>
      
      <Button variant="primary" className="mb-3" href="https://scholar.google.com/citations?user=Rli2mWsAAAAJ">
        View Google Scholar Profile
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
              Title {sortConfig.key === "title" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("year")} style={{ cursor: "pointer" }}>
              Year {sortConfig.key === "year" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("journal")} style={{ cursor: "pointer" }}>
              Journal {sortConfig.key === "journal" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
            </th>
            <th onClick={() => handleSort("citations")} style={{ cursor: "pointer" }}>
              Citations {sortConfig.key === "citations" ? (sortConfig.direction === "ascending" ? "▲" : "▼") : ""}
            </th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {sortedPublications.map((pub, index) => (
            <tr key={index}>
              <td>{pub.title}</td>
              <td>{pub.year}</td>
              <td>{pub.journal}</td>
              <td>{pub.citations}</td>
              <td>
                <a href={pub.link} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Publications;