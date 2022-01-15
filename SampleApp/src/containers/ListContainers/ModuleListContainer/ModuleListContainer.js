import React from "react";
import { connect } from "react-redux";
import SchoolListContainer from "../SchoolListContainer/SchoolListContainer";
import StudentListContainer from "../StudentListContainer/StudentListContainer";

class ModuleListContainer extends React.Component {
  render() {
    const { module } = this.props;
    let component;
    if (module === "students") {
      component = <StudentListContainer />;
    } else component = <SchoolListContainer />;
    return component;
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    module: state.routing.paramMap.module,
  };
};
export default connect(mapStateToProps)(ModuleListContainer);
