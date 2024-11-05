import React from 'react';

const Avatar = ({ name, profilePic, available }) => {
  const initials = getInitials(name);
  const backgroundColor = getColorFromInitials(initials);
  return (
    <div className="avatar" style={{ backgroundColor }}>
      {profilePic ? (
        <img src={profilePic} alt={name} className="avatar-img" />
      ) : (
        <span className="avatar-initials">{initials}</span>
      )}
      <div className={`availability-indicator ${available ? 'available' : 'unavailable'}`}></div>
    </div>
  );
};

const getInitials = (name) => {
  const initials = name.split(' ').map(word => word[0]).join('');
  return initials.toUpperCase();
};

const getColorFromInitials = (initials) => {
  const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33', '#33FFF5', '#8C33FF', '#FF3333'
  ];
  const hash = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

export default Avatar;