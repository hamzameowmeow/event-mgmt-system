import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import laptop from "./images/laptop.jpg";
function Home() {
  return (
    <div className="container">
      <Navbar />
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src={laptop}
            className="d-block mx-lg-auto img-fluid"
            alt="Image"
            width={700}
            height={500}
            loading="lazy"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Event Mangament System
          </h1>
          <p className="lead">Get started:</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              to="/login"
              type="button"
              className="btn btn-primary btn-lg px-4 me-md-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
