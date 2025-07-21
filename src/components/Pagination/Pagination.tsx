
import ReactPaginate from 'react-paginate'
import css from './Pagination.module.css'

function Pagination() {

  return (<div>ReactPaginate</div>
    // <ReactPaginate 
    //   pageCount={data.total_pages}
    //   pageRangeDisplayed={5}
    //   marginPagesDisplayed={1}
    //   onPageChange={({ selected }) => setCurrentPage(selected + 1)}
    //   forcePage={currentPage - 1}
    //   containerClassName={css.pagination}
    //   activeClassName={css.active}
    //   nextLabel="→"
    //   previousLabel="←"
    // />
  )
}

export default Pagination
