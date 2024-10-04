import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaGithub, FaEdit, FaSave, FaInstagram } from 'react-icons/fa';
import Navbar from '../../components/Navbar'
import './userprofile.css';

const Userprofile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 8900",
        description: "Experienced web developer with a passion for creating user-friendly interfaces.",
        linkedin: "https://www.linkedin.com/in/johndoe",
        instagram: "https://twitter.com/johndoe",
        github: "https://github.com/johndoe"
    });

    const [editedProfile, setEditedProfile] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = () => {
        setIsEditing(false);
        setProfile(editedProfile);
    };

    const handleChange = (e) => {
        setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
    };

    const currentProjects = [
        {
            id: 1,
            title: "E-commerce Website",
            description: "Developing a responsive e-commerce platform with React and Node.js",
            image: "https://www.milesweb.in/blog/wp-content/uploads/2022/06/why-use-wordpress.png",
            price: "$2,500",
            deadline: "2023-09-15"
        },
        {
            id: 2,
            title: "Mobile App UI Design",
            description: "Creating user interface designs for a fitness tracking mobile application",
            image: "https://www.simplilearn.com/ice9/free_resources_article_thumb/IsGraphic_DesignAGoodCareerb.jpg",
            price: "$1,800",
            deadline: "2023-08-30"
        }
    ];

    const calculateDeadline = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? `${diffDays} days remaining` : "Overdue";
    };

    return (
        <>
            <Navbar />
            <div className="userprof">
                <div className="profile-page" style={{ color: 'black' }}>
                    <div className="profile-container">
                        <div className="profile-left">
                            <img className="profile-pic" src="https://thumbs.dreamstime.com/b/businessman-profile-icon-male-portrait-flat-design-vector-illustration-47075253.jpg" alt={profile.name} />
                            {isEditing ? (
                                <div className="edit-form">
                                    <input name="name" value={editedProfile.name} onChange={handleChange} />
                                    <input name="email" value={editedProfile.email} onChange={handleChange} />
                                    <input name="phone" value={editedProfile.phone} onChange={handleChange} />
                                    <textarea name="description" value={editedProfile.description} onChange={handleChange} />
                                    <input name="linkedin" value={editedProfile.linkedin} onChange={handleChange} />
                                    <input name="twitter" value={editedProfile.instagram} onChange={handleChange} />
                                    <input name="github" value={editedProfile.github} onChange={handleChange} />
                                    <button onClick={handleSave}><FaSave /> Save</button>
                                </div>
                            ) : (
                                <div className="profile-info">
                                    <h1>{profile.name}</h1>
                                    <p><FaEnvelope /> {profile.email}</p>
                                    <p><FaPhone /> {profile.phone}</p>
                                    <p>{profile.description}</p>
                                    <div className="social-links">
                                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                        <a href={profile.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
                                    </div>
                                    <button onClick={handleEdit}><FaEdit /> Edit Profile</button>
                                </div>
                            )}
                        </div>
                        <div className="profile-right">
                            <h2>Selected Projects</h2>
                            <div className="cards">
                                {currentProjects.map(project => (
                                    <div key={project.id} className="card">
                                        <img src={project.image} alt={project.title} />
                                        <div className="card-content">
                                            <h2>{project.title}</h2>
                                            <p>{project.description}</p>
                                            <span className="price">{project.price}</span>
                                            <div className="profile-details">
                                                <span className="deadline">{calculateDeadline(project.deadline)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Userprofile;