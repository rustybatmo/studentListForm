import Radio from "@zohodesk/components/lib/Radio/Radio";
import React from "react";
import { connect } from "react-redux";
import {
  addStudent,
  getStudent,
  getStudentsBySchoolId,
  updateStudent,
} from "../../actions/StudentActions/StudentActions";
import { createBrowserHistory } from "history";
import CustomMatch from "../../containers/CustomMatch";
import ListContainer from "../../containers/SampleListContainer/ListContainer";
import { push } from "../../actions";
import "./StudentForm.css";
import DynamicForm from "../DynamicForm/DynamicForm";
import { getSchools } from "../../actions/SchoolActions/SchoolActions";
import { getSchoolsWithLabelAndId } from "../../selectors/selectors";

class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { paramMap, id, getStudent, getSchools } = this.props;

    getSchools();

    if (paramMap.hasOwnProperty("id") == true) {
      getStudent(paramMap.id).then((res) =>
        this.setState({
          formData: res.data,
        })
      );
    }
  }

  componentDidUpdate() {
    const { schoolsWithLabelAndId } = this.props;
    if (!this.state.schoolNamesAndIds) {
      this.setState({
        schoolNamesAndIds: schoolsWithLabelAndId,
      });
    }
  }

  handleSubmit(model) {
    const { paramMap, id, getStudent } = this.props;
    if (paramMap.hasOwnProperty("id") == true) {
      const obj = { ...model };
      obj.id = id;
      console.log(obj);
      this.props.updateStudent(obj);
    } else {
      this.props.addStudent(model);
    }

    this.props.push({ pathname: "/app/students" });
  }

  render() {
    const {
      addStudent,
      updateStudent,
      schoolsWithLabelAndId = [],
    } = this.props;
    const { schoolNamesAndIds = [] } = this.state;

    return (
      <div>
        <div>
          <DynamicForm
            title="Student registration form"
            formData={this.state.formData}
            editAction={updateStudent}
            addAction={addStudent}
            pathname="students"
            model={[
              {
                key: "name",
                error: "",
                label: "Name",
                type: "text",
                regEx: /^[a-zA-Z\-]+$/,
                condition: null,
              },
              {
                key: "age",
                error: "",
                label: "Age",
                type: "number",
                maxLimit: 15,
                minLimit: 5,
              },
              {
                key: "email",
                type: "email",
                label: "Email",
                error: "",
                regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              },
              {
                key: "gender",
                type: "radio",
                options: ["male", "female"],
                error: "",
                label: "Gender",
              },
              {
                key: "reason",
                label: "Reason",
                type: "textarea",
                error: "",
                minLimit: 5,
                maxLimit: 20,
              },
              {
                type: "select",
                key: "transport",
                label: "Transport",
                options: [
                  { label: "Bus" },
                  { label: "Cab" },
                  { label: "Train" },
                  { label: "Two-wheeler" },
                ],
                error: "",
              },
              {
                type: "select",
                key: "schoolId",
                label: "Choose a school",
                options: schoolNamesAndIds,
                error: "",
              },
              {
                key: "clubs",
                type: "checkbox",
                label: "Choose the club that you want to be a part of",
                options: ["football", "cricket", "badminton"],
                error: "",
              },
            ]}
            onSubmit={(model) => {
              this.handleSubmit(model);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    paramMap: state.routing.paramMap,
    studentInfo: state.students,
    id: state.routing.paramMap.id,
    schoolsWithLabelAndId: getSchoolsWithLabelAndId(state),
  };
};

export default connect(mapStateToProps, {
  addStudent,
  updateStudent,
  push,
  getStudent,
  getSchools,
})(StudentForm);
