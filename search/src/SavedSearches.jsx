import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import { SavedSearch } from "./SavedSearch";

export function SavedSearches({ visible, searches, setSearches }) {
  return (
    <Collapse in={visible}>
      <div id="searches">
        <div className="row">
          {searches.map((search) => {
            return <SavedSearch key={search.id} search={search} />;
          })}
        </div>
        <div className="row my-2">
          <div className="col-12 text-muted text-center">
            <span style={{ fontSize: ".9625rem" }}>
              This history includes most recent or saved searches. Use the
              Actions icons to save/name searches and preserve up to 10 in this
              list.
            </span>
          </div>
          <div className="col-4 offset-md-4 text-center">
            <Button variant="secondary">Delete all previous searches</Button>
          </div>
        </div>
      </div>
    </Collapse>
  );
}
