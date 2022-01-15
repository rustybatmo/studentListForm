import React, { Component } from "react";
import PropTypes from "prop-types";
import { URL_PREFIX } from "../../util/Common";
import { Button, Container, Box, Switch } from "@zohodesk/components";
import Card, {
  CardHeader,
  CardContent,
} from "@zohodesk/components/lib/Card/Card";
import style from "./Sample.module.css";

/**
 * BlockList
 */
class SampleList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let { samples = {} } = this.props;

    samples = samples.map((sample, index) => {
      const { id, name, status } = sample;
      const url = `${URL_PREFIX}/block/${id}`;
      const editUrl = `${URL_PREFIX}/block/${id}/edit`;

      return (
        <div key={id} className={style.listItem}>
          {id}-{name}
        </div>
      );
    });

    if (samples.length === 0) {
      samples = <div>There is no samples</div>;
    }
    return (
      <Card isScrollAttribute={true}>
        <CardHeader>
          <div className={style.addButtonContainer}>
            <Button
              palette="primaryFilled"
              size="medium"
              text="Add Sample"
              onClick={this.goAddForm}
            />
          </div>
        </CardHeader>

        <CardContent isScrollAttribute={true} scroll="vertical">
          <div className={style.listContainer}>{samples}</div>
        </CardContent>
      </Card>
    );
  }
}

SampleList.propTypes = {
  push: PropTypes.func,
  samples: PropTypes.object,
};

export default SampleList;
