import React from "react";
import { connect } from "react-redux";
import SchoolForm from "../../components/Form/SchoolForm";
import StudentForm from "../../components/Form/StudentForm";
import SchoolDetails from "../../components/SchoolDetails/SchoolDetails";
import StudentDetails from "../../components/StudentDetails/StudentDetails";

class ModulePage extends React.Component {
  render() {
    const { module, page } = this.props;

    let component;
    if (page === "new") {
      if (module === "students") {
        component = <StudentForm />;
      } else component = <SchoolForm />;
    } else {
      if (module === "students") {
        component = <StudentDetails id={page} />;
      } else {
        component = <SchoolDetails id={page} />;
      }
    }

    return component;
  }
}
const mapStateToProps = (state) => {
  return {
    state,
    module: state.routing.paramMap.module,
    page: state.routing.paramMap.page,
  };
};
export default connect(mapStateToProps)(ModulePage);
