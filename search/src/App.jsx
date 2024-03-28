import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

import { QueryModifiers } from './QueryModifiers';

function App() {
  const [showQueryMods, setShowQueryMods] = React.useState(false);
  const [showSearches, setShowSearches] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [effectiveQuery, setEffectiveQuery] = React.useState('');
  const [searches, setSearches] = React.useState([]);
  const [queryMods, setQueryMods] = React.useState({
    recentCheckIns: true,
    excludeDroplets: true,
    stage2Only: false,
    excludeStage2: false,
  });

  const handleSubmit = () => {
    setSearches(searches => [...searches, effectiveQuery]);
  }

  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col col-8">
          <div className="row" style={{ paddingTop: '2em' }}>
            <form id="search-form">
              <div className="form-group row">
                <div className="col col-8">
                  <input className="form-control" name="q" id="search-q" type="text" value={search} onChange={el => setSearch(el.target.value)} autoFocus="" />
                </div>
                <div className="col col-4">
                  <Button onClick={handleSubmit} variant="primary">Search The Fleet</Button>
                </div>
              </div>
            </form>
          </div>
          <div className="row" style={{ marginTop: '0.75em' }}>
            <div className="row">Effective query:</div>
            <div className="row">
              <pre id="effective-query" className="text-wrap">{effectiveQuery}</pre>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="d-flex justify-content-between w-100">
              <div>
                <Button onClick={() => setShowQueryMods(!showQueryMods)} className="link-secondary" aria-expanded={showQueryMods} aria-controls="query-modifiers">
                  {showQueryMods ? 'Hide' : 'Show'} query modifiers
                </Button>
                <Button variant="link">Clear query
                  modifiers</Button>
              </div>
              {searches.length > 0 &&
                <div className="d-flex align-items-center" id="searches-button">
                  <Button className="link-secondary" onClick={() => setShowSearches(!showSearches)} aria-expanded="false"
                    aria-controls="searches">
                    {showSearches ? 'Hide' : 'Show'} {searches.length} previous search{searches.length === 1 ? '' : 'es'}
                  </Button>
                </div>
              }
            </div>
          </div>
          <QueryModifiers mods={queryMods} setMods={setQueryMods} visible={showQueryMods} />
          <Collapse in={showSearches}>
            <div id="searches">
              <div className="row" id="search-content"></div>
              <div className="row my-2">
                <div className="col-12 text-muted text-center">
                  <span style={{ fontSize: '.9625rem' }}>This history includes most recent or saved searches. Use the Actions
                    icons to save/name searches and preserve up to 10 in this list.</span>
                </div>
                <div className="col-4 offset-md-4 text-center">
                  <button type="button" className="btn btn-link link-secondary" id="clear-searches">Delete all previous
                    searches</button>
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default App
