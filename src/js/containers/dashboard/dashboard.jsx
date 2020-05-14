import React from 'react';
import { Tabs } from 'antd';
import Questions from './components/questions';
import QuestionSets from './components/questionSets';

import './styles.css';

const { TabPane } = Tabs;

class Dashboard extends React.Component {
  render() {
    return (
      <div className="home p-5">
        <div
          className="font-head-4 font-semi-bold pb-3 mb-4"
          style={{ borderBottom: '1px solid #e5e2e2' }}
        >
          Dashboard
        </div>
        <Tabs type="card">
          <TabPane tab="Questions" key="questions">
            <Questions />
          </TabPane>
          <TabPane tab="Question Sets" key="questionsets">
            <QuestionSets />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
