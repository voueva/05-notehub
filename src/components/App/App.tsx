import { useEffect, useState } from 'react';
import { createNote, fetchNotes, type NoteListResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

function App() {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wasSearched, setWasSearched] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Пошукове значення більше не приходить ззовні, тому запит має бути адаптований
  const {
    data = { notes: [], totalPages: 0 } as NoteListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: (prevData) => prevData,
  });

  const handleCreate = async (
    title: string,
    content: string,
    tag: string
  ) => {
    try {
      await createNote(title, content, tag);
      toast.success('Note created!');
    } catch (error) {
      toast.error('Failed to create note: ' + error);
    }
  };

  useEffect(() => {
    if (wasSearched && !isLoading && data.notes?.length === 0 && !isError) {
      toast.error('No notes found for your request.');
    }
  }, [data, isLoading, isError, wasSearched]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        {
          data.totalPages > 1 &&
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        }
        <button className={css.button} onClick={() => setShowModal(true)}>Create note +</button>
      </header>

      <NoteList notes={data.notes} />
      <Toaster />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <NoteForm onCreate={handleCreate} onCancel={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default App;
