const toCamel = require('./convert-keys').toCamel;

function isEng(obj) {
  if (obj.engFirstName || obj.engSecondName) {
    return true;
  }
  return false;
}

function isRu(obj) {
  if (obj.ruFirstName || obj.ruSecondName) {
    return true;
  }
  return false;
}

function deleteCandidate(obj) {
  delete obj.ruFirstName;
  delete obj.ruSecondName;
  delete obj.engFirstName;
  delete obj.engSecondName;
  return obj;
}

function edit(obj) {
  if (isRu(obj)) {
    obj.candidateName = `${obj.ruFirstName} ${obj.ruSecondName}`;
    obj = deleteCandidate(obj);
  } else if (isEng(obj)) {
    obj.candidateName = `${obj.engFirstName} ${obj.engSecondName}`;
    obj = deleteCandidate(obj);
  }
  if (obj.firstName) {
    obj.userName = `${obj.firstName} ${obj.secondName}`;
    delete obj.firstName;
    delete obj.secondName;
  }
  if (obj.name) {
    obj.vacancyName = obj.name;
    delete obj.name;
  }
  return obj;
}

function editArr(arr) {
  return arr.map(item => edit(item));
}

function mapNames(obj) {
  if (isRu(obj)) {
    obj.firstName = obj.ruFirstName;
    obj.secondName = obj.ruSecondName;
    obj = deleteCandidate(obj);
  } else {
    obj.firstName = obj.engFirstName;
    obj.secondName = obj.engSecondName;
    obj = deleteCandidate(obj);
  }
}


function formatVacancy(error, result, callback) {
  const res = result.map((value) => {
    const tmp = {};
    if (value.ru_first_name) {
      tmp.name = `${value.ru_first_name} ${value.ru_second_name}`;
    } else {
      tmp.name = `${value.eng_first_name} ${value.eng_second_name}`;
    }
    tmp.email = value.email;
    tmp.status = value.status;
    tmp.city = value.city;
    tmp.contact_date = value.contact_date;
    tmp.skill_name = value.skill_name;
    tmp.id = value.id;
    tmp.total = value.total;
    tmp.ideal = value.ideal;
    tmp.primary_skill_lvl = value.primary_skill_lvl;
    if (value.date) {
      tmp.date = value.date;
    }
    return tmp;
  });
  callback(error, toCamel(res));
}

function formatDate(date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
module.exports = {
  isEng,
  isRu,
  deleteCandidate,
  mapNames,
  edit,
  editArr,
  formatVacancy,
  formatDate,
};
