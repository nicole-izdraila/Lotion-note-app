import { useOutletContext, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Content({ edit }) {
  const { noteId } = useParams();
  const [notes, updateNote, removeNote] = useOutletContext();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [when, setTime] = useState(new Date());
  const navigate = useNavigate();

  const saved = () => {
    const newNote = { ...notes[noteId], title, when, body };
    updateNote(newNote, noteId);
    navigate(`/notes/${noteId}`);
  };

  const deleteNote = () => {
    removeNote(noteId);
  };

  const moveToEditPath = () => {
    // use useNavigate to go to /notes/noteId/edit
    navigate(`/notes/${noteId}/edit`);
  };

  useEffect(() => {
    if (noteId && notes && notes.length >= 0 && notes[noteId]) {
      const currentNote = notes[noteId];
      //console.log(notes, currentNote, noteId);
      setTitle(currentNote.title);
      setBody(currentNote.body);
      setTime(currentNote.when);
    }
  }, [noteId, notes]);

  return (
    <>
      {notes.length > 0 && notes[noteId] ? (
        <div>
          {!edit ? (
            <div id="right-title-button">
              <h2 id="content-title">{notes[noteId].title}</h2>
              <button id="edit-button" onClick={moveToEditPath}>
                EDIT
              </button>
              <button id="delete-button" onClick={() => deleteNote()}>
                DELETE
              </button>
            </div>
          ) : (
            <div id="title-format">
              <input
                id="title-input"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                wrap="soft"
              />
              <button id="save-button" onClick={() => saved()}>
                SAVE
              </button>
              <button id="delete-button" onClick={() => deleteNote()}>
                DELETE
              </button>
            </div>
          )}
          <input
            onChange={(e) => setTime(e.target.value)}
            value={when}
            type="datetime-local"
            className="date-time box"
          ></input>

          {!edit ? (
            <p
              id="content-body"
              dangerouslySetInnerHTML={{ __html: notes[noteId].body }}
            ></p>
          ) : (
            <div id="quill-body">
              <ReactQuill value={body} onChange={setBody} />
            </div>
          )}
        </div>
      ) : (
        <p>Select a note, or create a new one</p>
      )}
    </>
  );
}

export default Content;
