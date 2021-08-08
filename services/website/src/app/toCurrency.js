import numeral from 'numeral'
const toCurrency = (input, format = '0,0') => numeral(input).format(format);
export default toCurrency