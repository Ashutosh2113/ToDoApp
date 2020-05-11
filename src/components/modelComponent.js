import React from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css"; //Added afterwads because code sandbox style was not imorted.

export default class ModelComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  render() {
    return (
      <Modal
        title={this.props.modalTitle}
        visible={this.props.visible}
        onCancel={() => {
          this.props.handleCancel();
        }}
        footer={[
          <Button
            key="Cancel"
            onClick={() => {
              this.props.handleCancel();
            }}
          >
            Cancel
          </Button>,
          <Button
            key="Submit"
            type="primary"
            loading={this.state.loading}
            onClick={() => {
              this.setState({ loading: true });
              setTimeout(() => {
                this.props.handleOk();
                this.setState({ loading: false });
              }, 1000);
            }}
          >
            Submit
          </Button>,
        ]}
      >
        {this.props.inputComps}
      </Modal>
    );
  }
}
