import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 offset-md-3 mx-auto">
              <div className="card">
                <div className="card-body">
                  <div className="ex-page-content text-center">
                    <h1 className="">404!</h1>
                    <h3 className="">Sorry, page not found</h3>
                    <br />
                    <Link
                      className="btn btn-primary mb-5 waves-effect waves-light"
                      to="/"
                    >
                      Back to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(NotFoundPage);
