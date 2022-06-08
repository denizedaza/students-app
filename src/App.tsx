import { SetStateAction, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Student } from "./types/student";
import StudentCard from "./components/studentCard";
import DataSearch from "./components/dataSearch";

function App() {
  const [students, setStudents] = useState<Array<Student>>([]);

  async function fetchData() {
    try {
      const result = await axios.get(
        "https://api.hatchways.io/assessment/students"
      );
      const data = result.data.students;
      data.forEach((student: { tags: string[]; }) => {
        student.tags = [];
      })
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  const [filteredNameSearch, setFilteredNameSearch] =
    useState<Array<Student>>(students);
  const [filteredTagSearch, setFilteredTagSearch] =
    useState<Array<Student>>(students);

  const addStudentTag = (tag: string, index: number) => {
    const tempStudent = [...students]
    tempStudent[index].tags.push(tag)
    setStudents(tempStudent);
  };

  const handleNameSearch = (searchValue: string) => {
    const nameSearch = searchValue;
    if (nameSearch !== "") {
      const searchFilter = students.filter((student) => {
        const fullName = `${student.firstName} ${student.lastName}`;
        return Object.values(fullName)
          .join("")
          .toLowerCase()
          .includes(nameSearch.toLowerCase());
      });
      setFilteredNameSearch(searchFilter);
    } else {
      setFilteredNameSearch(students);
    }
  };

  const handleTagSearch = (tagValue: string) => {
    const tagsSearch = tagValue
    if (tagsSearch !== "") {
      let filteredTagsStudents: Array<Student> = [];
      students.forEach(student => {
        let tagPresent = false;
        student.tags.forEach(tag => {
          if (tag.toLowerCase().includes(tagsSearch)) {
            tagPresent = true;
          }
        })

        if (!tagsSearch || tagPresent) {
          filteredTagsStudents.push(student)
        }
      })
      console.log(filteredTagsStudents);
      setFilteredTagSearch(filteredTagsStudents);
    } else {
      setFilteredTagSearch(students);
    }
  }

  // console.log(filteredTagSearch)
  const combinedSearchResults = filteredNameSearch.filter(student => filteredTagSearch.includes(student))

  // console.log(combinedSearchResults)

  let shownStudents: Array<Student> = [];
  filteredNameSearch.length > 0
    ? (shownStudents = filteredNameSearch)
    : (shownStudents = students);

  return (
    <>
      <div className="outer-box">
        <div className="search-box-container">
          <DataSearch handleSearch={handleNameSearch} type="name" />
          <DataSearch handleSearch={handleTagSearch} type="tag" />
        </div>
        {filteredNameSearch.map((student, index) => (
          <StudentCard
            key={index}
            student={student}
            index={index}
            addStudentTag={addStudentTag}
            tagList={student.tags}
          />
        ))}
      </div>
    </>
  );
}

export default App;
