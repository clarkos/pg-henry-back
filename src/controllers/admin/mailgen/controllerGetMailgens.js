// const { Op } = require('sequelize');
const { MailGen } = require('../../../db');
const { getPagination } = require('../../../utils/utils');

const getMailGens = async (page, size, sort) => {
    const { limit, offset } = getPagination(page, size);

    const options = { limit, offset };

    if (sort) {
        options.order = [JSON.parse(sort)];
    }

    const mailGens = await MailGen.findAndCountAll(options);

    return mailGens;
}

module.exports = { getMailGens };

