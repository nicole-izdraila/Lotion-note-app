import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
const localStorageKey = "pizza";

function Layout() {
  const existing = localStorage.getItem(localStorageKey);
  const [notes, setNotes] = useState([]);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (existing) {
      setNotes(JSON.parse(existing));
    }
  }, []);

  useEffect(() => {
    // updagin localStorage to reflect the latest changes in notes
    localStorage.setItem(localStorageKey, JSON.stringify(notes));
    console.log("notes changed");
    // the dependecy arrays makes sure to run the code every time "notes" changes
  }, [notes]);

  const updateNote = (newValue, noteId) => {
    const noteIDnumber = parseInt(noteId);
    let temp = [
      ...notes.slice(0, noteIDnumber),
      { ...newValue, when: new Date(newValue.when).toJSON() },
      ...notes.slice(noteIDnumber + 1),
    ];
    console.log(temp);
    setNotes(temp);
  };

  const removeNote = (noteId) => {
    const noteIdNumber = parseInt(noteId);
    const temp2 = [
      ...notes.slice(0, noteIdNumber),
      ...notes.slice(noteIdNumber + 1),
    ];
    setNotes(temp2);
  };

  const addNewNote = () => {
    setNotes([
      {
        title: `Untitled ${notes.length}`,
        body: "Body",
        when: "Time",
      },
      ...notes,
    ]);
  };

  return (
    <>
      <header>
        <div id="menu-bar">
          <button onClick={() => setToggle(!toggle)}>&#9776;</button>
          <div id="title">
            <h1>Lotion</h1>
            <p>Like Notion, but worse</p>
          </div>
        </div>
      </header>
      <div id="content">
        <div className="app-sidebar-header">
          {toggle && (
            <div className="left-container">
              <div className="header-container">
                <div className="header-left-sidebar">
                  <h1>Notes</h1>
                  <button onClick={addNewNote}>+</button>
                </div>
              </div>
              <div className="header-container">
                {notes.length === 0 ? (
                  <p className="note-body-container">add a note</p>
                ) : (
                  <ul id="notes-list">
                    {notes.map((element, idx) => (
                      <li>
                        <NavLink to={`/notes/${idx}`}>
                          <h2>{element.title}</h2>
                          <small>{element.when}</small>
                          <p
                            dangerouslySetInnerHTML={{ __html: element.body }}
                          />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          <div className="right-container">
            {/* child components get injected here and replace <Outlet /> */}
            <Outlet context={[notes, updateNote, removeNote]} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
