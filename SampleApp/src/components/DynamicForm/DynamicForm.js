import React from "react";
import { push } from "../../actions";
// import {
//   addStudent,
//   updateStudent,
// } from "../../actions/StudentActions/StudentActions";
import { connect } from "react-redux";
import { getSchool } from "../../actions/SchoolActions/SchoolActions";

class DynamicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: props.model,
      formData: props.formData,
      apiCalled: false,
      valueEmpty: `Value can't be left empty`,
      valueIncorrect: `Please enter valid`,
    };

    this.renderedForm = this.renderedForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }

  componentDidMount() {
    const { formData } = this.props;

    this.setState({
      formData: formData,
    });
  }

  componentDidUpdate(prevProps) {
    const { formData, model } = this.props;
    if (prevProps.formData !== formData) {
      this.setState({
        formData,
      });
    }

    if (prevProps.model !== model) {
      this.setState({
        model,
      });
    }
  }

  handleCheckBox(e, value, name, type) {
    if (type === "checkbox") {
      if (e.target.checked === true) {
        let arr = this.state[name] || [];

        if (!arr.includes(value)) {
          arr.push(value);

          this.setState({
            [name]: arr,
          });
        }
      } else {
        let arr = this.state[name] || [];
        let filteredArr = arr.filter((item) => item !== value);
        this.setState({
          [name]: filteredArr,
        });
      }
    }
  }

  handleChange(e, key) {
    const value = e.target.value;
    const name = key;
    const type = e.target.type;

    const formData = { ...this.state.formData };
    formData[name] = value;

    const model = this.state.model;

    const newModel = model.map((m) => {
      if (m.key === key) {
        const obj = {
          ...m,
        };
        obj.error = "";
        return obj;
      } else return m;
    });

    type === "checkbox"
      ? this.handleCheckBox(e, value, name, type)
      : this.setState({
          formData: formData,
          model: newModel,
        });
  }

  handleCheckBox(e, value, name, type) {
    const { model } = this.state;
    const newModel = model.map((m) => {
      if (m.key === name) {
        const obj = {
          ...m,
        };
        obj.error = "";
        return obj;
      } else return m;
    });

    if (e.target.checked === true) {
      let arr = this.state.formData[name] || [];

      if (!arr.includes(value)) {
        arr.push(value);

        const formData = { ...this.state.formData };
        formData[name] = arr;
        this.setState({
          formData: formData,
          model: newModel,
        });
      }
    } else {
      let arr = this.state.formData[name] || [];
      let filteredArr = arr.filter((item) => item !== value);
      const formData = { ...this.state.formData };
      formData[name] = filteredArr;
      this.setState({
        formData: formData,
      });
    }
  }

  renderedForm() {
    const model = this.state.model;
    const formData = this.state.formData;

    const formUI = model.map((m) => {
      if (m.type === "select") {
        console.log("this is the select school");
        console.log(m);
      }
      const type = m.type;
      const key = m.key;
      const props = m.props;
      const label = m.label;

      let item;
      if (type === "text" || type === "number" || type === "email") {
        item = (
          <div>
            <label htmlFor={key}>{m.label}</label>
            <input
              onChange={(e) => this.handleChange(e, m.key)}
              type={type}
              name={key}
              value={this.state.formData[key]}
            />
            <div style={{ color: "red" }}>{m.error}</div>
          </div>
        );
      } else if (type === "textarea") {
        item = (
          <div>
            <label>{m.label}</label>
            <textarea
              value={formData[key]}
              onChange={(e) => this.handleChange(e, key)}
              {...props}
            />
            <div style={{ color: "red" }}>{m.error}</div>
          </div>
        );
      } else if (type === "radio") {
        let options = m.options;

        const temp = (
          <div>
            {options.map((option) => {
              let checked = false;
              const value = formData[key];
              if (value === option) {
                checked = true;
              }

              return (
                <div key={option}>
                  <label htmlFor={option}>{option}</label>
                  <input
                    type="radio"
                    id={option}
                    name={key}
                    value={option}
                    onChange={(e) => this.handleChange(e, key)}
                    checked={checked}
                  />
                  {/* <div style={{ color: "red" }}>{m.error}</div> */}
                </div>
              );
            })}
          </div>
        );
        const item = (
          <div>
            {temp}
            <div style={{ color: "red" }}>{m.error}</div>
          </div>
        );
        return item;
      } else if (type === "select") {
        let choices = m.options;
        let value = formData[key];

        item = (
          <div>
            <label>{key}</label>
            <select
              name={key}
              value={value}
              onChange={(e) => this.handleChange(e, key)}
            >
              {choices.map((choice, index) => {
                return (
                  <option key={choice.label} value={choice.id}>
                    {choice.label}
                  </option>
                );
              })}
            </select>
            <div style={{ color: "red" }}>{m.error}</div>
          </div>
        );
      } else if (type === "checkbox") {
        let options = m.options;
        let value = formData[key];
        // console.log(value);
        item = (
          <div>
            <label>{label}</label>
            {options.map((option) => {
              let checked = false;
              if (value) {
                if (value.includes(option)) {
                  checked = true;
                }
              }
              return (
                <div>
                  <div key={option}>
                    <label htmlFor={option}>{option}</label>
                    <input
                      onClick={(e) => this.handleChange(e, key)}
                      type={type}
                      id={option}
                      name={key}
                      value={option}
                      checked={checked}
                    />
                  </div>
                </div>
              );
            })}
            <div style={{ color: "red" }}>{m.error}</div>
          </div>
        );
      }

      return <div key={key}>{item}</div>;
    });

    return formUI;
  }

  handleSubmit(e) {
    e.preventDefault();
    const errorFree = this.handleValidation();
    const { formData, apiCalled } = this.state;
    const {
      editAction,
      push,
      addAction,
      paramMap,
      pathname,
      getSchool,
    } = this.props;

    let id;

    if (errorFree) {
      if (paramMap.hasOwnProperty("id")) {
        if (!apiCalled) {
          this.setState({
            apiCalled: true,
          });
          editAction(formData).then((res) => {
            const id = res.data.id;
            push({ pathname: `/app/${pathname}/${id}` });
          });
        }
      } else {
        if (!apiCalled) {
          console.log("Is this coming into this?");
          this.setState({
            apiCalled: true,
          });
          addAction(formData).then((res) => {
            const id = res.data.id;
            push({ pathname: `/app/${pathname}/${id}` });
          });
        }
      }
    }
  }

  handleValidation(e) {
    const { model, valueEmpty, valueIncorrect } = this.state;
    const newModel = model.map((item, index) => {
      const { type, key } = item;
      const wrongData = valueIncorrect + ` ${key}`;
      const value = this.state.formData[key];

      let obj = {};

      if (type === "text") {
        const { regEx } = item;
        if (!value) {
          obj = {
            ...item,
            error: valueEmpty,
          };
        } else if (!regEx.test(value)) {
          obj = {
            ...item,
            error: wrongData,
          };
        } else {
          obj = {
            ...item,
            error: "",
          };
        }
        return obj;
      } else if (type === "number") {
        const { minLimit, maxLimit } = item;
        if (!value) {
          obj = {
            ...item,
            error: valueEmpty,
          };
        } else if (!(minLimit <= value && value <= maxLimit)) {
          obj = {
            ...item,
            error: wrongData,
          };
        } else {
          obj = {
            ...item,
            error: "",
          };
        }
        return obj;
      } else if (type === "email") {
        const { regEx } = item;
        if (!value) {
          obj = {
            ...item,
            error: valueEmpty,
          };
        } else if (!regEx.test(value)) {
          obj = {
            ...item,
            error: wrongData,
          };
        } else {
          obj = {
            ...item,
            error: "",
          };
        }
        return obj;
      } else if (type === "radio") {
        obj = { ...item };
        if (!value) {
          obj.error = valueEmpty;
        } else {
          obj.error = "";
        }
        return obj;
      } else if (type === "textarea") {
        const { minLimit, maxLimit } = item;
        obj = { ...item };

        if (!value) {
          obj.error = valueEmpty;
        } else if (!(minLimit <= value.length && value.length <= maxLimit)) {
          obj.error = wrongData;
        } else {
          obj.error = "";
        }
        return obj;
      } else if (type === "select") {
        return item;
      } else if (type === "checkbox") {
        obj = { ...item };
        if (!value || value.length === 0) {
          obj.error = valueEmpty;
        } else {
          obj.error = "";
        }
        return obj;
      }
    });
    let errorExists = false;
    newModel.every((mdl) => {
      if (mdl.error !== "") {
        errorExists = true;
        return false;
      } else return true;
    });

    this.setState({
      model: newModel,
    });
    if (errorExists === false) {
      return true;
    } else return false;
  }

  render() {
    const title = this.props.title;
    const { push } = this.props;
    let action;
    if (this.props.paramMap.hasOwnProperty("id") == true) {
      action = "Update";
    } else action = "Submit";
    return (
      <div>
        <h1>{title}</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderedForm()}
          <button type="submit">{action}</button>
          <button
            style={{
              padding: "0.5rem",
              margin: "0.5rem",
              backgroundColor: "#f66161",
            }}
            onClick={() => push({ pathname: "/app/students/" })}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // id: state.routing.paramMap.id,
    paramMap: state.routing.paramMap,
  };
};

export default connect(mapStateToProps, {
  // updateStudent,
  push,
  // addStudent,
})(DynamicForm);
