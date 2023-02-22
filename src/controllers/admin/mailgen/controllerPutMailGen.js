const { MailGen } = require('../../../db');

const editMailGen = async (data) => {
    const mailGen = await MailGen.findByPk(data.id);

    await mailGen.update(data);

    return mailGen;
}

module.exports = { editMailGen };