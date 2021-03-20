import React from "react";
import "./Error.css";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="Error-h2">
          <h2>Could not display</h2>
        </div>
      );
    }
    return this.props.children;
  }
}

export default Error;
