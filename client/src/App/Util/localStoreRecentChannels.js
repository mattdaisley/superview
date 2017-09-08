const RECENT_CHANNELS_KEY = 'recentChannelsItems'

export const getRecentChannelsItems = () => {
  const item = window.localStorage.getItem(RECENT_CHANNELS_KEY) || null;
  return JSON.parse(item);
}

// this should set an array of Channels items
export const setRecentChannelsItem = (newItem) => {
  let recentChannelsItems = getRecentChannelsItems() || [];
  let filteredItems = [];
  if ( recentChannelsItems.length !== 0 ) {
    filteredItems = recentChannelsItems.filter( (item) => {
      return item.route === newItem.route
    });
    
  }

  if ( filteredItems.length !== 0 ) {
    filteredItems = newItem
  } else {
    newItem.timestamp = Date.now();
    recentChannelsItems.push(newItem);
  }
  window.localStorage.setItem(RECENT_CHANNELS_KEY, JSON.stringify(recentChannelsItems))
}

export const removeRecentChannelsItem = (route) => {
  let recentChannelsItems = getRecentChannelsItems();
  if ( recentChannelsItems ) {
    for(let i = 0; i < recentChannelsItems.length; i++) {
      if(recentChannelsItems[i].route === route) {
        recentChannelsItems.splice(i, 1);
          break;
      }
    }

    window.localStorage.setItem(RECENT_CHANNELS_KEY, recentChannelsItems)
  }
}
