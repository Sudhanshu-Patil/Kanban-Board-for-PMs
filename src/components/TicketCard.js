import React from 'react';
import urgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import highPriorityIcon from '../assets/Img - High Priority.svg';
import mediumPriorityIcon from '../assets/Img - Medium Priority.svg';
import lowPriorityIcon from '../assets/Img - Low Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import todoIcon from '../assets/To-do.svg';
import backlog from '../assets/Backlog.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import tagIcon from '../assets/tag_icon.svg';
import Avatar from './Avatar';

const TicketCard = ({ ticket, users, groupBy }) => {
  const priorityIcons = {
    4: urgentIcon,
    3: highPriorityIcon,
    2: mediumPriorityIcon,
    1: lowPriorityIcon,
    0: noPriorityIcon
  };

  const statusIcons = {
    'Backlog': backlog,
    'Todo': todoIcon,
    'In progress': inProgressIcon,
    'Done': doneIcon,
    'Cancelled': cancelledIcon,
    'No priority': noPriorityIcon
  };

  const user = users.find(user => user.id === ticket.userId);
  const userName = user ? user.name : 'Unknown User';
  const profilePic = user ? user.profilePic : null;
  const available = user ? user.available : false;

  return (
    <div className="ticket-card">
      <p className="ticket-id">{ticket.id}</p>
      <div className="title-container">
        {(groupBy === 'user' || groupBy === 'priority') && (
          <img src={statusIcons[ticket.status]} alt={ticket.status} className="status-icon" />
        )}
        <h3>{ticket.title}</h3>
      </div>
      <div className="ticket-tag">
        {groupBy !== 'priority' && (
          <img src={priorityIcons[ticket.priority]} alt="priority" className="priority-icon" />
        )}
        <img src={tagIcon} alt="tag" className="tag-icon" />
        <p>{ticket.tag}</p>
      </div>
      <Avatar name={userName} profilePic={profilePic} available={available} />
    </div>
  );
};

export default TicketCard;