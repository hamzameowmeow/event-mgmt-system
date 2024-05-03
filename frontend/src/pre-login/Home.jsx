import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
/*import eventImg from "./images/event.svg";*/
import background from "./images/background.jpeg";
function Home() {
  return (
    <>
      <Navbar />
      <div className="container body-img">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            
          </div>
          <div className="col-lg-6 home-items">
            <h1 className="display-5 fw-bold lh-1 mb-3 mainText ">
              AmiEvent <br /> <p>All your events at one place!</p>
            </h1>
            <p className="lead ">Learn new skills with new events daily with us. Get  started today!</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to="/login"
                type="button"
                className="btn btn-success btn-lg px-4 me-md-2"
              >
                Login
              </Link>
              <Link
                to="/signup"
                type="button"
                className="btn btn-outline-secondary btn-lg px-3 text-grey"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
