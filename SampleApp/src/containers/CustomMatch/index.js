import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { replace } from "../../actions";
class CustomMatch extends Component {
  render() {
    let { children, isMatch } = this.props;
    return (isMatch && React.Children.only(children)) || null;
  }
}

export default connect(
  (state, props) => {
    let isMatch;
    if (Array.isArray(props.names)) {
      isMatch = props.names.some(urlObj => {
        let { name, module, isExactly } = urlObj || {};
        const { paramMap = {}, urls } = state.routing;
        let url = urls[name] || {};

        let { moduleName } = paramMap;
        if ((isExactly && url.match === 2) || (!isExactly && url.match)) {
          isMatch = true;
          return module ? moduleName === module : isMatch;
        }
        return false;
      });
    } else {
      let url = state.routing.urls[props.name];
      if (url) {
        isMatch =
          (props.isExactly && url.match === 2) ||
          (!props.isExactly && url.match);
        if (isMatch && Array.isArray(props.module)) {
          let modules = props.module;
          isMatch = modules.some(module => {
            return state.routing.paramMap.moduleName === module;
          });
        } else if (isMatch && props.module) {
          isMatch = state.routing.paramMap.moduleName === props.module;
        }
      }
    }
    isMatch =
      !isMatch && props.orMapStateMatch
        ? props.orMapStateMatch(state)
        : isMatch;
    return {
      isMatch: isMatch ? true : false,
      isAuthenticate: props.checkAuthenticate
        ? props.checkAuthenticate(state)
        : true
    };
  },
  { replace }
)(CustomMatch);

CustomMatch.defaultProps = {
  isExactly: false
};
CustomMatch.propTypes = {
  children: PropTypes.element,
  isExactly: PropTypes.bool,
  isMatch: PropTypes.bool
};
