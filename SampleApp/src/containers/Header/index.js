import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./index.module.css";
import { push, alertAction } from "../../actions";

import { URL_PREFIX } from "../../util/Common";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [
        // {
        //   url: `${URL_PREFIX}/sample`,
        //   name: "Sample",
        //   apiName: "sample",
        //   id: "1",
        // },
        {
          url: `${URL_PREFIX}/students`,
          name: "students",
          apiName: "students",
          id: "1",
        },
        {
          url: `${URL_PREFIX}/schools`,
          name: "schools",
          apiName: "schools",
          id: "2",
        },
      ],
      selectedTab: "students",
    };
    this.changeTab = this.changeTab.bind(this);
  }
  changeTab(e) {
    e.preventDefault();
    let { push } = this.props;

    push({ pathname: e.target.getAttribute("href") });
  }
  render() {
    let { tabs, selectedTab } = this.state;
    const { topbar, menuUl, menuli, menuliActive, menuLink } = style;

    tabs = tabs.map((tab, index) => {
      const { apiName, url, name } = tab;

      const tabClass =
        selectedTab === apiName ? menuli + " " + menuliActive : menuli;
      return (
        <li className={tabClass} key={index}>
          <a href={url} className={menuLink} onClick={this.changeTab}>
            {name}
          </a>
        </li>
      );
    });
    return (
      <div className={topbar}>
        <ul className={menuUl}>{tabs}</ul>
      </div>
    );
  }
}

Header.propTypes = {
  push: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, {
  push,
  showConfirmBox: alertAction.showConfirmBox,
})(Header);
