import React from "react";
import StudentsOfSchool from "./StudentsOfSchoolList";
import { connect } from "react-redux";

class ModuleList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { module, id, list } = this.props;
    let component;
    if (module === "schools") {
      component = <StudentsOfSchool schoolId={id} />;
    }
    return component;
  }
}

const mapStateToProps = (state) => {
  const paramMap = state.routing.paramMap;
  return {
    // state,
    module: paramMap.module,
    id: paramMap.id,
    list: paramMap.list,
  };
};

export default connect(mapStateToProps)(ModuleList);
