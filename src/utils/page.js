export const getPageCount = (totalCount) => {
    return Math.ceil(totalCount / 10);
}

export const getPageArray = (totalPages) => {
    let result = [];
    for (let i=0; i < totalPages ; i++) {
        result.push(i + 1);
      }
    return result;
}