import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { replace } from "../../actions";
class Redirect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return null;
  }

  componentDidMount() {
    if (this.props.isMatch) {
      this.props.replace(this.props.to(this.props.location));
    }
  }

  componentDidUpdate() {
    if (this.props.isMatch) {
      this.props.replace(this.props.to(this.props.location));
    }
  }
}

Redirect.propTypes = {
  from: PropTypes.shape({
    name: PropTypes.string,
    module: PropTypes.string
  }),
  to: PropTypes.func
};
function mapStateToProps(state, props) {
  let url = state.routing.urls[props.from.name];

  if (url && url.match == 2) {
    let { module } = props.from;
    if (props.from.module) {
      if (state.routing.paramMap.moduleName == props.from.module) {
        return {
          isMatch: true,
          location: state.routing.location
        };
      }
      return {
        isMatch: false
      };
    }
    return {
      isMatch: true
    };
  }
  return {
    isMatch: false,
    location: state.routing.location
  };
}

export default connect(
  mapStateToProps,
  { replace }
)(Redirect);
