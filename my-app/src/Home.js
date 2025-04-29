import './Home.css';
import React, { useState, useEffect } from 'react';

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState(null); // State to store selected description
  const [searchInput, setSelectedInput] = useState(""); 
  const [error, setError] = useState(null);
    const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://cpscdualenrollmentbackend.onrender.com/table');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data || data.length === 0) {
    return <p>No data to display.</p>;
  }

  const headers = Object.keys(data[0]);

  const handleDescriptionClick = (description) => {
    setSelectedDescription(description); // Store the clicked description in state
  };

  const closeDescription = () => { 
    setSelectedDescription(false);
  }
  const search = async (event) => {
    if (event.keyCode === 13) {


        setLoading(true);
        try {
            // Send data to the backend (POST request)
            const postResponse = await fetch('https://cpscdualenrollmentbackend.onrender.com/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(searchInput),
        });
  

        if (!postResponse.ok) {
            throw new Error(`HTTP error! status: ${postResponse.status}`);
        }
      

        const json = await postResponse.json();
        setData(json);
        setLoading(false);
        } catch (e) {
            setError(e);
            setData(null);
        } finally {
            setLoading(false);
        }
    }
}

  return (
    <div className="table-div" >
  <div className="search-container">
    <div className="spacer" /> 
  
    <div className="filter-wrapper">
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="college">College Courses</option>
      <option value="highschool">HS Courses</option>
    </select>
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="college">College Courses</option>
      <option value="highschool">HS Courses</option>
    </select>
  </div>
  
  <div className="search-box-wrapper">
    <input
      className="searchInput"
      type="text"
      placeholder="Search..."
      onChange={(e) => setSelectedInput(e.target.value)}
      onKeyDown={search}
    />
  </div>
</div>
  

      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>
                {header === "College Course Description" || header === "HS Course Description" ? (
                  <span className="course-description-header">{header}</span>
                ) : (
                  header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>
                  {header === "College Course Description" || header === "HS Course Description" ? (
                    <a 
                      href="#!" 
                      className="description-link"
                      onClick={() => handleDescriptionClick(row[header])}  // Set the clicked description
                    >
                      View Description
                    </a>
                  ) : (
                    row[header]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      
      {selectedDescription && (
        <div className="description-modal">
          <div className="modal-content">
            <span 
              className="close" 
              onClick={() => setSelectedDescription(null)}  
            >
              &times;
            </span>
            <h3>Course Description</h3>
            <p>{selectedDescription}</p>
            <button onClick={closeDescription}> Exit </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;


