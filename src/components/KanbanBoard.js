import React, { useState, useEffect } from 'react';
import FilterMenu from './FilterMenu';
import TicketCard from './TicketCard';
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
import addIcon from '../assets/add.svg';
import menuIcon from '../assets/3 dot menu.svg';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');

  const priorityLabels = {
    4: { label: 'Urgent', icon: urgentIcon },
    3: { label: 'High', icon: highPriorityIcon },
    2: { label: 'Medium', icon: mediumPriorityIcon },
    1: { label: 'Low', icon: lowPriorityIcon },
    0: { label: 'No Priority', icon: noPriorityIcon }
  };

  const statusLabels = {
    'Backlog': { label: 'Backlog', icon: backlog },
    'Todo': { label: 'Todo', icon: todoIcon },
    'In progress': { label: 'In progress', icon: inProgressIcon },
    'Done': { label: 'Done', icon: doneIcon },
    'Cancelled': { label: 'Cancelled', icon: cancelledIcon }
  };

  useEffect(() => {
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
  }, [groupBy]);

  useEffect(() => {
    localStorage.setItem('sortBy', sortBy);
  }, [sortBy]);

  const groupTickets = (tickets, groupBy) => {
    const groups = {};
    tickets.forEach(ticket => {
      let key;
      if (groupBy === 'status') {
        key = ticket.status;
      } else if (groupBy === 'user') {
        const user = users.find(user => user.id === ticket.userId);
        key = user ? user.name : 'Unknown User';
      } else if (groupBy === 'priority') {
        key = priorityLabels[ticket.priority].label;
      } else {
        key = ticket[groupBy];
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(ticket);
    });
    return groups;
  };

  const sortTickets = (groupedTickets, sortBy) => {
    for (const group in groupedTickets) {
      groupedTickets[group].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        } else if (sortBy === 'title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }
    return groupedTickets;
  };

  const groupedTickets = groupTickets(tickets, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  const allStatusGroups = groupBy === 'status' ? Object.keys(statusLabels).reduce((acc, status) => {
    acc[status] = sortedTickets[status] || [];
    return acc;
  }, {}) : sortedTickets;

  return (
    <div>
      <FilterMenu setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <div className="columns">
        {Object.keys(allStatusGroups).map((group) => (
          <div className="column" key={group}>
            <h2>
              <span className="heading-text">
                {groupBy === 'priority' && (
                  <img src={priorityLabels[Object.keys(priorityLabels).find(key => priorityLabels[key].label === group)].icon} alt={group} className="priority-icon" />
                )}
                {groupBy === 'status' && (
                  <img src={statusLabels[group].icon} alt={group} className="status-icon" />
                )}
                {group.charAt(0).toUpperCase() + group.slice(1)}{' '}
                <span className="task-count">{allStatusGroups[group].length}</span>
              </span>
              <img src={addIcon} alt="add" className="add-icon" />
              <img src={menuIcon} alt="menu" className="menu-icon" />
            </h2>
            {allStatusGroups[group].map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} users={users} groupBy={groupBy} statusLabels={statusLabels}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;