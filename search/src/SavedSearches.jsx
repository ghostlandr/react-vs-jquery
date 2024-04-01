import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { SavedSearch } from "./SavedSearch";

export function SavedSearches({ visible, searches, setSearches }) {
  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this search?")) return;

    const newSearches = [];
    for (let i = 0; i < searches.length; i++) {
      // Don't re-add the removed search
      if (searches[i].id === id) continue;
      newSearches.push(searches[i]);
    }

    setSearches(newSearches);
  }
  function handleEdit(id) {
    const name = prompt("What would you like to name this search?");
    if (!name) {
      return;
    }

    const newSearches = searches.map((search) => {
      if (search.id === id) {
        search.name = name;
      }
      return search;
    });

    setSearches(newSearches);
  }
  function handleDeleteAll() {
    if (
      !confirm(
        "Are you sure you want to delete all previous searches - including named ones?"
      )
    )
      return;

    setSearches([]);
  }

  return (
    <Collapse in={visible}>
      <>
        <div className="ms-4 row">
          <div className="col-2">Actions</div>
          <div className="col-3">Name</div>
          <div className="col-7">Query</div>
        </div>
        <div id="searches">
          <div className="row">
            {searches.map((search) => {
              return (
                <SavedSearch
                  key={search.id}
                  search={search}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              );
            })}
          </div>
          <div className="row my-2">
            <div className="col-12 text-muted text-center">
              <span style={{ fontSize: ".9625rem" }}>
                This history includes most recent or saved searches. Use the
                Actions icons to save/name searches and preserve up to 10 in
                this list.
              </span>
            </div>
            <div className="col-4 offset-md-4 text-center">
              <Button variant="secondary" onClick={handleDeleteAll}>
                Delete all previous searches
              </Button>
            </div>
          </div>
        </div>
      </>
    </Collapse>
  );
}
