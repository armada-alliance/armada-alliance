const dashify = require("dashify");
const removeAccents = require('remove-accents')
module.exports = input => input ? dashify(`${removeAccents(input)}`, { condense: true }) : null;