import Box from "@zohodesk/components/lib/Layout/Box";
import Container from "@zohodesk/components/lib/Layout/Container";
import React from "react";
import { connect } from "react-redux";
import { push } from "../../actions";
import {
  deleteStudent,
  getStudent,
} from "../../actions/StudentActions/StudentActions";
import { selectStudent } from "../../selectors/selectors";
import styles from "./StudentDetail.module.css";

class StudentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      student: {},
      apiCalled: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {
    const { deleteStudent, push } = this.props;
    const { id, apiCalled } = this.state;
    if (apiCalled === false) {
      this.setState(
        {
          apiCalled: true,
        },
        () => {
          deleteStudent(id);
          push({ pathname: "/app/students" });
        }
      );
    }
  }

  handleUpdate() {
    const { push } = this.props;
    const { id } = this.state;
    push({ pathname: `/app/students/edit/${id}` });
  }

  componentDidMount() {
    const { getStudent } = this.props;
    const { id } = this.state;
    getStudent(id).then((res) => {
      console.log(res.data);
      const student = res.data;
      this.setState({
        student: student,
      });
    });
  }

  render() {
    const { student } = this.state;
    const {
      name,
      age,
      clubs,
      email,
      gender,
      reason,
      transport,
      id,
      school,
    } = student;
    const { push } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 style={{ fontSize: "30px" }}>Student Details Page</h1>
        </div>
        <div className={styles.deetSection}>
          <div>
            <label>Name : </label>
            {name}
          </div>
          <div>
            <label>Age : </label> {age}
          </div>
          <div>
            <label>School : </label> {school}
          </div>
          <div>
            <label>Clubs participating in :</label> {clubs}
          </div>
          <div>
            <label>Email :</label> {email}
          </div>
          <div>
            {" "}
            <label>Gender : </label> {gender}
          </div>
          <div>
            {" "}
            <label>Reason for joining: </label> {reason}
          </div>
          <div>
            <label>Mode of transport :</label>
            {transport}
          </div>
          <div>
            <button
              style={{ backgroundColor: "#f66161" }}
              onClick={() => {
                const res = confirm("Want to delete?");
                if (res) {
                  this.handleDelete();
                }
              }}
            >
              Delete Student
            </button>
            <button onClick={this.handleUpdate}>Edit Student</button>
            <button onClick={() => push({ pathname: "/app/students" })}>
              Go back to the previous page
            </button>
          </div>
          {/* <div>{id}</div> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const id = state.routing.paramMap.id;
  return {
    student: selectStudent(state, id),
  };
};

export default connect(mapStateToProps, {
  push,
  getStudent,
  deleteStudent,
})(StudentDetails);
