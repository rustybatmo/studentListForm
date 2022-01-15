import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "../ListContainer.module.css";
import { Container } from "@zohodesk/components/lib/Layout";
import Box from "@zohodesk/components/lib/Layout/Box";
import { getSchoolsSelector } from "../../../selectors/selectors";
import { push } from "../../../actions";
import {
  deleteSchool,
  getSchools,
} from "../../../actions/SchoolActions/SchoolActions";

class SchoolListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      scrollY: "",
      start: 0,
      limit: 10,
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleDebounce = this.handleDebounce.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.dispatchGetSchools = this.handleDebounce(
      this.dispatchGetSchools.bind(this),
      300
    );
  }

  componentDidMount() {
    const { getSchools } = this.props;
    const { term, limit, start } = this.state;
    const obj = {
      term,
      limit,
      start,
    };

    getSchools(obj);
  }

  handleScroll(e, listLength) {
    const scroller = e.target;
    let height = scroller.clientHeight;
    let scrollHeight = scroller.scrollHeight - height;
    let scrollTop = scroller.scrollTop;
    let percent = Math.floor((scrollTop / scrollHeight) * 100);

    const { getSchools } = this.props;
    let { start, limit, term } = this.state;

    let _start = start;

    if (percent > 90 && start <= listLength) {
      _start = _start + limit;
      this.setState({
        start: _start,
      });

      const obj = {
        start: _start,
        limit,
        term,
      };

      getSchools(obj);
    }
  }

  handleDelete(id) {
    var result = confirm("Want to delete?");
    if (result) {
      this.props.deleteSchool(id);
    }
  }

  handleDebounce(fn, delay) {
    let timer;
    return () => {
      var context = this,
        args = arguments;

      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  }

  handleSearch(e) {
    const { getSchools } = this.props;

    this.setState(
      {
        term: e.target.value,
        start: 0,
      },
      this.dispatchGetSchools()
    );
  }

  dispatchGetSchools() {
    const { limit, start, term } = this.state;
    const { getSchools } = this.props;
    const obj = {
      term,
      limit,
      start,
    };

    getSchools(obj);
  }

  render() {
    const { schoolList = [], push } = this.props;

    const schoolListUI = schoolList.map((school, index) => {
      return (
        <div className={style.item} key={school.id}>
          <div onClick={() => push({ pathname: `/app/schools/${school.id}` })}>
            <h1> id : {school.id}</h1>
            <h1>{school.name}</h1>
            <h1>{school.age}</h1>
          </div>
          <button
            onClick={() => {
              push({ pathname: `/app/schools/${school.schoolId}/studentlist` });
            }}
          >
            View all students
          </button>
          <button
            className={style.deleteBtn}
            onClick={(e) => {
              this.handleDelete(school.id);
            }}
          >
            Delete
          </button>
          <button
            className={style.editBtn}
            onClick={() => {
              this.props.push({
                pathname: `/app/schools/edit/${school.id}`,
              });
            }}
          >
            Edit
          </button>
          {/* <button onClick = {() => {

          }}>
            Click to view all students
          </button> */}
        </div>
      );
    });
    return (
      <Container>
        <Box>
          <input
            style={{
              padding: "5px 10px",
              borderRadius: " 5px",
              margin: "5px 1rem",
            }}
            type="text"
            onChange={this.handleSearch}
            placeholder="Search a school"
          />

          <button
            className={style.editBtn}
            onClick={() => {
              const { push } = this.props;
              push({ pathname: "/app/schools/new" });
            }}
          >
            Add a new school
          </button>
        </Box>

        <Box
          onScroll={(e) => this.handleScroll(e, schoolList.length)}
          flexible
          scroll="vertical"
        >
          {schoolList.length === 0 ? (
            <div>No schools available</div>
          ) : (
            schoolListUI
          )}
        </Box>
      </Container>
    );
  }
}

SchoolListContainer.propTypes = {
  push: PropTypes.func,
  getSampleList: PropTypes.func,
  getStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const schools = state.schools;

  return {
    schoolList: getSchoolsSelector(schools),
  };
};

export default connect(mapStateToProps, {
  push,
  getSchools,
  deleteSchool,
})(SchoolListContainer);
