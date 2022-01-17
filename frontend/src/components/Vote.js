import React from "react";

export function Vote({ vote }) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          // This function just calls the vote callback with the
          // form's data.
          event.preventDefault();

          const formData = new FormData(event.target);
          const candidateIndex = formData.get("candidate");
          console.log("candidateIndex: ", candidateIndex);
          if (candidateIndex) {
            vote(candidateIndex);
          }
        }}
      >
        <div className="form-group">
          <p>Select Candidate to vote.</p>
          <input type="radio" value="0" name="candidate" /> Donald Trump <br />
          < input type="radio" value="1" name="candidate" /> Joe Biden
        </div>

        <div className="form-group">
          <input className="btn btn-primary" type="submit" value="Vote" />
        </div>
      </form>
    </div>
  );
}
