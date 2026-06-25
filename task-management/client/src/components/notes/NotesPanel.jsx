import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Trash2, FileText } from "lucide-react";
import useNoteStore from "../../store/noteStore";

export function NotesPanel() {
  const { notes, loading, activeNote, panelOpen, togglePanel, fetchNotes, createNote, setActiveNote, updateNote, deleteNote } = useNoteStore();
  const saveTimer = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    if (panelOpen) fetchNotes();
  }, [panelOpen, fetchNotes]);

  const handleCreate = async () => {
    const note = await createNote();
    fetchNotes();
    setActiveNote(note);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    if (activeNote?._id === id) setActiveNote(null);
  };

  const debouncedSave = useCallback((id, field, value) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      updateNote(id, { [field]: value });
    }, 800);
  }, [updateNote]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {panelOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={togglePanel}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-surface dark:bg-surface-dark border-l border-border dark:border-border-dark shadow-strong"
          >
            <div className="flex items-center justify-between px-4 h-[72px] border-b border-border dark:border-border-dark">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold text-text-primary dark:text-text-primary-dark">Notes</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCreate}
                  className="p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
                  aria-label="New note"
                >
                  <Plus className="w-5 h-5" />
                </button>
                <button
                  onClick={togglePanel}
                  className="p-2 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary text-text-secondary hover:text-text-primary dark:hover:text-text-primary-dark transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="h-[calc(100%-72px)] overflow-y-auto">
              {loading && notes.length === 0 ? (
                <div className="p-4 space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="card p-3.5">
                      <div className="skeleton h-4 w-3/4 mb-2" />
                      <div className="skeleton h-3 w-1/2" />
                    </div>
                  ))}
                </div>
              ) : activeNote ? (
                <NoteEditor
                  note={activeNote}
                  onSave={debouncedSave}
                  onDelete={handleDelete}
                  titleRef={titleRef}
                />
              ) : notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-8 mt-12">
                  <div className="w-12 h-12 bg-surface-secondary dark:bg-surface-dark-secondary rounded-xl flex items-center justify-center mb-3">
                    <FileText className="w-6 h-6 text-text-secondary dark:text-text-secondary-dark" />
                  </div>
                  <h3 className="font-semibold text-text-primary dark:text-text-primary-dark mb-1">No notes yet</h3>
                  <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4">Create your first note.</p>
                  <button onClick={handleCreate} className="btn-primary">+ New Note</button>
                </div>
              ) : (
                <div className="p-3 space-y-1">
                  {notes.map((note) => (
                    <button
                      key={note._id}
                      onClick={() => setActiveNote(note)}
                      className="w-full text-left p-3 rounded-lg hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-text-primary dark:text-text-primary-dark truncate">
                            {note.title || "Untitled"}
                          </p>
                          <p className="text-xs text-text-secondary dark:text-text-secondary-dark mt-0.5 line-clamp-1">
                            {note.content || "No content"}
                          </p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(note._id); }}
                          className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-danger/10 text-text-secondary hover:text-danger transition-all"
                          aria-label="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function NoteEditor({ note, onSave, onDelete, titleRef }) {
  const handleTitleChange = (e) => {
    onSave(note._id, "title", e.target.value);
  };

  const handleContentChange = (e) => {
    onSave(note._id, "content", e.target.value);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark uppercase tracking-wider">Editing</h3>
        <button
          onClick={() => onDelete(note._id)}
          className="p-1.5 rounded-lg hover:bg-danger/10 text-text-secondary dark:text-text-secondary-dark hover:text-danger transition-colors"
          aria-label="Delete note"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <input
        ref={titleRef}
        defaultValue={note.title}
        onBlur={handleTitleChange}
        className="w-full text-xl font-bold text-text-primary dark:text-text-primary-dark bg-transparent border-none focus:outline-none placeholder:text-text-secondary/40"
        placeholder="Note title..."
      />
      <textarea
        defaultValue={note.content}
        onBlur={handleContentChange}
        className="w-full min-h-[300px] text-sm text-text-primary dark:text-text-primary-dark bg-transparent border-none focus:outline-none resize-none placeholder:text-text-secondary/40 leading-relaxed"
        placeholder="Start writing..."
      />
    </div>
  );
}
