const RECENT_CHANNELS_KEY = 'recentChannelsItems'

export const getRecentChannelsItems = () => {
  const item = window.localStorage.getItem(RECENT_CHANNELS_KEY) || null;
  return JSON.parse(item);
}

// this should set an array of Channels items
export const setRecentChannelsItem = (newItem) => {
  let recentChannelsItems = Object.assign([], getRecentChannelsItems()) || [];
  let newRecentItems = [];
  let found = false;

  newItem.timestamp = Date.now();

  if ( recentChannelsItems.length !== 0 ) {
    newRecentItems = recentChannelsItems.map( item => {
      if ( item.route === newItem.route ) {
        found = true;
        return newItem
      }
      return item
    })
  }
  
  if ( !found ) {
    newRecentItems.push(newItem);
  }
  
  window.localStorage.setItem(RECENT_CHANNELS_KEY, JSON.stringify(newRecentItems))
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
