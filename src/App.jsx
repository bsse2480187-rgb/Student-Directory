import { useState } from "react";
import Navbar from "./components/Navbar";
import StudentCard from "./components/StudentCard";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePage, setActivePage] = useState("Students");
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 4;

  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRollNo, setNewRollNo] = useState("");
  const [newDepartment, setNewDepartment] = useState("");

  // Student data
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alishba",
      rollNo: "SE-001",
      department: "Software Engineering",
    },
    {
      id: 2,
      name: "Sara",
      rollNo: "SE-002",
      department: "Software Engineering",
    },
    {
      id: 3,
      name: "Laiba",
      rollNo: "CS-003",
      department: "Computer Science",
    },
    {
      id: 4,
      name: "Iqra",
      rollNo: "CS-004",
      department: "Computer Science",
    },
    {
      id: 5,
      name: "Farah",
      rollNo: "BBAS-005",
      department: "BBA",
    },
    {
      id: 6,
      name: "Urooj",
      rollNo: "AI-006",
      department: "Artificial Intelligence",
    },
    {
      id: 7,
      name: "Kiran",
      rollNo: "CS-007",
      department: "Computer Science",
    },
    {
      id: 8,
      name: "Sahiba",
      rollNo: "SE-008",
      department: "Software Engineering",
    },
  ]);

  // Search students by name or department
  const filteredStudents = students.filter((student) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      student.name.toLowerCase().includes(search) ||
      student.department.toLowerCase().includes(search) ||
      student.rollNo.toLowerCase().includes(search)
    );
  });

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / studentsPerPage)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  // Delete student
  const handleDeleteStudent = (id) => {
    setStudents((previousStudents) =>
      previousStudents.filter((student) => student.id !== id)
    );
  };

  // Add student
  const handleAddStudent = () => {
    if (
      !newName.trim() ||
      !newRollNo.trim() ||
      !newDepartment.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name: newName.trim(),
      rollNo: newRollNo.trim(),
      department: newDepartment.trim(),
    };

    setStudents((previousStudents) => [
      ...previousStudents,
      newStudent,
    ]);

    setNewName("");
    setNewRollNo("");
    setNewDepartment("");
    setSearchTerm("");
    setCurrentPage(1);
    setShowForm(false);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onSearchSubmit={() => setCurrentPage(1)}
      />

      <main className="container py-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <button
                type="button"
                className="btn btn-link p-0 text-decoration-none breadcrumb-home"
                onClick={() => handleNavigate("Dashboard")}
              >
                Home
              </button>
            </li>

            <li
              className="breadcrumb-item active"
              aria-current="page"
            >
              {activePage}
            </li>
          </ol>
        </nav>

        {/* Page heading */}
        <section className="page-heading">
          <span className="heading-label">
            STUDENT MANAGEMENT
          </span>

          <h1 className="portal-heading">
            {activePage === "Students"
              ? "Student Directory"
              : activePage}
          </h1>

          <p className="page-subtitle">
            {activePage === "Students"
              ? "Discover, search and manage your student community."
              : `Welcome to ${activePage}.`}
          </p>
        </section>

        {activePage === "Students" && (
          <>
            {/* Welcome section */}
            <div className="welcome-banner mb-4">
              <div>
                <h2>Welcome to our student community</h2>
                <p>
                  Explore student profiles and find the
                  information you need.
                </p>
              </div>

              <div className="student-total">
                <span>{students.length}</span>
                <small>Total Students</small>
              </div>
            </div>

            {/* Student section heading and add button */}
            <div className="student-section-heading">
              <div>
                <h2 className="section-title">
                  Our Students
                </h2>

                <p className="section-description">
                  {searchTerm
                    ? `${filteredStudents.length} matching student(s) found`
                    : "Meet the members of our student directory"}
                </p>
              </div>

              <button
                type="button"
                className="btn add-student-button"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "+ Add Student"}
              </button>
            </div>

            {/* Add student form */}
            {showForm && (
              <div className="card add-student-card mb-4">
                <div className="card-body">
                  <h3 className="form-heading">
                    Add a New Student
                  </h3>

                  <div className="mb-3">
                    <label
                      htmlFor="studentName"
                      className="form-label"
                    >
                      Student Name
                    </label>

                    <input
                      id="studentName"
                      type="text"
                      className="form-control"
                      placeholder="Enter student name"
                      value={newName}
                      onChange={(event) =>
                        setNewName(event.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="studentRollNo"
                      className="form-label"
                    >
                      Roll Number
                    </label>

                    <input
                      id="studentRollNo"
                      type="text"
                      className="form-control"
                      placeholder="Enter roll number"
                      value={newRollNo}
                      onChange={(event) =>
                        setNewRollNo(event.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="studentDepartment"
                      className="form-label"
                    >
                      Department
                    </label>

                    <input
                      id="studentDepartment"
                      type="text"
                      className="form-control"
                      placeholder="Enter department"
                      value={newDepartment}
                      onChange={(event) =>
                        setNewDepartment(event.target.value)
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="btn add-student-button"
                    onClick={handleAddStudent}
                  >
                    Save Student
                  </button>
                </div>
              </div>
            )}

            {/* Student cards */}
            <div className="row g-4" id="students">
              {currentStudents.map((student) => (
                <div
                  className="col-12 col-sm-6 col-lg-3"
                  key={student.id}
                >
                  <StudentCard
                    id={student.id}
                    name={student.name}
                    rollNo={student.rollNo}
                    department={student.department}
                    onDelete={handleDeleteStudent}
                  />
                </div>
              ))}
            </div>

            {/* No results */}
            {filteredStudents.length === 0 && (
              <div className="empty-results">
                <h3>No students found</h3>
                <p>
                  Try another name, roll number or department.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <nav
                aria-label="Student pages"
                className="mt-5"
              >
                <ul className="pagination justify-content-center custom-pagination">
                  <li
                    className={`page-item ${
                      safeCurrentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      disabled={safeCurrentPage === 1}
                      onClick={() =>
                        setCurrentPage(safeCurrentPage - 1)
                      }
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => (
                      <li
                        className={`page-item ${
                          safeCurrentPage === index + 1
                            ? "active"
                            : ""
                        }`}
                        key={index}
                      >
                        <button
                          type="button"
                          className="page-link"
                          onClick={() =>
                            setCurrentPage(index + 1)
                          }
                        >
                          {index + 1}
                        </button>
                      </li>
                    )
                  )}

                  <li
                    className={`page-item ${
                      safeCurrentPage === totalPages
                        ? "disabled"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      disabled={safeCurrentPage === totalPages}
                      onClick={() =>
                        setCurrentPage(safeCurrentPage + 1)
                      }
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="portal-footer">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5>Student Portal</h5>
              <p>
                A simple and welcoming space to explore and
                manage student information.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Developer Information</h5>
              <p>
                <strong>Name:</strong> Alishba
              </p>
              <p>
                <strong>Email:</strong>{" "}
                YOUR_EMAIL@example.com
              </p>
              <p>
                <strong>Role:</strong> Student
              </p>
            </div>

            <div className="col-md-4">
              <h5>Contact Information</h5>
              <p>Email: info@studentportal.com</p>
              <p>Phone: +92 300 0000000</p>
              <p>Location: Karachi, Pakistan</p>
            </div>
          </div>

          <hr />

          <p className="footer-copyright">
            © 2026 Student Portal. All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
