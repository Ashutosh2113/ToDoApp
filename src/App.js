import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Tabs } from "antd";
import ToDos from "./todos/todos";
import Users from "./users/users";

const { TabPane } = Tabs;

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <Tabs className="Tab-Title-Cont" defaultActiveKey="1">
            <TabPane tab="Todos" key="1">
              <ToDos />
            </TabPane>
            <TabPane tab="Users" key="2">
              <Users />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
