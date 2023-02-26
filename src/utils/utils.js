const getPagination = (page, size) => {
    const limit = size ? +size : null;
    const offset = page ? page * limit : page;

    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, tutorials, totalPages, currentPage };
};

module.exports = {
    getPagination,
    getPagingData
};
