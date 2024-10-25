import { useContext, useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import FileTable from "./FileTable";

const ProjectResources = ({ projectId }) => {
  const token = localStorage.getItem("token");

  const [files, setFiles] = useState([]);

  const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);

  const openNewFileModal = () => setIsNewFileModalOpen(true);
  const closeNewFileModal = () => setIsNewFileModalOpen(false);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/projects/${projectId}/files`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);
        setFiles(response.data.data);
      } catch (err) {
        console.error("Error fetching project files: ", err);
      }
    };

    fetchFiles();
  }, []);

  const [nameSort, setNameSort] = useState(false);
  const [createDateSort, setCreateDateSort] = useState(false);
  const [updateDateSort, setUpdateDateSort] = useState(false);

  const sortByName = () => {
    let newOrder;
    if (nameSort) {
      newOrder = [...files].sort((a, b) => {
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
      newOrder = [...files].sort((a, b) => {
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
    setFiles(newOrder);
    setNameSort(!nameSort);
  };

  const sortByCreateDate = () => {
    let newOrder;
    if (createDateSort) {
      newOrder = [...files].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA - dateB;
      });
    } else {
      newOrder = [...files].sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateB - dateA;
      });
    }
    setCreateDateSort(!createDateSort);
    setFiles(newOrder);
  };

  const sortByUpdateDate = () => {
    let newOrder;
    if (updateDateSort) {
      newOrder = [...files].sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateA - dateB;
      });
    } else {
      newOrder = [...files].sort((a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
        return dateB - dateA;
      });
    }
    setUpdateDateSort(!updateDateSort);
    setFiles(newOrder);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const filesPerPage = 8;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * filesPerPage;
  const currentFiles = files.slice(offset, offset + filesPerPage);
  const pageCount = Math.ceil(files.length / filesPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={openNewFileModal}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            + New File
          </button>
        </div>
      </div>
      <FileTable
        files={currentFiles}
        sortByName={sortByName}
        sortByCreateDate={sortByCreateDate}
        sortByUpdateDate={sortByUpdateDate}
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
        Showing {files.length} results
      </div>
    </div>
  );
};

export default ProjectResources;
