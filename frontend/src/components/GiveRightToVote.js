import React from "react";

export function GiveRightToVote({ giveRightToVote }) {
  return (
    <div>
      <h4>Give Right To Vote</h4>
      <form
        onSubmit={(event) => {
          // This function just calls the giveRightToVote callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const voterAddress = formData.get("voterAddress");

          if (voterAddress) {
            giveRightToVote(voterAddress);
          }
        }}
      >
        <div className="form-group">
          <label>Accounts Granted Right To Vote</label>
          <input
            className="form-control"
            type="number"
            step="1"
            name="grantedAccountCount"
            placeholder="1"
            required
          />
        </div>
        <div className="form-group">
          <label>Voter Account Address</label>
          <input className="form-control" type="text" name="voterAddress" required />
        </div>
        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="giveRightToVote" />
        </div>
      </form>
    </div>
  );
}
