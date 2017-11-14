const dateFormat = require('dateformat');

function format(object) {
  const tmp = object;
  if (tmp.from) {
    tmp.from = dateFormat(tmp.from, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.to) {
    tmp.to = dateFormat(tmp.to, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.date) {
    tmp.date = dateFormat(tmp.date, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.exp_year) {
    tmp.exp_year = dateFormat(tmp.exp_year, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.change_date) {
    tmp.change_date = dateFormat(tmp.change_date, 'yyyy-mm-dd HH:MM:ss');
  }
  if (tmp.start_date) {
    tmp.start_date = dateFormat(tmp.start_date, 'yyyy-mm-dd HH:MM:ss');
  }
  return tmp;
}

function formatArr(arr) {
  return arr.map(item => format(item));
}

module.exports = {
  format,
  formatArr,
};
