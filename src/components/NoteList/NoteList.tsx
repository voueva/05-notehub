import { useState } from 'react';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface NoteListProps {
  notes: Array<Note>;
}

export default function NoteList({ notes }: NoteListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteNote(id);
      toast.success('Note deleted!');
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    } catch (error) {
      toast.error('Failed to delete note: ' + error);
    } finally {
      setDeletingId(null);
    }
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
