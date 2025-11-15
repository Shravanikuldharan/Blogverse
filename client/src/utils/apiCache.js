export const setCache = (key, data, cacheDuration = 5 * 60 * 1000) => {
  try {
    const item = {
      data,
      expiry: Date.now() + cacheDuration,
    };
    localStorage.setItem(key, JSON.stringify(item));
  } catch { }
};

// fetching from cache
export const getCache = (key) => {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.data;
  } catch {
    return null;
  }
};

export const fetchWithCache = async (url, cacheKey, cacheDuration = 5 * 60 * 1000) => {
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const res = await fetch(url);
  const data = await res.json();

  setCache(cacheKey, data, cacheDuration);

  return data;
};

export const clearCacheKey = (key) => {
  localStorage.removeItem(key);
};

export const clearAllCache = () => {
  localStorage.clear();
};