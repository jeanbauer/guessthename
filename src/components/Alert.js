import React, { Component } from 'react';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

export default class Alert extends Component {
  render() {
    const { title, text, show, type, click, tempo, rest } = this.props;

    return (
      <div>
        <SweetAlert
          show={show}
          type={type}
          title={title}
          text={text}
          onConfirm={click}
          {...rest}
        />
      </div>
    );
  }
}