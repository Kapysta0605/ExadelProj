const formChange = (key) => {
  switch (key) {
    case 'name':
      return 'Name was changed';
    case 'requestDate':
      return 'Request date was changed';
    case 'startDate':
      return 'Start date was changed';

    case 'status' :
      return 'Status was changed';
    case 'primarySkill':
      return 'Primary skill was changed';
    case 'otherSkills':
      return 'Other skills were changed';
    case 'secondarySkills':
      return 'Secondary skills were changed';
    case 'secSkills':
      return 'Secondary skills were changed';

    case 'city':
      return 'City was changed';
    case 'expYear':
      return 'Exp year was changed';
    case 'description':
      return 'Description was changed';

    case 'ruFirstName':
      return 'First name (russian) was changed';
    case 'ruSecondName':
      return 'Second name (rus) was changed';
    case 'engFirstName':
      return 'First name (eng) was changed';
    case 'engSecondName':
      return 'Second name (eng) was changed';

    case 'emails':
      return 'Emails were changed';
    case 'linkedin':
      return 'Linkedin was changed';
    case 'skype':
      return 'Skype was changed';

    case 'phone':
      return 'Phone was changed';
    case 'salaryWish':
      return 'Salary wish was changed';
    case 'englishLvl':
      return 'English lvl was changed';

    default:
      return 'Nothing';
  }
};

module.exports = {
  formChange,
};
