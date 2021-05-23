import numeral from 'numeral'
const toAda = (input) => numeral(input / 1000000).format('0,0.00a').replace('.00', '');
export default toAda