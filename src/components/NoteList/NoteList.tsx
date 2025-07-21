
import css from './NoteList.module.css'

function NoteList() {

  return (
    <ul className={css.list}>
      {/* Набір елементів списку нотатків */}
      <li className={css.listItem}>
        <h2 className={css.title}>Note title</h2>
        <p className={css.content}>Note content</p>
        <div className={css.footer}>
          <span className={css.tag}>Note tag</span>
          <button className={css.button}>Delete</button>
        </div>
      </li>
    </ul>

  )
}

export default NoteList
