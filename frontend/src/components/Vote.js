import React from "react";

import { NetworkErrorMessage } from "./NetworkErrorMessage";

export function Vote({ vote, networkError, dismiss }) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-12 text-center">
          {/* Metamask network should be set to Localhost:8545. */}
          {networkError && (
            <NetworkErrorMessage 
              message={networkError} 
              dismiss={dismiss} 
            />
          )}
        </div>
        <div className="col-6 p-4 text-center">
          <form onSubmit={this.onSubmit}>
          <p>Click on the button to vote.</p>
          <input type="radio" value="1" name="candidate" /> Donald Trump
          <input type="radio" value="2" name="candidate" /> Joe Biden
          <button
            className="btn btn-warning"
            type="submit"
            onClick={vote(candidate)}
          >
            Vote
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
