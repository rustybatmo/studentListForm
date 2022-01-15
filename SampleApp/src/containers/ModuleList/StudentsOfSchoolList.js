import React from "react";
import { connect } from "react-redux";
import { push } from "../../actions";
import { getStudentsBySchoolId } from "../../actions/StudentActions/StudentActions";
import style from "./ModuleList.module.css";

class StudentsOfSchool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentList: [],
    };
  }

  componentDidMount() {
    const { getStudentsBySchoolId, schoolId } = this.props;
    getStudentsBySchoolId(schoolId).then((res) => {
      const studentList = res.data;
      this.setState({
        studentList,
      });
    });
  }

  render() {
    const { push } = this.props;
    const { studentList = [] } = this.state;
    const studentListUI = studentList.map((student, index) => {
      return (
        <div className={style.item} key={student.id}>
          <div
            onClick={() => push({ pathname: `/app/students/${student.id}` })}
          >
            <h1>{student.name}</h1>
            <h1>{student.age}</h1>
            <h1>{student.schoolName}</h1>
          </div>
        </div>
      );
    });
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "20px",
            padding: "10px 20px",
          }}
        >
          This is the students of this school
        </h1>
        {studentListUI}
      </div>
    );
  }
}

export default connect(null, {
  getStudentsBySchoolId,
  push,
})(StudentsOfSchool);
