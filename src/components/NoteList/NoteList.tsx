import { useState } from 'react';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Array<Note>;
  onDelete: (id: number) => void;
}

function NoteList({ notes, onDelete }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <ul className={css.list}>
      {notes.map(item => (
        <li key={item.id} className={css.listItem}>
          <h2 className={css.title}>{item.title}</h2>
          <p className={css.content}>{item.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{item.tag}</span>
            <button
              className={css.button}
              onClick={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
            >
              {deletingId === item.id ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;

