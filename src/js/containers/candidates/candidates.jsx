import React from 'react';
import PropTypes from 'prop-types';
import { List, Icon } from 'antd';

class Candidates extends React.Component {
  componentDidMount() {
    this.props.fetchCandidates();
  }

  onDelete = (event, candidateId) => {
    const { deleteCandidate } = this.props;
    event.stopPropagation();
    deleteCandidate(candidateId);
  };

  render() {
    const { candidates } = this.props;
    return (
      <div className="full-content p-5">
        <div
          className="font-head-4 font-semi-bold pb-3 mb-4"
          style={{ borderBottom: '1px solid #e5e2e2' }}
        >
          Candidates
        </div>
        <List
          itemLayout="horizontal"
          dataSource={candidates}
          className="p-2"
          renderItem={item => (
            <div
              role="presentation"
              key={item.id}
              className="d-flex align-items-center options list-item box-shadow my-2 py-2 px-4 cursor-pointer"
              style={{ height: 100 }}
            >
              <div style={{ width: '95%' }}>
                <div className="d-flex align-items-center">
                  <div className="font-semi-bold mr-2">ID:</div>
                  <div>{item.id}</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="font-semi-bold mr-2">Name:</div>
                  <div>{item.name}</div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="font-semi-bold mr-2">Email:</div>
                  <div className="ellipsis">{item.email}</div>
                </div>
              </div>
              <div className="full-content d-flex align-items-center justify-content-end">
                <Icon
                  type="delete"
                  theme="outlined"
                  onClick={event => this.onDelete(event, item.id)}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

Candidates.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.shape({})),
  fetchCandidates: PropTypes.func.isRequired,
  deleteCandidate: PropTypes.func.isRequired
};

Candidates.defaultProps = {
  candidates: []
};

export default Candidates;
