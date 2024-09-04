import { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { UserContext } from "../context/UserContext";
import ProjectsTable from "../components/projects/ProjectsTable";
import axios from "axios";

const ProjectsList = () => {
  const { currentUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  const openNewProjectModal = () => setIsNewProjectModalOpen(true);
  const closeNewProjectModal = () => setIsNewProjectModalOpen(false);

  const statusOptions = [
    { value: "", label: "Status" },
    { value: "In Progress", label: "In Progress" },
    { value: "Not Started", label: "Not Started" },
    { value: "On Hold", label: "On Hold" },
    { value: "Completed", label: "Completed" },
  ];

  const defaultFilter = {
    status: "",
  };
  const [filter, setFilter] = useState(defaultFilter);
  const [nameSort, setNameSort] = useState(false);
  const [pmSort, setPmSort] = useState(false);
  const [startDateSort, setStartDateSort] = useState(false);
  const [dueDateSort, setDueDateSort] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  // Fetch Data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/projects/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchProjects();
  }, []);

  // Filter
  useEffect(() => {
    const filterProjects = () => {
      let result = [...projects];

      if (filter.status) {
        result = result.filter((u) => u.status === filter.status);
      }

      setFilteredProjects(result);
    };

    filterProjects();
  }, [filter]);

  const sortByName = () => {
    let newOrder;
    if (nameSort) {
      newOrder = [...filteredProjects].sort((a, b) => {
        const nameA = `${a.name}`.toUpperCase();
        const nameB = `${b.name}`.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    } else {
      newOrder = [...filteredProjects].sort((a, b) => {
        const nameA = `${a.name}`.toUpperCase();
        const nameB = `${b.name}`.toUpperCase();

        if (nameA < nameB) {
          return 1;
        }
        if (nameA > nameB) {
          return -1;
        }

        return 0;
      });
    }
    setFilteredProjects(newOrder);
    setNameSort(!nameSort);
  };

  const sortByPm = () => {
    let newOrder;
    if (pmSort) {
      newOrder = [...filteredProjects].sort((a, b) => {
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
      newOrder = [...filteredProjects].sort((a, b) => {
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
    setFilteredProjects(newOrder);
    setPmSort(!pmSort);
  };

  const sortByStartDate = () => {
    let newOrder;
    if (startDateSort) {
      newOrder = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateA - dateB;
      });
    } else {
      newOrder = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.start_date);
        const dateB = new Date(b.start_date);
        return dateB - dateA;
      });
    }
    setStartDateSort(!startDateSort);
    setFilteredProjects(newOrder);
  };

  const sortByDueDate = () => {
    let newOrder;
    if (dueDateSort) {
      newOrder = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateA - dateB;
      });
    } else {
      newOrder = [...filteredProjects].sort((a, b) => {
        const dateA = new Date(a.due_date);
        const dateB = new Date(b.due_date);
        return dateB - dateA;
      });
    }
    setDueDateSort(!dueDateSort);
    setFilteredProjects(newOrder);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 8;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * projectsPerPage;
  const currentProjects = filteredProjects.slice(
    offset,
    offset + projectsPerPage
  );
  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All projects</h1>
        <p className="text-gray-600">Manage all projects</p>
      </div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Filter by:</span>
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setFilteredProjects(projects);
              setFilter(defaultFilter);
            }}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filter
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={openNewProjectModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + New Project
          </button>
        </div>
      </div>

      <ProjectsTable
        projects={currentProjects}
        sortByName={sortByName}
        sortByPm={sortByPm}
        sortByStartDate={sortByStartDate}
        sortByDueDate={sortByDueDate}
      />

      <div className="mt-6">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex justify-center space-x-2"}
          pageClassName={"px-3 py-2 rounded border hover:bg-gray-100"}
          activeClassName={"bg-blue-500 text-white"}
          previousClassName={"px-3 py-2 rounded border hover:bg-gray-100"}
          nextClassName={"px-3 py-2 rounded border hover:bg-gray-100"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
        />
      </div>
      <div className="mt-4 text-center text-gray-600">
        Showing {filteredProjects.length} results
      </div>
    </div>
  );
};

export default ProjectsList;
