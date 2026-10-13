
function Navbar({
  activePage,
  onNavigate,
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}) {
  const menuItems = [
    "Dashboard",
    "Students",
    "Courses",
    "Reports",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <a
          className="navbar-brand"
          href="#"
          onClick={(event) => {
            event.preventDefault();
            onNavigate("Dashboard");
          }}
        >
          <span className="brand-icon">S</span>
          Student Portal
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ms-lg-3 me-auto">
            {menuItems.map((item) => (
              <li className="nav-item" key={item}>
                <button
                  type="button"
                  className={`nav-link nav-menu-button ${
                    activePage === item ? "active" : ""
                  }`}
                  onClick={() => onNavigate(item)}
                >
                  {item}
                </button>
              </li>
            ))}

            <li className="nav-item dropdown">
              <button
                type="button"
                className="nav-link dropdown-toggle nav-menu-button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Settings
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => onNavigate("Profile Settings")}
                  >
                    Profile Settings
                  </button>
                </li>

                <li>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => onNavigate("Preferences")}
                  >
                    Preferences
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          {activePage === "Students" && (
            <form
              className="navbar-search"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                onSearchSubmit();
              }}
            >
              <input
                type="search"
                className="form-control navbar-search-input"
                placeholder="Search students..."
                aria-label="Search students by name or department"
                value={searchTerm}
                onChange={(event) =>
                  onSearchChange(event.target.value)
                }
              />

              <button
                type="submit"
                className="btn navbar-search-button"
              >
                Search
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;