import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { UserContext } from "../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/VolunteerNotes.css";

const VolunteerNotes = ({ volunteerId, currentVolunteer }) => {
  const { currentUser } = useContext(UserContext);
  const token = localStorage.getItem("token");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/user-notes/getAllNotes`,
        {
          params: {
            created_by: currentUser.id,
            volunteer_id: volunteerId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("note: ", response.data);
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAddNote = async () => {
    if (note.trim() !== "") {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/user-notes/createNotes",
          {
            notes: note,
            created_by: currentUser.id,
            updated_by: currentUser.id,
            volunteer_id: volunteerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNote("");
        fetchNotes();
        toast.success("Added a new note!");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Add Note</h3>
      <textarea
        value={note}
        onChange={handleNoteChange}
        className="w-full p-2 border rounded mb-4"
        rows="4"
        placeholder="Write an extravagant note about a wonderful volunteer"
      />
      <div className="flex justify-end items-center space-x-4">
        <button onClick={openModal} className="text-blue-600 hover:underline">
          View Notes ({notes.length})
        </button>
        <button
          onClick={handleAddNote}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Add
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Volunteer Notes"
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentVolunteer?.first_name} {currentVolunteer?.last_name} Notes
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            {notes.map((note, index) => (
              <div key={note.id} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Note {index + 1}</span>
                  <span className="text-sm text-gray-500">
                    Created {new Date(note.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-gray-700 whitespace-pre-wrap">
                  {note.notes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VolunteerNotes;
