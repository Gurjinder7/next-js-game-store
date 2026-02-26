export const createQueryUrl = (query: boolean, searchParams: string) => {
  if (query) {
    console.log(searchParams);
  } else {
    const hasQuery = searchParams.search('/[query]/');

    if (hasQuery > 0) {
      const currentQuery = searchParams.lastIndexOf('=');
      return `&query=${searchParams.substring(currentQuery + 1, searchParams.length)}`;
    }
    return '';
  }
};
