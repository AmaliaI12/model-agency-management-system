import React, { useState } from "react";

interface Props {
  onFilterChange: (filters: any) => void;
}

const SidebarRight: React.FC<Props> = ({ onFilterChange }) => {
  const [nameFilter, setNameFilter] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    onFilterChange({ name: e.target.value });
  };

  return (
    <div className="sidebar-right">
      <h3>Filters</h3>
      <input
        type="text"
        placeholder="Filter by name"
        value={nameFilter}
        onChange={handleChange}
      />
    </div>
  );
};

export default SidebarRight;
