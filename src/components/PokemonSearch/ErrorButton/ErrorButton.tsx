import React, { type ReactNode } from 'react';
import './ErrorButton.css';
import type { ErrorButtonPropsState } from '../../../types/types';

export default class ErrorButton extends React.Component<
  {},
  ErrorButtonPropsState
> {
  constructor(props: {}) {
    super(props);
    this.state = { shouldThrow: false };
  }
  handleClick = () => {
    this.setState({ shouldThrow: true });
  };

  render(): ReactNode {
    if (this.state.shouldThrow) {
      throw new Error('You Simulated Error!');
    }

    return (
      <button className="simulate-error-button" onClick={this.handleClick}>
        Simulate Error
      </button>
    );
  }
}
