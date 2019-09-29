import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Overlay = styled.div`
  z-index: 199;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  margin: auto;
  overflow: auto;
  z-index: 299;
  top: 50%;
  left: 50%;
  max-height: 90vh;
  max-width: 90vw;
  transform: translate(-50%, -50%) !important;
  box-shadow: rgba(0, 0, 0, 0.12) 2px 4px 20px;

  ${props =>
    props.mobile &&
    `
      width: 100%;
      max-width: 100%;
      top: auto;
      left: 0;
      bottom: 0;
      transform: none !important;
      z-index: 999999;
      max-height: none;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
    `};
`;

class ModalComp extends PureComponent {
  constructor(...args) {
    super(...args);
    this.escListener = e => {
      if (e.key === 'Escape') {
        const { onEsc } = this.props;
        onEsc();
      }
    };
    document.addEventListener('keyup', this.escListener);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escListener);
  }

  render() {
    const { children, show, showOverlay, mobile } = this.props;
    if (show) {
      return (
        <React.Fragment>
          <ModalWrapper mobile={mobile}>
            <React.Fragment>{children}</React.Fragment>
          </ModalWrapper>
          {showOverlay && <Overlay />}
        </React.Fragment>
      );
    }

    return <React.Fragment></React.Fragment>;
  }
}

ModalComp.propTypes = {
  children: PropTypes.element.isRequired,
  show: PropTypes.bool.isRequired,
  showOverlay: PropTypes.bool,
  onEsc: PropTypes.func,
  mobile: PropTypes.bool,
};

ModalComp.defaultProps = {
  showOverlay: true,
  onEsc: () => {},
  mobile: false,
};

export default ModalComp;
