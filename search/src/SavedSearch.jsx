export function SavedSearch({ search, handleDelete, handleEdit }) {
  return (
    <div className="ms-4 mt-2 row">
      <div className="col-2" style={{ fontSize: '.9625rem' }}>
        <a className="pe-auto" style={{ cursor: 'pointer' }} onClick={() => handleEdit(search.id)}>✏</a>
        <a className="ms-1" style={{ cursor: 'pointer' }} onClick={() => handleDelete(search.id)}>🚮</a>
      </div>
      <div className="col-3" style={{ fontSize: '.9625rem' }}>
        {search.name || 'none'}
      </div>
      <div className="col-7" style={{ fontSize: '.9625rem' }}>
        <a className="text-muted" href={`/?q=${search.query}`}>{search.query}</a>
      </div>
    </div>
  );
}
