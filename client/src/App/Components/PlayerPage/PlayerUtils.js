
export const getVideoIds = (params) => {
  return Object.keys(params).map( key => ( key === 'source' ) ? undefined : params[key] ).filter( item => item !== undefined )
}

export const getUniqueVideoIds = ( params ) => {
  return getVideoIds(params).filter( (elem, pos, arr) => arr.indexOf(elem) === pos )
}

export const compareArrays = (arr1, arr2) => {
  if ( arr1.length !== arr2.length ) return false;
  
  for (let index = 0; index < arr1.length; index++) {
    // console.log('compareArrays', arr1[index], arr2[index], arr2.indexOf(arr1[index]))
    if ( arr2.indexOf(arr1[index]) === -1 ) return false;
  }
  return true;
}

export const getLayout = ( videoIds ) => {
  switch(videoIds.length) {
    case 6: return 10;
    case 5: return 7;
    case 4: return 5;
    case 3: return 3;
    case 2: return 1;
    case 1:
    default:
      return 0;
  }
}

export default {
  getVideoIds,
  getUniqueVideoIds,
  compareArrays,
  getLayout
}