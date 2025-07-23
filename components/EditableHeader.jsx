"user client"
import React, { useState, useEffect, useRef } from "react";

function EditableHeader({ headerText, setHeaderText, paraText, setParaText }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(headerText);
  const [paraInput, setParaInput] = useState(paraText);
  const clickCount = useRef(0);
  const lastClick = useRef(0);
  const inputRef = useRef(null);

  // Fetch the header and paragraph text from localStorage
  useEffect(() => {
    const savedHeaderText = localStorage.getItem("headerText");
    const savedParaText = localStorage.getItem("paraText");
    
    if (savedHeaderText) {
      setHeaderText(savedHeaderText);
      setInput(savedHeaderText);
    } else {
      setHeaderText("Agentic AI Demo Interface");
      setInput("Agentic AI Demo Interface");
    }

    if (savedParaText) {
      setParaText(savedParaText);
      setParaInput(savedParaText);
    } else {
      setParaText("Explore our suite of Agentic AI features and tools designed to transform your business operations");
      setParaInput("Explore our suite of Agentic AI features and tools designed to transform your business operations");
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

  // Save the updated header and paragraph text locally
  const handleSave = () => {
    localStorage.setItem("headerText", input);
    localStorage.setItem("paraText", paraInput);
    setHeaderText(input);
    setParaText(paraInput);
    setEditing(false);
  };

  // If in editing mode, show input fields for both header and paragraph
  if (editing) {
    return (
      <div className="mb-5 flex flex-col  items-center">
        <input
          ref={inputRef}
          autoFocus
          className="border rounded p-3 text-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          className="border rounded p-3 text-lg mt-2"
          value={paraInput}
          onChange={(e) => setParaInput(e.target.value)}
        />
        <button className="ml-2 text-md text-blue-600" onClick={handleSave}>
          Save
        </button>
      </div>
    );
  }

  // Otherwise, show the header and paragraph and listen for triple-click to enable editing
  return (
    <div>
      <h1
        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 md:mb-5 text-gray-800 heading-font"
        title="Triple-click to edit"
        onClick={handleClick}
      >
        {headerText}
      </h1>
      <p
        className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto mb-5 md:mb-8 para-font"
        title="Triple-click to edit"
        onClick={handleClick}
      >
        {paraText}
      </p>
    </div>
  );
}

export default EditableHeader;
