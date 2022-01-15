import React from "react";
import { connect } from "react-redux";
import StudentForm from "../../components/Form/StudentForm";
import StudentDetails from "../../components/StudentDetails/StudentDetails";

class StudentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      component: null,
    };
  }

  render() {
    const { state, paramMap } = this.props;
    let component = null;
    if (paramMap.page !== "new") {
      const id = paramMap.page;

      component = <StudentDetails id={id} />;
    } else {
      component = <StudentForm />;
    }

    return <div>{component}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    state,
    paramMap: state.routing.paramMap,
  };
};

export default connect(mapStateToProps, {})(StudentContainer);
