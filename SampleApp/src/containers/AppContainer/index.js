import React from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import CustomMatch from "../CustomMatch";
import Redirector from "../Redirector";
import { Container, Box } from "@zohodesk/components";
import style from "./index.module.css";
import Header from "../Header";

import { push, alertAction } from "../../actions";
import StudentForm from "../../components/Form/StudentForm";

import ModuleListContainer from "../ListContainers/ModuleListContainer/ModuleListContainer";
import ModulePage from "../ModulePage/ModulePage";
import ModuleEdit from "../ModuleEdit/ModuleEdit";
import ModuleList from "../ModuleList/ModuleList";

// import StudentDetails from "../../components/StudentDetails/StudentDetails";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getId = this.getId.bind(this);
    this.id = "";
  }
  componentDidMount() {
    /*const { showConfirmBox } = this.props;

    showConfirmBox({
      type: "confirmation",
      submitText: "Yes",
      cancelText: "Cancel",
      title: "Alert",
      iconName: "notifiExclamation",
      message: "Are you sure?",
      isActive: true,
      palette: "danger"
    })
      .then(() => {
        logger.log("Suceess");
      })
      .catch(() => {
        logger.log("Cancel");
      });*/
  }

  getId(id) {
    // console.log("This is the id" + id);
    this.setState({
      id: id,
    });

    this.props.push({ pathname: "/app/editStudent" });
  }
  render() {
    const { alertData, paramMap = {} } = this.props;

    return (
      <Container
        className={style.deskContainer}
        onMouseOver={this.handleOver}
        scroll="none"
        tagName="div"
      >
        <Redirector />

        <Box tagName="header">
          <Header />
        </Box>

        <Box className={style.posrel} flexible tagName="section">
          <Container
            alignBox="row"
            className={`${style.container}`}
            tagName="section"
          >
            <Box className={""} flexible tagName="article" scroll="vertical">
              <CustomMatch name="module" isExactly>
                <ModuleListContainer />
              </CustomMatch>
              <CustomMatch name="modulePage" isExactly>
                <ModulePage />
              </CustomMatch>
              <CustomMatch name="edit" isExactly>
                <ModuleEdit />
              </CustomMatch>
              <CustomMatch name="list" isExactly>
                <ModuleList />j
              </CustomMatch>
            </Box>
          </Container>

          {alertData.isActive && (
            <AlertContainer
              alertData={alertData}
              isActive={alertData.isActive}
              palette={alertData.palette}
              type={alertData.type}
            />
          )}
        </Box>
      </Container>
    );
  }
}

AppContainer.propTypes = {
  push: PropTypes.func,
  alertData: PropTypes.object,
  paramMap: PropTypes.object,
  showConfirmBox: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => {
  const { alertData, routing } = state;
  const { paramMap } = routing;
  return { alertData, paramMap };
};
export default connect(mapStateToProps, {
  push,
  showConfirmBox: alertAction.showConfirmBox,
})(AppContainer);
