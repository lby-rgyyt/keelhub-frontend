import { useContext, useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";
import CreateAccount from "../components/CreateAccount";
import VolunteersTable from "../components/volunteers/VolunteersTable";
import ReactPaginate from "react-paginate";
import { UserContext } from "../context/UserContext";
import "../assets/Dashboard.css";
import "../styles/VolunteerDetail.css";
import "../styles/VolunteersTable.css";
import axios from "axios";

const Volunteers = () => {
  const { currentUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [volunteers, setVolunteers] = useState([]);
  const [jobTitles, setJobTitles] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
  const defaultFilter = {
    Active: "",
    status: "",
    role: "",
    projects: "",
  };
  const [filter, setFilter] = useState(defaultFilter);

  const [nameSort, setNameSort] = useState(false);
  const [hrsSort, setHrsSort] = useState(false);
  const [roleSort, setRoleSort] = useState(false);
  const [startDateSort, setStartDateSort] = useState(false);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/volunteers/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("volunteers response.data: ", response.data);
        setVolunteers(response.data.data);
        setFilteredVolunteers(response.data.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    const fetchJobTitles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/job-titles/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("job titles response.data: ", response.data);
        setJobTitles(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchVolunteers();
    fetchJobTitles();
  }, []);
  console.log("volunteers: ", volunteers);
  console.log("job titles: ", jobTitles);
  console.log("filter: ", filter);

  useEffect(() => {
    const filterVolunteers = () => {
      let result = [...volunteers];
      console.log("use effect filter.active: ", filter.Active);
      if (filter.Active !== "") {
        result = result.filter((v) => v.is_active === filter.Active);
      }

      if (filter.status) {
        result = result.filter((v) => v.Volunteer.status === filter.status);
      }

      if (filter.role) {
        result = result.filter(
          (v) => v.Volunteer.jobTitles[0]?.title === filter.role
        );
      }

      //   if (filter.projects) {
      //     result = result.filter((v) => v.projects.includes(filter.projects));
      //   }
      console.log("filter result: ", result);
      setFilteredVolunteers(result);
    };
    filterVolunteers();
  }, [filter]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const sortByName = () => {
    let newOrder;
    if (nameSort) {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
        const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    } else {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const nameA = `${a.first_name} ${a.last_name}`.toUpperCase();
        const nameB = `${b.first_name} ${b.last_name}`.toUpperCase();

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });
    }
    setFilteredVolunteers(newOrder);
    setNameSort(!nameSort);
  };

  const sortByHrs = () => {
    let newOrder;
    if (hrsSort) {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const timeA = a.Volunteer.time_committed_per_week;
        const timeB = b.Volunteer.time_committed_per_week;
        return timeA - timeB;
      });
    } else {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const timeA = a.Volunteer.time_committed_per_week;
        const timeB = b.Volunteer.time_committed_per_week;
        return timeB - timeA;
      });
    }
    setHrsSort(!hrsSort);
    setFilteredVolunteers(newOrder);
  };
  const sortByRole = () => {
    let newOrder;
    if (roleSort) {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const titleA = a.Volunteer.jobTitles[0]?.title;
        const titleB = b.Volunteer.jobTitles[0]?.title;
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        }

        return 0;
      });
    } else {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const titleA = a.Volunteer.jobTitles[0]?.title;
        const titleB = b.Volunteer.jobTitles[0]?.title;
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }

        return 0;
      });
    }
    setRoleSort(!roleSort);
    setFilteredVolunteers(newOrder);
  };
  const sortByStartDate = () => {
    let newOrder;
    if (startDateSort) {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    } else {
      newOrder = [...filteredVolunteers].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
    }
    setStartDateSort(!startDateSort);
    setFilteredVolunteers(newOrder);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const volunteersPerPage = 3;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * volunteersPerPage;
  const currentVolunteers = filteredVolunteers.slice(
    offset,
    offset + volunteersPerPage
  );
  const pageCount = Math.ceil(filteredVolunteers.length / volunteersPerPage);

  return (
    // <div className="dashboard-grid-container">
    <div>
      <Header />
      <Sidebar />
      <div className="volunteer-actions">
        <div className="filter-container">
          <span className="filter-label">Filter by:</span>
          <div className="filter-buttons">
            <select
              name="Active"
              value={filter.Active}
              onChange={handleFilterChange}
              className="filter-button"
            >
              <option value="All">Active</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
            <select
              name="role"
              value={filter.role}
              onChange={handleFilterChange}
              className="filter-button"
            >
              <option value="">Role</option>
              {jobTitles.map((jobTitle) => (
                <option key={jobTitle.id} value={jobTitle.title}>
                  {jobTitle.title}
                </option>
              ))}
            </select>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="filter-button"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
            </select>
            <select
              name="projects"
              value={filter.projects}
              onChange={handleFilterChange}
              className="filter-button"
            >
              <option value="All">Projects</option>
              <option value="Website Redesign">Website Redesign</option>
              <option value="Portfolio Builder">Portfolio Builder</option>
            </select>
            <button
              onClick={() => {
                setFilteredVolunteers(volunteers);
                setFilter(defaultFilter);
              }}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div className="action-buttons">
          <button className="assign-project-btn">Assign Project</button>
          <button className="new-volunteer-btn" onClick={openModal}>
            + New Volunteer
          </button>
        </div>
      </div>

      <VolunteersTable
        volunteers={currentVolunteers}
        // volunteers={filteredVolunteers}
        sortByName={sortByName}
        sortByHrs={sortByHrs}
        sortByRole={sortByRole}
        sortByStartDate={sortByStartDate}
      />

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
      <div>showing {filteredVolunteers.length} results</div>

      <CreateAccount isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Volunteers;
