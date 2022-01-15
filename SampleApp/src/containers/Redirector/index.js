import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Redirect from "../Redirect";

class Redirector extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { urls } = this.props;
    return (
      <div style={{ display: "none" }}>
        {urls.map((url, i) => (
          <Redirect
            key={`redirect${i}`}
            from={{ name: url.name, module: url.module }}
            to={location =>
              Object.assign({}, location, {
                pathname: `${url.pathname}`
              })
            }
          />
        ))}
      </div>
    );
  }
}

Redirector.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
  const urls = [
    {
      name: "sampleList",
      module: "sample",
      pathname: `${state.routing.location.pathname}/sample`
    }
  ];

  return { urls };
}
export default connect(mapStateToProps)(Redirector);
