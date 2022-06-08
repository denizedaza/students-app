import { FC, FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { Student } from "../types/student";
import "./studentCard.css";
import StudentTags from "./studentTags";

interface StudentProps {
  student: Student;
  index: number;
  addStudentTag: (text: string, number: number) => void;
  tagList: Array<string>;
}

const StudentCard: FC<StudentProps> = ({ student, index, addStudentTag, tagList }) => {
  const gradesAsInt: Array<number> = [];
  const [openTestScores, setOpenTestScores] = useState(false);
  const [tagInput, setTagInput] = useState("");
  // const [studentTags, setStudentTags] = useState<Array<string>>([]);
  // console.log(student)
  // console.log(tagList)

  student.grades.forEach((grade) => {
    gradesAsInt.push(Number(grade));
  });

  const gradeSum = gradesAsInt.reduce((init, next) => {
    return +init + +next;
  });
  student.average = gradeSum / gradesAsInt.length;

  const studentFullName =
    `${student.firstName} ${student.lastName}`.toUpperCase();

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setTagInput(value);
  };

  const tagKeyDown = (event: KeyboardEvent) => {
    const { key } = event;
    const trimmedTagInput = tagInput.trim();

    if (key === "Enter" && trimmedTagInput.length && !tagList.includes(trimmedTagInput)) {
      event.preventDefault();
      addStudentTag(trimmedTagInput, index);
      setTagInput("");
    }
  };

  return (
    <div className="card-container">
      <img
        className="profile-pic"
        alt="student-profile"
        src={student.pic}
      />
      <div className="card-header">
        <h1>{studentFullName}</h1>
        <button
          className="btn-plusminus"
          onClick={() => setOpenTestScores(!openTestScores)}
        >
          {openTestScores ? "–" : "+"}
        </button>
      </div>
      <div className="student-info">
        <p>Email: {student.email}</p>
        <p>Company: {student.company}</p>
        <p>Skill: {student.skill}</p>
        <p>Average: {student.average}%</p>
      </div>
      <div>
        {openTestScores &&
          gradesAsInt.map((grade, index) => {
            return (
              <div key={index} className="test-score">
                Test {index + 1}: &emsp; {grade}%
              </div>
            );
          })}
      </div>
      <div className="tags-container">
        <StudentTags
          tagList={tagList}
          onTagChange={handleTagChange}
          tagValue={tagInput}
          onTagKeyCheck={tagKeyDown}
        />
      </div>
    </div>
  );
};

export default StudentCard;
