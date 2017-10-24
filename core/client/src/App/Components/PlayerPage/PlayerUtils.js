
export const getVideoIds = (params) => {
  return Object.keys(params).map( key => ( key === 'sourceType' ) ? undefined : params[key] ).filter( item => item !== undefined )
}

export const getUniqueVideoIds = ( params ) => {
  return getVideoIds(params).filter( (elem, pos, arr) => arr.indexOf(elem) === pos )
}

export const getDefaultLayout = ( videoIds ) => {
  switch(videoIds.length) {
    case 6: return '10';
    case 5: return '7';
    case 4: return '5';
    case 3: return '3';
    case 2: return '1';
    case 1:
    default:
      return 0;
  }
}

export default {
  getVideoIds,
  getUniqueVideoIds,
  getDefaultLayout
}