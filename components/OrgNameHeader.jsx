import React, { useState, useEffect, useRef } from "react";

function OrgNameHeader({ orgName, setOrgName }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(orgName);
  const clickCount = useRef(0);
  const lastClick = useRef(0);
  const inputRef = useRef(null); // Create a ref for the input element to focus it programmatically

  // Fetch orgName from localStorage or set default name
  useEffect(() => {
    const savedOrgName = localStorage.getItem("orgName"); // Check if it's already stored
    if (savedOrgName) {
      setOrgName(savedOrgName);
      setInput(savedOrgName); // Set the initial input state from localStorage
    } else {
      setOrgName("Holbox AI Demo"); // Default name
      setInput("Holbox AI Demo");
    }
  }, []);

  // Handle the triple-click action to start editing
  const handleClick = () => {
    const now = Date.now();
    if (now - lastClick.current < 1000) {
      clickCount.current += 1;
    } else {
      clickCount.current = 1;
    }
    lastClick.current = now;

    if (clickCount.current === 3) {
      setEditing(true);
      clickCount.current = 0;
    }
  };

  // Save the updated org name locally
  const handleSave = () => {
    localStorage.setItem("orgName", input); // Save to localStorage
    setOrgName(input);  // Update the parent state with the new name
    setEditing(false);   // Exit edit mode
  };

  // If in editing mode, show an input field
  if (editing) {
    return (
      <span>
        <input
          ref={inputRef} // Attach ref to the input
          autoFocus // Focus the input when editing
          className="border rounded p-1 text-xs"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="ml-2 text-xs text-blue-600" onClick={handleSave}>
          Save
        </button>
      </span>
    );
  }

  // Otherwise, show the organization name and listen for a triple-click to enable editing
  return (
    <span
      className="ml-2.5 text-xs font-medium md:inline-block heading-font cursor-pointer select-none"
      title="Triple-click to edit"
      onClick={handleClick}
    >
      {orgName}
    </span>
  );
}

export default OrgNameHeader;

