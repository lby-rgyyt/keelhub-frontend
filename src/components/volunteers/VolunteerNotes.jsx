import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Modal from "react-modal";
import { UserContext } from "../../context/UserContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/VolunteerNotes.css";

const VolunteerNotes = ({ volunteerId }) => {
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
    <div className="volunteer-notes">
      <div className="add-note">
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write a note..."
        />
        <div className="note-actions">
          <button onClick={openModal}>View Notes ({notes.length})</button>
          <button onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Volunteer Notes"
        className="notes-modal"
      >
        <h2>Notes for {volunteerId}</h2>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <div className="note-header">
                <span className="note-title">Note {note.id}</span>
                <span className="note-date">
                  Created {new Date(note.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="note-content">{note.notes}</div>
            </div>
          ))}
        </div>
        <button className="close-button" onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default VolunteerNotes;
