
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList'
import Pagination from '../Pagination/Pagination'
import SearchBox from '../SearchBox/SearchBox'
import css from './App.module.css'

function App() {

  fetchNotes('', 1).then(data => console.log(data));

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination />
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList />
    </div>
  )
}

export default App
