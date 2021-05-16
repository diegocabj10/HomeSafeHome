const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};
const getPagingData = (data, currentPage, limit) => {
    const { count: totalItems, rows: list } = data;
    const page = currentPage ? +currentPage : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, data: list, totalPages, page };
};
module.exports = { getPagination, getPagingData };