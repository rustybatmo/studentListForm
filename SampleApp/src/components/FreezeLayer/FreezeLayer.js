import React, { Component } from "react";
import PropTypes from "prop-types";

import style from "./FreezeLayer.css";
import { Container, Animation } from "@zohodesk/components";
export default class FreezeLayer extends Component {
  constructor(props) {
    super(props);
    this.state = { isActive: props.isActive, isChildActive: false };
    this.toggleChild = this.toggleChild.bind(this);
  }

  toggleChild() {
    this.setState({ isChildActive: !this.state.isChildActive });
  }

  render() {
    let {
      children,
      align,
      childAnimationName,
      palette,
      onClick,
      animationName,
      zIndex,
      isActive
    } = this.props;
    let { isChildActive } = this.state;
    return (
      <Animation
        name={animationName}
        isActive={isActive}
        onExit={this.toggleChild}
        onEntered={this.toggleChild}
        delayClassName={childAnimationName ? style.delay : ""}
        exitDuration={childAnimationName && 500}
      >
        <div
          className={`
              ${style.container} ${style[`index${zIndex}`]}  ${style[palette]}
            `}
          onClick={onClick ? onClick : null}
        >
          {children && (
            <Container alignBox="row" align={align}>
              {childAnimationName ? (
                <Animation name={childAnimationName} isActive={isChildActive}>
                  {children}
                </Animation>
              ) : (
                children
              )}
            </Container>
          )}
        </div>
      </Animation>
    );
  }
}
FreezeLayer.propTypes = {
  align: PropTypes.oneOf(["horizontal", "vertical", "both"]),
  animationName: PropTypes.oneOf([
    "zoomIn",
    "scaleIn",
    "fadeIn",
    "slideLeft",
    "slideDown",
    "skewIn",
    "default",
    "none"
  ]),
  childAnimationName: PropTypes.string,
  children: PropTypes.node,
  isActive: PropTypes.bool,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  palette: PropTypes.oneOf(["dark", "default", "darkLight", "plain", "snow"]),
  zIndex: PropTypes.oneOf(["3", "5", "7", "10"])
};
FreezeLayer.defaultProps = {
  animationName: "default",
  isActive: false,
  palette: "default",
  zIndex: "5"
};
