import React, { Component } from "react";
import PropTypes from "prop-types";
import style from "./Alert.module.css";
import {
  TopbandFontIcon,
  TicketsFontIcon,
  CommonFontIcon,
  Button
} from "@zohodesk/components";

import FreezeLayer from "../FreezeLayer/FreezeLayer";

export default class Alert extends Component {
  constructor(props) {
    super(props);
    this.documentKeyupHandler = this.documentKeyupHandler.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keyup", this.documentKeyupHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.documentKeyupHandler);
  }

  documentKeyupHandler(e = {}) {
    e && e.preventDefault();
    let { onSubmitClick, onCancelClick, isActive } = this.props;
    if (e.keyCode === 27 && isActive) {
      onCancelClick();
    } else if (e.keyCode === 13 && isActive) {
      onSubmitClick();
    }
  }

  render() {
    let {
      onSubmitClick,
      onCancelClick,
      alertData,
      isActive,
      palette,
      type
    } = this.props;
    let {
      iconName,
      iconSize,
      title,
      message,
      confirmationMessage,
      submitText,
      cancelText,
      isBoldIcon
    } = alertData;
    return (
      <FreezeLayer
        zIndex="7"
        isActive={isActive}
        animationName="fadeIn"
        childAnimationName="scaleIn"
        align="both"
      >
        <div className={`${style[palette]}`}>
          <div className={style.container}>
            <div className={style.header}>
              <span className={style.icon}>
                {iconName === "splitNew" ? (
                  <TicketsFontIcon
                    name={iconName}
                    size="14"
                    isBold={isBoldIcon}
                  />
                ) : iconName === "taskDemo" ? (
                  <TopbandFontIcon
                    name={iconName}
                    size={iconSize ? iconSize : "15"}
                    isBold={isBoldIcon}
                  />
                ) : (
                  <CommonFontIcon
                    name={iconName || ""}
                    size={iconSize ? iconSize : "15"}
                    isBold={isBoldIcon}
                  />
                )}
              </span>
              <span className={style.title}>{title}</span>
            </div>
            <div className={style.middle}>
              <div dangerouslySetInnerHTML={{ __html: message }} />
              {confirmationMessage && (
                <div className={style.text}>{confirmationMessage}</div>
              )}
              <div className={style.footer}>
                <span className={`${style.button}`}>
                  <Button
                    text={submitText}
                    palette={
                      palette === "success" ? "primaryFilled" : "dangerFilled"
                    }
                    onClick={onSubmitClick}
                  />
                </span>
                {type === "confirmation" && (
                  <span className={`${style.button}`}>
                    <Button
                      text={cancelText}
                      palette="secondary"
                      onClick={onCancelClick}
                    />
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </FreezeLayer>
    );
  }
}

Alert.propTypes = {
  alertData: PropTypes.object,
  isActive: PropTypes.bool,
  onCancelClick: PropTypes.func,
  onSubmitClick: PropTypes.func,
  palette: PropTypes.oneOf(["success", "danger"]),
  type: PropTypes.oneOf(["alert", "confirmation"])
};
Alert.defaultProps = {
  isActive: false,
  palette: "danger"
};
