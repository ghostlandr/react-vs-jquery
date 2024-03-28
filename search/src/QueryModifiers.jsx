import Collapse from 'react-bootstrap/Collapse';

export function QueryModifiers({ mods, setMods, visible }) {
  const handleClick = (modName) => {
    setMods(mods => ({ ...mods, [modName]: !mods[modName] }));
  };
  return (
    <Collapse in={visible}>
      <div className="mb-4" id="query-modifiers">
        <div className="row">
          <div className="ms-4">
            <input id="recent-checkins-only" type="checkbox" checked={mods.recentCheckIns} onChange={() => handleClick('recentCheckIns')} />
            <label htmlFor="recent-checkins-only" className="text-muted" style={{ fontSize: '.9625rem' }}>Only showing servers
              that have reported data in the last day, i.e. <span className="font-monospace">System.Timestamp:[now-1d TO
                now]</span></label>
          </div>
          <div className="ms-4">
            <input id="exclude-droplets" type="checkbox" checked={mods.excludeDroplets} onChange={() => handleClick('excludeDroplets')} />
            <label htmlFor="exclude-droplets" className="text-muted" style={{ fontSize: '.9625rem' }}>Excluding droplets, i.e.
              <span className="font-monospace">!System.HardwareModel:Droplet</span></label>
          </div>
          <div className="ms-4">
            <input id="stage2-only" type="checkbox" checked={mods.stage2Only} onChange={() => handleClick('stage2Only')} />
            <label htmlFor="stage2-only" className="text-muted" style={{ fontSize: '.9625rem' }}>Stage2 only, i.e. <span
              className="font-monospace">Rack:*Stage2*</span></label>
          </div>
          <div className="ms-4">
            <input id="exclude-stage2" type="checkbox" checked={mods.excludeStage2} onChange={() => handleClick('excludeStage2')} />
            <label htmlFor="exclude-stage2" className="text-muted" style={{ fontSize: '.9625rem' }}>Exclude Stage2, i.e. <span
              className="font-monospace">!Rack:*Stage2*</span></label>
          </div>
        </div>
      </div>
    </Collapse>);
}
