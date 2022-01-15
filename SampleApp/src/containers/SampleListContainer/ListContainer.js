import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { push } from "../../actions";
import style from "./ListContainer.module.css";
import {
  deleteStudent,
  getStudents,
} from "../../actions/StudentActions/StudentActions";

import { Container } from "@zohodesk/components/lib/Layout";
import Box from "@zohodesk/components/lib/Layout/Box";
import { selectStudents } from "../../selectors/selectors";

class ListContainer extends Component {
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

    this.dispatchGetStudents = this.handleDebounce(
      this.dispatchGetStudents.bind(this),
      300
    );
  }

  componentDidMount() {
    const { getStudents } = this.props;
    const { term, limit, start } = this.state;
    const obj = {
      term,
      limit,
      start,
    };

    getStudents(obj);
  }

  handleScroll(e, listLength) {
    const scroller = e.target;
    let height = scroller.clientHeight;
    let scrollHeight = scroller.scrollHeight - height;
    let scrollTop = scroller.scrollTop;
    let percent = Math.floor((scrollTop / scrollHeight) * 100);

    const { getStudents } = this.props;
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

      getStudents(obj);
    }
  }

  handleDelete(id) {
    var result = confirm("Want to delete?");
    if (result) {
      this.props.deleteStudent(id);
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
    const { getStudents } = this.props;

    this.setState(
      {
        term: e.target.value,
        start: 0,
      },
      this.dispatchGetStudents()
    );
  }

  dispatchGetStudents() {
    const { limit, start, term } = this.state;
    const { getStudents } = this.props;
    const obj = {
      term,
      limit,
      start,
    };

    getStudents(obj);
  }

  render() {
    const { studentList = [] } = this.props;

    const studentListUI = studentList.map((student, index) => {
      return (
        <div className={style.item} key={student.id}>
          <div
            onClick={() =>
              this.props.push({ pathname: `/app/students/${student.id}` })
            }
          >
            <h1> id : {student.id}</h1>
            <h1>{student.name}</h1>
            <h1>{student.age}</h1>
          </div>
          <button
            className={style.deleteBtn}
            onClick={(e) => {
              this.handleDelete(student.id);
            }}
          >
            Delete
          </button>
          <button
            className={style.editBtn}
            onClick={() => {
              this.props.push({
                pathname: `/app/students/edit/${student.id}`,
              });
            }}
          >
            Edit
          </button>
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
            placeholder="Search a student"
          />

          <button
            className={style.editBtn}
            onClick={() => {
              const { push } = this.props;
              push({ pathname: "/app/students/new" });
            }}
          >
            Add a new Student
          </button>
        </Box>

        <Box
          onScroll={(e) => this.handleScroll(e, studentList.length)}
          flexible
          scroll="vertical"
        >
          {studentList.length === 0 ? (
            <div>No students available</div>
          ) : (
            studentListUI
          )}
        </Box>
      </Container>
    );
  }
}

ListContainer.propTypes = {
  push: PropTypes.func,
  getSampleList: PropTypes.func,
  getStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const studentList = selectStudents(state);
  return { state, studentList: studentList };
};

export default connect(mapStateToProps, {
  push,
  getStudents,
  deleteStudent,
})(ListContainer);
