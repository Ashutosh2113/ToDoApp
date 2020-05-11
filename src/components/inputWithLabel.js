import React from "react";
import { Input, DatePicker } from "antd";
import moment from "moment";
import "antd/dist/antd.css"; //Added afterwads because code sandbox style was not imorted.

export default class InputWithLabel extends React.PureComponent {
  render() {
    return (
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {this.props.label && (
          <div style={{ marginBottom: 10 }}>
            <label>{this.props.label}</label>
          </div>
        )}
        {this.props.inputType !== "datePicker" ? (
          <Input
            value={this.props.value}
            placeholder=""
            onChange={this.props.textChange}
          />
        ) : (
          <DatePicker
            value={moment(this.props.value, "DD-MM-YYYY")}
            format={"DD-MM-YYYY"}
            onChange={this.props.textChange}
          />
        )}
      </div>
    );
  }
}
