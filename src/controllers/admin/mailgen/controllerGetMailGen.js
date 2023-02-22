const { MailGen } = require('../../../db');

const getMailGen = async (id) => {
    const mailGen = await MailGen.findByPk(id);
    console.log('getMailGen mailGen: ', mailGen);

    return mailGen;
}

module.exports = { getMailGen };
