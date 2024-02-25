import React from "react";
import { useNavigate } from "react-router-dom";
import img from "./check.png";

export default function Verified() {
    const navigate = useNavigate();

    return (
        <div className="width-60-form mb-4 d-flex flex-column gap-1 align-items-center">
            <h1 className="text-center" style={{ textAlign: "center", color: "black", paddingTop: "80px" }}>Sign Up Complete</h1>
            <img
                src={img}
                alt="Check"
                style={{
                    position: "relative",
                    width: "300px",
                    aspectRatio: "1/1",
                    left: "30%",
                    paddingBottom: "30px"
                }}
            />
            <button
                type="button"
                onClick={() => navigate('/register')}
                className="btn btn-dark w-100 text-center"
            >
                Go to Profile
            </button>
        </div>
    );
}