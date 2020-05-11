import React from "react";
import { storeToDo, increaseToDoCount } from "../redux/action";
import { connect } from "react-redux";
import { Table, Space, Modal, Button } from "antd";
import InputWithLabel from "../components/inputWithLabel";
import moment from "moment";
import ModelComponent from "../components/modelComponent";
import "antd/dist/antd.css"; //Added afterwads because code sandbox style was not imorted.

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      loading: false,
      toDoTitle: "",
      createdDate: "",
      key: "",
      modalAction: 1, //1 Add,2:edit
      dataSource: [],
      toDoCount: 0,
      columns: [
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
        {
          title: "Date Added",
          dataIndex: "dateAdded",
          key: "dateAdded",
          render: (text, record) => {
            return (
              <p>
                {record
                  ? moment(record.dateAdded).format("DD-MM-YYYY")
                  : moment().format("DD-MM-YYYY")}
              </p>
            );
          },
        },
        {
          title: "Operation",
          dataIndex: "operation",
          key: "operation",
          render: (test, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    //console.log(record);
                    this._openModel(
                      record.action,
                      record.dateAdded,
                      record.key,
                      2
                    );
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
    this.props.storeToDo(newData);
    this.setState({
      dataSource: newData,
    });
  };
  _openModel = (action, createdDate, key, modalAction) => {
    this.setState({
      visible: true,
      todoTitle: action ? action : "",
      createdDate: createdDate ? createdDate : "",
      key: key ? key : "",
      modalAction: modalAction ? modalAction : 1,
    });
  };
  _handleOk = () => {
    let newData;
    if (this.state.modalAction == 1) {
      let v = {
        action: this.state.todoTitle,
        dateAdded: this.state.createdDate ? this.state.createdDate : moment(),
        key: this.state.toDoCount.toString(),
      };
      newData = [...this.state.dataSource];
      newData.push(v);
      this.props.increaseToDoCount(this.state.toDoCount + 1);
    } else {
      newData = this.state.dataSource.map((v, i) => {
        if (v.key === this.state.key) {
          v.action = this.state.todoTitle;
          v.dateAdded = this.state.createdDate
            ? this.state.createdDate
            : moment();
          v.key = this.state.key;
        }
        return v;
      });
    }
    this.props.storeToDo(newData);
    this.setState({
      visible: false,
      dataSource: newData,
      loading: false,
      toDoCount: this.state.toDoCount + 1,
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
        dataSource: data.toDoData,
        toDoCount: data.toDoCount,
      });
    }
  };
  render() {
    console.log("===>2 ToDo count", this.props.toDoCount);
    return (
      <div>
        <div style={LocalStyle.verticalSpace}>
          <Button
            type="primary"
            onClick={() => {
              this._openModel("", "", "", 1);
            }}
          >
            Add ToDo
          </Button>
        </div>
        <div>
          <Table
            dataSource={this.state.dataSource}
            columns={this.state.columns}
          />
        </div>
        <div>
          <div>
            <ModelComponent
              modalTitle={"Create New To-Do"}
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
                    label={"Action"}
                    textChange={(e) => {
                      this.setState({ todoTitle: e.target.value });
                    }}
                    value={this.state.todoTitle}
                  />
                  <InputWithLabel
                    label={"Date"}
                    textChange={(e) => {
                      this.setState({ createdDate: e });
                    }}
                    value={
                      this.state.createdDate
                        ? moment(this.state.createdDate).format("DD-MM-YYYY")
                        : moment().format("DD-MM-YYYY")
                    }
                    inputType={"datePicker"}
                  />
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { toDoCount: state.toDoApp.toDoCount };
};
const mapDispatchToProps = (dispatch) => {
  return {
    storeToDo: (data) => {
      dispatch(storeToDo(data));
    },
    increaseToDoCount: (data) => {
      dispatch(increaseToDoCount(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

const LocalStyle = {
  verticalSpace: {
    marginBottom: 10,
  },
};
