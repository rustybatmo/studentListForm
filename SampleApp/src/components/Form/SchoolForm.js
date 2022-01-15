import React from "react";
import { connect } from "react-redux";
import {
  addSchool,
  getSchool,
  updateSchool,
} from "../../actions/SchoolActions/SchoolActions";
import DynamicForm from "../DynamicForm/DynamicForm";

class SchoolForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { paramMap, id, getSchool } = this.props;

    if (paramMap.hasOwnProperty("id") == true) {
      getSchool(id).then((res) =>
        this.setState({
          formData: res.data,
        })
      );
    }
  }

  handleSubmit() {
    console.log("Submitting school form");
  }
  render() {
    const { updateSchool, addSchool } = this.props;
    return (
      <div>
        <DynamicForm
          title="School registration form"
          formData={this.state.formData}
          pathname="schools"
          editAction={updateSchool}
          addAction={addSchool}
          model={[
            {
              key: "name",
              error: "",
              label: "Name of the school",
              type: "text",
              regEx: /^[a-zA-Z\-]+$/,
            },
            {
              type: "number",
              key: "years",
              error: "",
              label: "Years of operation",
              minLimit: 1,
              maxLimit: 100,
            },
            {
              key: "email",
              type: "email",
              label: "Email",
              error: "",
              regEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            },
            {
              key: "syllabus",
              type: "radio",
              options: ["CBSE", "state board"],
              error: "",
              label: "Syllabus",
            },
            {
              key: "courses",
              type: "checkbox",
              label: "Choose the courses offered",
              options: ["Biology", "Computer Science", "Commerce"],
              error: "",
            },
            {
              key: "address",
              label: "Address",
              type: "textarea",
              error: "",
              minLimit: 1,
              maxLimit: 50,
            },

            {
              key: "pincode",
              error: "",
              label: "Pincode",
              type: "number",
              maxLimit: 10000,
              minLimit: 1,
            },
          ]}
          onSubmit={(model) => {
            this.handleSubmit(model);
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    paramMap: state.routing.paramMap,
    schoolInfo: state.schools,
    id: state.routing.paramMap.id,
  };
};

export default connect(mapStateToProps, { addSchool, updateSchool, getSchool })(
  SchoolForm
);
