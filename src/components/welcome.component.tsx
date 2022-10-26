import * as React from "react";
import { Navigate } from "react-router-dom";


export default class Welcome extends React.Component {
  state = false;

  handleSubmit(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    try {
      this.setState(true);
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return (
      <div className="container">
        {this.state && (
          <Navigate to="/home" replace={true} />
        )}
        <h1>Fiuumber</h1>
        <h2>Welcome!</h2>
        <button onClick={(event) => this.handleSubmit(event) }>
          Continue
        </button>
      </div>
    );
  }
}

