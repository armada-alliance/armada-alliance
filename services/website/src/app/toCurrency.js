import numeral from 'numeral'
const toCurrency = (input, end = false) => numeral(input).format('0,0');
export default toCurrency