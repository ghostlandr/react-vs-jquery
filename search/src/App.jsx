import { useLocalStorage } from "@uidotdev/usehooks";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "react-bootstrap/Button";

import { QueryModifiers } from "./QueryModifiers";
import { SavedSearches } from "./SavedSearches";
import { useEffectiveQuery } from "./hooks/useEffectiveQuery";

const INITIAL_QUERY_MODS = {
  recentCheckIns: true,
  excludeDroplets: true,
  stage2Only: false,
  excludeStage2: false,
};

const EMPTY_QUERY_MODS = {
  recentCheckIns: false,
  excludeDroplets: false,
  stage2Only: false,
  excludeStage2: false,
};

function App() {
  const [showQueryMods, setShowQueryMods] = React.useState(false);
  const [showSearches, setShowSearches] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searches, setSearches] = useLocalStorage("saved_searches", []);
  const [queryMods, setQueryMods] = React.useState(INITIAL_QUERY_MODS);

  const effectiveQuery = useEffectiveQuery(queryMods, search);

  const handleSubmit = () => {
    setSearches((searches) => [
      ...searches,
      {
        id: Date.now(),
        query: effectiveQuery,
      },
    ]);
  };

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-8">
          <div className="row" style={{ paddingTop: "2em" }}>
            <form id="search-form">
              <div className="form-group row">
                <div className="col col-8">
                  <input
                    className="form-control"
                    name="q"
                    id="search-q"
                    type="text"
                    value={search}
                    onChange={(el) => setSearch(el.target.value)}
                    autoFocus=""
                  />
                </div>
                <div className="col col-4">
                  <Button onClick={handleSubmit} variant="primary">
                    Search The Fleet
                  </Button>
                </div>
              </div>
            </form>
          </div>
          <div className="row" style={{ marginTop: "0.75em" }}>
            <div className="row">Effective query:</div>
            <div className="row">
              <pre id="effective-query" className="text-wrap">
                {effectiveQuery}
              </pre>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex justify-content-between w-100">
              <div>
                <Button
                  onClick={() => setShowQueryMods(!showQueryMods)}
                  aria-expanded={showQueryMods}
                  aria-controls="query-modifiers"
                >
                  {showQueryMods ? "Hide" : "Show"} query modifiers
                </Button>
                <Button
                  variant="link"
                  onClick={() => setQueryMods(EMPTY_QUERY_MODS)}
                >
                  Clear query modifiers
                </Button>
              </div>
              {searches.length > 0 && (
                <div className="d-flex align-items-center" id="searches-button">
                  <Button
                    onClick={() => setShowSearches(!showSearches)}
                    aria-expanded="false"
                    aria-controls="searches"
                  >
                    {showSearches ? "Hide" : "Show"} {searches.length} previous
                    search{searches.length === 1 ? "" : "es"}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <QueryModifiers
            mods={queryMods}
            setMods={setQueryMods}
            visible={showQueryMods}
          />
          <SavedSearches
            searches={searches}
            setSearches={setSearches}
            visible={showSearches}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
