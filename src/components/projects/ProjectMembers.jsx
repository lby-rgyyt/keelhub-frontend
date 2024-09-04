import { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import MemberTable from "./MemberTable";

const ProjectMembers = ({ projectId }) => {
  const token = localStorage.getItem("token");

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);

  const [isNewMemberModalOpen, setIsNewMemberModalOpen] = useState(false);

  const openNewMemberModal = () => setIsNewMemberModalOpen(true);
  const closeNewMemberModal = () => setIsNewMemberModalOpen(false);

  const [roleOptions, setRoleOptions] = useState([
    { value: "", label: "Role" },
  ]);
  const statusOptions = [
    { value: "", label: "Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const defaultFilter = {
    role: "",
    status: "",
  };

  const [filter, setFilter] = useState(defaultFilter);
  const [nameSort, setNameSort] = useState(false);
  const [dateSort, setDateSort] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/projects/${projectId}/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Members: ", response.data);
        setMembers(response.data.data);
        setFilteredMembers(response.data.data);
      } catch (err) {
        console.error("Error fetching project members: ", err);
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
        console.log("jobTitles: ", response.data);
        const jobTitles = response.data;
        setRoleOptions([
          { value: "", label: "Role" },
          ...jobTitles.map((job) => ({
            value: job.title,
            label: job.title,
          })),
        ]);
      } catch (err) {
        console.error("Error fetching project members: ", err);
      }
    };

    fetchMembers();
    fetchJobTitles();
  }, []);

  // Filter
  useEffect(() => {
    const filterMembers = () => {
      let result = [...members];

      if (filter.status) {
        result = result.filter(
          (u) => u?.Volunteer.VolunteerAssignments[0].status === filter.status
        );
      }

      if (filter.role) {
        result = result.filter(
          (u) =>
            u?.Volunteer.VolunteerAssignments[0].assigned_role === filter.role
        );
      }

      setFilteredMembers(result);
    };

    filterMembers();
  }, [filter]);

  const sortByName = () => {
    let newOrder;
    if (nameSort) {
      newOrder = [...filteredMembers].sort((a, b) => {
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
      newOrder = [...filteredMembers].sort((a, b) => {
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
    setFilteredMembers(newOrder);
    setNameSort(!nameSort);
  };

  const sortByDate = () => {
    let newOrder;
    if (dateSort) {
      newOrder = [...filteredMembers].sort((a, b) => {
        const dateA = new Date(a.assigned_date);
        const dateB = new Date(b.assigned_date);
        return dateA - dateB;
      });
    } else {
      newOrder = [...filteredMembers].sort((a, b) => {
        const dateA = new Date(a.assigned_date);
        const dateB = new Date(b.assigned_date);
        return dateB - dateA;
      });
    }
    setDateSort(!dateSort);
    setFilteredMembers(newOrder);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const membersPerPage = 8;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * membersPerPage;
  const currentMembers = filteredMembers.slice(offset, offset + membersPerPage);
  const pageCount = Math.ceil(filteredMembers.length / membersPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-gray-700">Filter by:</span>
          <select
            name="role"
            value={filter.role}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
              setFilteredMembers(members);
              setFilter(defaultFilter);
            }}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filter
          </button>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={openNewMemberModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + New Member
          </button>
        </div>
      </div>
      <MemberTable
        members={currentMembers}
        sortByName={sortByName}
        sortByDate={sortByDate}
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
        Showing {filteredMembers.length} results
      </div>
    </div>
  );
};

export default ProjectMembers;
