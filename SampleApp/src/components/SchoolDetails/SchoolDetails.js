import Box from "@zohodesk/components/lib/Layout/Box";
import Container from "@zohodesk/components/lib/Layout/Container";
import React from "react";
import { connect } from "react-redux";
import { push } from "../../actions";
import {
  deleteSchool,
  getSchool,
} from "../../actions/SchoolActions/SchoolActions";

import {
  getSchoolSelector,
  getSchoolsSelector,
} from "../../selectors/selectors";
import styles from "./SchoolDetails.module.css";

class SchoolDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      school: {},
      apiCalled: false,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleDelete() {
    const { deleteSchool, push } = this.props;
    const { id, apiCalled } = this.state;
    if (apiCalled === false) {
      this.setState(
        {
          apiCalled: true,
        },
        () => {
          deleteSchool(id);
          push({ pathname: "/app/schools" });
        }
      );
    }
  }

  handleUpdate() {
    const { push } = this.props;
    const { id } = this.state;
    push({ pathname: `/app/schools/edit/${id}` });
  }

  componentDidMount() {
    const { getSchool } = this.props;
    const { id } = this.state;
    getSchool(id).then((res) => {
      console.log(res.data);
      const school = res.data;
      this.setState({
        school: school,
      });
    });
  }

  render() {
    const { school } = this.state;
    const {
      name,
      years,
      email,
      syllabus,
      courses,
      address,
      pincode,
      id,
    } = school;
    const { push } = this.props;
    return (
      //   <div>This is the school details</div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 style={{ fontSize: "30px" }}>School Details Page</h1>
        </div>
        <div className={styles.deetSection}>
          <div>
            <label>Name : </label>
            {name}
          </div>
          <div>
            <label>Years : </label> {years}
          </div>
          <div>
            <label>Syllabus :</label> {syllabus}
          </div>
          <div>
            <label>Email :</label> {email}
          </div>
          <div>
            <label>ID :</label> {id}
          </div>
          <div>
            {" "}
            <label>Courses : </label> {courses}
          </div>
          <div>
            {" "}
            <label>Address</label> {address}
          </div>
          <div>
            <label>Pincode:</label>
            {pincode}
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
              Delete school
            </button>
            <button onClick={this.handleUpdate}>Edit school</button>
            <button onClick={() => push({ pathname: "/app/schools" })}>
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
    school: getSchoolSelector(state, id),
  };
};

export default connect(mapStateToProps, {
  push,
  getSchool,
  deleteSchool,
})(SchoolDetails);
