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
  let oldest = 0;

  newItem.timestamp = Date.now();

  if ( recentChannelsItems.length !== 0 ) {
    
    newRecentItems = recentChannelsItems.map( (item, index) => {
      // console.log(item, index);
      if ( item.timestamp < recentChannelsItems[oldest].timestamp ) oldest = index;
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

  if ( newRecentItems.length > 8 ) {
    newRecentItems.splice(oldest, 1);
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
