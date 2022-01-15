import React from "react";
import PropTypes from "prop-types";
import style from "./Slider.css";
import FreezeLayer from "../FreezeLayer/FreezeLayer";

import { Animation } from "@zohodesk/components";
export default class Slider extends React.Component {
  render() {
    let { children, needFreeze, isActive, onClick, palette, size } = this.props;
    return needFreeze ? (
      <FreezeLayer
        onClick={onClick}
        isActive={isActive}
        animationName="fadeIn"
        childAnimationName="slideLeft"
        palette={palette}
      >
        <div
          className={`${style.container} ${isActive ? "" : style.close}  ${
            style[size]
          }`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </FreezeLayer>
    ) : (
      <Animation isActive={isActive} name="slideLeft">
        <div
          className={`${style.container} ${style[size]}`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </Animation>
    );
  }
}
Slider.propTypes = {
  children: PropTypes.node,
  isActive: PropTypes.bool,
  needFreeze: PropTypes.bool,
  onClick: PropTypes.func,
  palette: PropTypes.oneOf(["dark", "default", "darkLight", "plain"]),
  size: PropTypes.oneOf(["small", "xsmall", "medium", "large"])
};
Slider.defaultProps = {
  isActive: false,
  palette: "default",
  size: "xsmall"
};
