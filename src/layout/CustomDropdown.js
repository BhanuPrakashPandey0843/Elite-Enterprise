import React, { useState } from 'react';
import Dropdown from 'react-multilevel-dropdown';

const CustomDropdown = ({ title, children, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Dropdown 
        title={title}
        openOnHover={true}
        isOpen={isOpen}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClick();
        }}
      >
        {children}
      </Dropdown>
    </div>
  );
};
export default CustomDropdown