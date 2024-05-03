import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />
      <div className="container beta">
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address*</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Contact Number</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">
              Type your query or message
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              defaultValue={""}
            />
          </div>

          <button type="submit" className="btn btn-success btn-one">
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};
export default Contact;
