import { useEffect, useState } from "react";

export function useEffectiveQuery(queryMods, queryText) {
  const [effectiveQuery, setEffectiveQuery] = useState("");

  useEffect(() => {
    var query = "";
    if (queryMods.excludeDroplets) {
      query += "!System.HardwareModel:Droplet ";
    }
    if (queryMods.recentCheckIns) {
      query += "System.Timestamp:[now-1d TO now] ";
    }
    if (queryMods.excludeStage2) {
      query += "!Rack:*Stage2* ";
    }
    if (queryMods.stage2Only) {
      query += "Rack:*Stage2* ";
    }
    query += queryText;

    setEffectiveQuery(query);
  }, [queryText, queryMods]);

  return effectiveQuery;
}
