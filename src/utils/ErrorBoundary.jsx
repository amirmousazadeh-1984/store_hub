import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Add prop types validation
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Validate children prop
};

export default ErrorBoundary;
