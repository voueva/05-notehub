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
import { useDebouncedCallback } from 'use-debounce';

export default function App() {
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
    setCurrentPage(1);
  }, 500);

  const {
    data = { notes: [], totalPages: 0 } as NoteListResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['notes', debouncedQuery, currentPage],
    queryFn: () => fetchNotes(debouncedQuery, currentPage),
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
        <SearchBox
          onSearch={(value) => {
            debouncedSearch(value);
          }}
        />
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
