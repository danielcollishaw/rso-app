import React from "react";

class EventForm extends React.Component {
  state = {};

  render() {
    return (
      <div>
        <form className="card border-3">
          <div className="card-header">
            <h1 className="text-center text-muted mb-0">Create an Event</h1>
          </div>

          <div className="container w-75 p-3">
            <div className="form-outline mt-5 mb-4">
              <input id="name" className="form-control" placeholder="Event Name"/>
            </div>

            <div className="form-outline mb-5">
              <textarea id="desc" className="form-control" placeholder="Description"/>
            </div>

            <div className="form-outline mb-3">
              <input id="location" className="form-control" placeholder="Full Address"/>
            </div>

            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="datePick">Date</label>
              <input className="form-control text-center" id="datePick" type="datetime-local"></input>
            </div>

            <div className="input-group mb-5">
              <label className="input-group-text" htmlFor="groupSelect">Type</label>
              <select className="form-select" id="groupSelect">
                <option value="none">Choose...</option>
                <option value="rso">RSO</option>
                <option value="private">Private</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div className="row mb-4">
               <button className="btn btn-outline-primary rounded-pill" >
                 Create
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }


}

export default EventForm;
