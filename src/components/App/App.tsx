import { useEffect, useState } from 'react';
import { fetchNotes, type NoteListResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import css from './App.module.css';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const {
    data = { notes: [], totalPages: 0 } as NoteListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', query, currentPage],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: (prevData) => prevData,
  });

  useEffect(() => {
    if (!isLoading && data.notes?.length === 0 && !isError) {
      toast.error('No notes found for your request.');
    }
  }, [data, isLoading, isError]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={setQuery} />
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
          <NoteForm onClose={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}
