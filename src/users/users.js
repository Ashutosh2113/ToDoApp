import React from "react";
import { storeUser, increaseUserCount } from "../redux/action";
import { connect } from "react-redux";
import { Table, Space, Button } from "antd";
import InputWithLabel from "../components/inputWithLabel";
import ModelComponent from "../components/modelComponent";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      loading: false,
      inputName: "",
      email: "",
      key: "",
      modalAction: 1, //1 Add,2:edit
      dataSource: [],
      userCount: 0,
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          render: (text, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    this._openModel(record.name, record.email, record.key, 2);
                  }}
                >
                  Edit
                </a>
                <div>|</div>
                <a
                  onClick={() => {
                    this._deleteData(record.key);
                  }}
                >
                  Delete
                </a>
              </Space>
            );
          },
        },
      ],
    };
  }
  _deleteData = (key) => {
    let newData = this.state.dataSource.filter((v, i) => {
      if (v.key !== key) {
        return v;
      }
    });
    this.props.storeUser(newData);
    this.setState({
      dataSource: newData,
    });
  };
  _openModel = (name, email, key, modalAction) => {
    this.setState({
      visible: true,
      inputName: name !== "" ? name : "",
      email: email !== "" ? email : "",
      key: key !== "" ? key : "",
      modalAction: modalAction ? modalAction : 1,
    });
  };
  _handleOk = () => {
    let newData;
    if (this.state.modalAction == 1) {
      let v = {
        name: this.state.inputName,
        email: this.state.email,
        key: this.state.userCount.toString(),
      };
      newData = [...this.state.dataSource];
      newData.push(v);
      this.props.increaseUserCount(this.state.userCount + 1);
    } else {
      newData = this.state.dataSource.map((v, i) => {
        if (v.key === this.state.key) {
          v.name = this.state.inputName;
          v.email = this.state.email;
          v.key = this.state.key;
        }
        return v;
      });
    }
    this.props.storeUser(newData);
    this.setState({
      visible: false,
      dataSource: newData,
      loading: false,
      userCount: this.state.userCount + 1,
    });
  };
  _handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  componentDidMount = () => {
    let data = localStorage.getItem("data");
    if (data) {
      data = JSON.parse(data);
      this.setState({
        dataSource: data.userData,
        userCount: data.userCount,
      });
    }
  };
  render() {
    console.log("===>1 UserCount", this.props.userCount);
    return (
      <div>
        <div style={LocalStyle.verticalSpace}>
          <Button
            type="ghost"
            onClick={() => {
              this._openModel("", "", "", 1);
            }}
          >
            Create User
          </Button>
        </div>
        <div>
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
          />
        </div>
        <div>
          <ModelComponent
            modalTitle={"Create New User"}
            visible={this.state.visible}
            handleOk={() => {
              this._handleOk();
            }}
            handleCancel={() => {
              this._handleCancel();
            }}
            inputComps={
              <div>
                <InputWithLabel
                  label={"Name"}
                  textChange={(e) => {
                    this.setState({ inputName: e.target.value });
                  }}
                  value={this.state.inputName}
                />
                <InputWithLabel
                  label={"email"}
                  textChange={(e) => {
                    this.setState({ email: e.target.value });
                  }}
                  value={this.state.email}
                />
              </div>
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { userCount: state.toDoApp.userCount };
};
const mapDispatchToProps = (dispatch) => {
  return {
    storeUser: (data) => {
      dispatch(storeUser(data));
    },
    increaseUserCount: (data) => {
      dispatch(increaseUserCount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const LocalStyle = {
  verticalSpace: {
    marginBottom: 10,
  },
};
