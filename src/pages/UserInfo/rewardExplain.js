import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as actions from './action';
import Modal from '../../components/Modal';

const RewardExplainWrapper = styled.div`
  font-family: PingFang SC;
  background: #fff;
  width: 90vw;
  z-index: 100;
  padding: 16px 20px;
  padding-right: 40px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 20px;
  color: #3b3d3d;

  .learn-more {
    margin-top: 20px;
  }
  .learn-more a {
    font-family: SF Pro Display;
    text-transform: uppercase;
  }
  .close {
    position: absolute;
    color: #8e9394;
    font-weight: 500;
    right: 2px;
    top: 10px;
    font-style: normal;
    cursor: pointer;
    outline: none;
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
class RewardExplain extends Component {
  render() {
    const { children, userAccount, updateUserAccount } = this.props;
    return (
      <Modal
        show={userAccount.showRewardExplainDialog}
        onEsc={() => {
          updateUserAccount({
            showRewardExplainDialog: false,
          });
        }}
      >
        <RewardExplainWrapper>
          <button
            className="material-icons close"
            onClick={() => {
              updateUserAccount({
                showRewardExplainDialog: false,
              });
            }}
            type="button"
          >
            close
          </button>
          {children}
        </RewardExplainWrapper>
      </Modal>
    );
  }
}

RewardExplain.propTypes = {
  userAccount: PropTypes.objectOf({
    showRewardExplainDialog: PropTypes.bool,
  }).isRequired,
  updateUserAccount: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

function mapStateToProps(state) {
  return {
    userAccount: state.userInfo.userAccount,
  };
}

export default connect(
  mapStateToProps,
  actions
)(RewardExplain);
