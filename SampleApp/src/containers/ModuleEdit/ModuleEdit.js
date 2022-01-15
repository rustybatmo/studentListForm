import React from "react";
import { connect } from "react-redux";
import SchoolForm from "../../components/Form/SchoolForm";
import StudentForm from "../../components/Form/StudentForm";

class ModuleEdit extends React.Component {
  render() {
    const { module, id } = this.props;
    let component;

    if (module === "students") {
      component = <StudentForm id={id} />;
    } else {
      component = <SchoolForm id={id} />;
    }

    return component;
  }
}
const mapStateToProps = (state) => {
  return {
    module: state.routing.paramMap.module,
    id: state.routing.paramMap.id,
    state,
  };
};

export default connect(mapStateToProps)(ModuleEdit);
