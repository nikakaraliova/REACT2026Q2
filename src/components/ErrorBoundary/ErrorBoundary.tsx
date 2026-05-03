import React, { type ReactNode } from 'react';
import pikachu from '../../../public/Pikachu.svg';
import './ErrorBoundary.css';

type Props = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasErrorOccured: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends React.Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      hasErrorOccured: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasErrorOccured: true,
      errorMessage: error.message || 'An unexpected error occurred',
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    return this.state.hasErrorOccured ? (
      <div>
        <h1>{this.state.errorMessage}</h1>
        <img src={pikachu} alt="pikachu" />
      </div>
    ) : (
      this.props.children
    );
  }
}
