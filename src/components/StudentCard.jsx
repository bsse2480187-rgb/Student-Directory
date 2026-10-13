
import { useState } from "react";

function StudentCard(props) {
  const [viewCount, setViewCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card h-100 shadow-sm">
      {/* Student image */}
      <div className="bg-light text-center">
        <img
          src="/student-placeholder.png"
          alt="Student placeholder"
          className="img-fluid"
          style={{
            width: "100%",
            height: "160px",
            objectFit: "contain",
          }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>

        <p className="card-text">
          <strong>Roll Number:</strong> {props.rollNo}
        </p>

        <p className="card-text">
          <strong>Department:</strong> {props.department}
        </p>

        {/* Show and hide student details */}
        {showDetails && (
          <div className="border rounded p-3 mb-3 bg-light">
            <h6>Student Details</h6>
            <p className="mb-1">
              <strong>Name:</strong> {props.name}
            </p>
            <p className="mb-1">
              <strong>Roll Number:</strong> {props.rollNo}
            </p>
            <p className="mb-0">
              <strong>Department:</strong> {props.department}
            </p>
          </div>
        )}

        {/* View profile counter */}
        <button
          className="btn btn-primary w-100 mb-2"
          onClick={() => setViewCount((count) => count + 1)}
        >
          View Profile ({viewCount})
        </button>

        {/* Toggle details */}
        <button
          className="btn btn-outline-secondary w-100 mb-2"
          onClick={() => setShowDetails((previous) => !previous)}
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>

        {/* Delete student */}
        <button
          className="btn btn-danger w-100"
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
