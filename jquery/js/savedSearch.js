const savedSearches = () => {
  const MAX_SEARCHES = 10;
  const canSave = isLocalStorageAvailable();
  const searchLSKey = "sy-searches";

  function saveAll(searches) {
    let namedSearches = [];
    let unnamedSearches = [];
    searches.forEach((search) => {
      if (search.name !== "") {
        namedSearches.push(search);
        return;
      }
      unnamedSearches.push(search);
    });

    // Let the oldest unnamed searches fall away as we fill up with named searches
    if (unnamedSearches.length > MAX_SEARCHES - namedSearches.length) {
      unnamedSearches = unnamedSearches.slice(
        unnamedSearches.length - (MAX_SEARCHES - namedSearches.length)
      );
    }

    // Sort the named searches to the top of the list of saved searches
    localStorage.setItem(
      searchLSKey,
      JSON.stringify([...namedSearches, ...unnamedSearches])
    );
  }

  return {
    save(query) {
      if (!canSave) return;
      let searches = [...this.getAll(), { id: Date.now(), name: "", query }];
      saveAll(searches);
    },
    getAll() {
      if (!canSave) return [];
      const localSearches = localStorage.getItem(searchLSKey) || "[]";
      const searches = JSON.parse(localSearches);
      return searches;
    },
    clearAll() {
      if (!canSave) return;
      localStorage.removeItem(searchLSKey);
    },
    editName(id, newName) {
      if (!canSave) return;
      const searches = this.getAll();
      const newSearches = searches.map((search) => {
        if (search.id === id) {
          search.name = newName;
        }
        return search;
      });
      saveAll(newSearches);
    },
    remove(searchId) {
      if (!canSave) return;
      const searches = this.getAll();
      let newSearches = [];
      for (let i = 0; i < searches.length; i++) {
        // Don't re-add the removed search
        if (searches[i].id === searchId) continue;
        newSearches.push(searches[i]);
      }
      saveAll(newSearches);
    },
  };
};

function isLocalStorageAvailable() {
  var test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}
