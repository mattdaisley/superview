
export const truncateText = (text, limit = 50) =>
  ( text && text.length > limit) ? text.slice(0,limit) + '...' : text