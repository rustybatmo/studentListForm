import { connect } from "react-redux";
import Alert from "../../components/Alert/Alert";
import { alertAction } from "../../actions/index.js";

function mapStateToProps() {
  return {
    onSubmitClick: alertAction.ob.resolve,
    onCancelClick: alertAction.ob.reject
  };
}

export default connect(
  mapStateToProps,
  {}
)(Alert);
