import React, { useState, useEffect, useRef } from 'react';
import downArrowIcon from '../assets/down.svg';
import displayIcon from '../assets/Display.svg';

const FilterMenu = ({ setGroupBy, setSortBy }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGroupBy, setSelectedGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [selectedSortBy, setSelectedSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const dropdownRef = useRef(null);

  const handleGroupChange = (event) => {
    const value = event.target.value;
    setSelectedGroupBy(value);
    setGroupBy(value);
    localStorage.setItem('groupBy', value);
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSelectedSortBy(value);
    setSortBy(value);
    localStorage.setItem('sortBy', value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-menu" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        <img src={displayIcon} alt="display icon" className="display-icon" />
        Display
        <img src={downArrowIcon} alt="down arrow" className="down-arrow-icon" />
      </button>
      {dropdownOpen && (
        <div className="dropdown-content">
          <div>
            <label htmlFor="group-by">Grouping</label>
            <select id="group-by" value={selectedGroupBy} onChange={handleGroupChange}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="sort-by">Ordering</label>
            <select id="sort-by" value={selectedSortBy} onChange={handleSortChange}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;