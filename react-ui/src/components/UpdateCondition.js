import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSingleConditionThunk } from "../redux/singleCondition";
import { toast } from "react-toastify";
class UpdateCondition extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      diagnosed: "",
      typeOfPain: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const con = this.state.name;
    const id = this.props.condition.id;
    this.props.updateCondition(id, this.state);
    this.setState({
      name: "",
      diagnosed: "",
      typeOfPain: "",
    });
    toast(
      `${this.state.name !== "" ? con : this.props.condition.name} updated!`
    );
    this.props.close();
  }
  render() {
    const name = this.props.condition.name;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Update Condition</h1>
        <div>
          <input
            className="input"
            placeholder={name}
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
        <br />

        <div>
          <label>
            Is it diagnosed?
            <select
              onChange={this.handleChange}
              value={this.state.diagnosed}
              name="diagnosed"
            >
              <option value=""></option>
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </label>
        </div>
        <br />

        <div>
          <label>
            Type of pain?
            <select
              onChange={this.handleChange}
              value={this.state.typeOfPain}
              name="typeOfPain"
            >
              <option value=""></option>
              <option value="mental health">mental health</option>
              <option value="physical">physical</option>
            </select>
          </label>
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    condition: state.condition,
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCondition: (id, condition) =>
      dispatch(updateSingleConditionThunk(id, condition)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateCondition);
