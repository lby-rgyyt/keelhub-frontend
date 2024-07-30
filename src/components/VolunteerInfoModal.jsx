import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import '../assets/volunteerInfoModal.css';

const VolunteerInfoModal = ({userId, isOpen, onRequestClose, onSave}) => {
    const [volunteerInfo, setVolunteerInfo] = useState({
        skills: [],
        time_committed_per_week: 0,
        status: 'pending',
    });

    useEffect(() => {
        if (isOpen){
            fetch(`/api/volunteer-details/${userId}$`)
            .then(response => response.json())
            .then(data => setVolunteerInfo(data))
            .catch(error => console.error('Error fetching volunteer Info:', error));
        }
    }, [isOpen, userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVolunteerInfo({...volunteerInfo, [name]:value})
    }

    const handleSkillsChange = (e,index) => {
        const newSkills = [...volunteerInfo.skills];
        newSkills[index] = e.target.value;
        setVolunteerInfo({...volunteerInfo, skills: newSkills});
    }

    const handleAddSkill = () => {
        setVolunteerInfo({ ...volunteerInfo, skills: [...volunteerInfo.skills, ''] });
      };

    const handleRemoveSkill = (index) => {
        const newSkills = volunteerInfo.skills.filter((_, i) => i !== index);
        setVolunteerInfo({ ...volunteerInfo, skills: newSkills });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/voluntee-details/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(volunteerInfo),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Volunteer info updated:', data);
            onSave();
            onRequestClose();
        })
        .catch(error => console.error('Error updating voluntter info:', error));
    };

    const statusOptions = {
        pending: 'Pending Registering',
        in_progress: 'Onboarding',
        unassigned: 'Unassigned',
        assigned: 'Assigned',
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Volunteer Info">
            <div className="volunteer-info-modal">
                <h2>Update Volunteer Information</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="skills">Skills</label>
                        {volunteerInfo.skills.map((skill, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    name="skills"
                                    value={skill}
                                    onChange={(e) => handleSkillsChange(e,index)}
                                    placeholder="Skill"
                                />
                                <button type="button" onClick={() => handleRemoveSkill(index)}>Remove</button>
                    </div>
                    ))}
                    <button type="button" onClick={handleAddSkill}>Add Skill</button>
                    </div>
                    <div>
                        <label htmlFor="time_committed_per_week">Time Committed per Week (hours)</label>
                        <input type="number"
                               name="time_committed_per_week"
                               value={volunteerInfo.time_committed_per_week}
                               onChange={handleChange}
                               placeholder="Time Committed per Week" 
                               />
                    </div>
                    <div>
            <label htmlFor="status">Status</label>
            <select 
              name="status" 
              value={volunteerInfo.status} 
              onChange={handleChange}
            >
              {Object.keys(statusOptions).map((key) => (
                <option key={key} value={key}>
                  {statusOptions[key]}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Update Volunteer Info</button>
          <button type="button" onClick={onRequestClose}>Close</button>
        </form>
      </div>
    </Modal>
  );
};

export default VolunteerInfoModal;