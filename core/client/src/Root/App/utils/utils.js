
export const truncateText = (text, limit = 50) =>
  ( text && text.length > limit) ? text.slice(0,limit) + '...' : text

export const compareArrays = (arr1, arr2) => {
  if ( arr1.length !== arr2.length ) return false;
  
  for (let index = 0; index < arr1.length; index++) {
    // console.log('compareArrays', arr1[index], arr2[index], arr2.indexOf(arr1[index]))
    if ( arr2.indexOf(arr1[index]) === -1 ) return false;
  }
  return true;
}