import logo from './image.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function SimilaritySearch() {
  const [isVisible, setIsVisible] = useState(false);
  // usestate for setting a javascript
    // object for storing and using data

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [firstCourse, setFirstCourse] = useState(true);
    const [secondCourse, setSecondCourse] = useState(true);
    const [thirdCourse, setThirdCourse] = useState(true);
    const [firstDescription, setFirstDescription] = useState(false);
    const [secondDescription, setSecondDescription] = useState(false);
    const [thirdDescription, setThirdDescription] = useState(false);
    const [resetButton, setResetButton] = useState(false);
   
    const [data, setData] = useState({
      name1: "",
      description1: "",
      course_name1: "",
      course_number1: "",
      name2: "",
      description2: "",
      courese_name2: "",
      course_number2: "",
      name3: "",
      description3: "",
      courese_name3: "",
      course_number3: "",
    });

    

    // const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
  const search = async () => {
    const postResponse = await fetch('https://cpscdualenrollmentbackend.onrender.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(name),
    });
  }
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setIsVisible(!isVisible);

    const  course = {
      name: name,
      description: description,
    }

    try {
        // Send data to the backend (POST request)
        const postResponse = await fetch('https://cpscdualenrollmentbackend.onrender.com/data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(course),
        });
  
        if (!postResponse.ok) {
          throw new Error(`HTTP error! status: ${postResponse.status}`);
        }
        

        const json = await postResponse.json();
        // setData(json);
          setData({
            name1: json.name1,
            description1: json.description1,
            course_name1: json.college_course1,
            course_number1: json.college_number1,
            name2: json.name2,
            description2: json.description2,
            course_name2: json.college_course2,
            course_number2: json.college_number2,
            name3: json.name3,
            description3: json.description3,
            course_name3: json.college_course3,
            course_number3: json.college_number3,
          });
      
    } catch (e) {
      setError(e);
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  const clickFirstCourse = async () => {
    setSecondCourse(false);
    setThirdCourse(false);
    setSecondDescription(false);
    setFirstDescription(true);
    setThirdDescription(false);
    setResetButton(true);
  }

  const clickSecondCourse = async () => {
    setFirstCourse(false);
    setThirdCourse(false);
    setSecondDescription(true);
    setFirstDescription(false);
    setThirdDescription(false);
    setResetButton(true);
  }

  const clickThirdCourse = async () => {
    setFirstCourse(false);
    setSecondCourse(false);
    setSecondDescription(false);
    setFirstDescription(false);
    setThirdDescription(true);
    setResetButton(true);
  }

  const clickResetButton = async () => {
    setResetButton(false);
    setFirstCourse(true);
    setThirdCourse(true);
    setSecondCourse(true);
    setSecondDescription(false);
    setFirstDescription(false);
    setThirdDescription(false);
    
    
    
  }
  return (
    <div class = "App">
      <div className="expandable-div">
        <div>
          <label htmlFor="fname">High School Course Name:</label>
          <input type="text" id="fname" name="fname" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="lname">High School Course Description:</label>
          <textarea rows="5" cols="33" onChange={(e) => setDescription(e.target.value)}>
            Enter a High School Course Description
          </textarea>
        </div>
        <div>
          <button  onClick={fetchData}>Submit</button>
        </div>
      </div>
      {isVisible && 
      <div className="expandable-div">
              <h2>Most Similar College Courses</h2>
                {firstCourse &&
                <div>
                {/* Calling a data from setdata for showing */}
                <p onClick={clickFirstCourse} className="courseNames">  1: <b>{data.name1}</b></p>
                {firstDescription &&
                <div> 
                 <p className="courseNames"> {data.course_number1} {data.course_name1}</p>
                <p className="courseNames"> {data.description1}</p>
                
                </div>
                }
                </div>
              }
                {secondCourse &&
                <div>
                 <p onClick={clickSecondCourse}  className="courseNames"> 2: <b>{data.name2}</b></p> 
                 {secondDescription && 
                 <div>
                 <p className="courseNames"> {data.course_number2} </p>
                 <p  className="courseNames"> {data.description2}</p> 
                 </div>
                 }
                 </div>
                }
                {thirdCourse &&
                <div>
                 <p onClick={clickThirdCourse}  className="courseNames">3: <b>{data.name3}</b> </p>
                  {thirdDescription && 
                  <div>
                    <p className="courseNames"> {data.course_number3} </p>
                    <p  className="courseNames">  {data.description3}</p> 
                    </div>
                  }
                </div>
                }
            {resetButton &&
            <button  onClick={clickResetButton}>Reset Button</button>
            }

        </div>
      }
    </div>
 
  );
}

export default SimilaritySearch;
