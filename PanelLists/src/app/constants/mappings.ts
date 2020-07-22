export class Mappings {

  static readonly statesMap = {
    1: 'NCR',
    2: 'Maharashtra',
    3: 'West Bengal',
    4: 'Tamil Nadu',
    5: 'Karnataka',
    6: 'Telangana',
    7: 'Gujarat',
    8: 'Rajasthan'
  }

  static readonly cityMap = {
    1: 'NCR',
    2: 'Mumbai',
    3: 'Kolkata',
    4: 'Chennai',
    5: 'Bengaluru',
    6: 'Hyderabad',
    7: 'Ahmedabad',
    8: 'Surat',
    9: 'Pune',
    10: 'Jaipur',
  }

  static readonly nccsMap = {
    1: 'A1',
    2: 'A2',
    3: 'A3',
    4: 'B1',
    5: 'B2'
  }

  static readonly genderMap = {
    1: 'Male',
    2: 'Female'
  }

  static readonly educationMap = {
    1: 'Illiterate',
    2: 'Literate but not formal schooling/ <br>School-up to 4 years',
    3: 'School-5 to 9 years',
    4: 'SSC/ HSC',
    5: 'Some College (incl. a Diploma but not Grad.)',
    6: 'Graduate/ Post Graduate: General',
    7: 'Graduate/ Post Graduate: Professional'
  }

  static readonly ownedtvtype = {
    '1': 'Smart TV - Internet can be accessed',
    '2': 'Using external devices like Firestick, Chromecast, etc.',
    '3': 'Not accessing internet on TV - No smart TV'
  }

  static readonly sorts = [
    {
      text: 'SortBy',
      dbColumn: 'sortby',
      options: [
        { code: 'age', text: 'Age' },
        { code: 'city', text: 'City' },
        { code: 'state', text: 'State' },
        { code: 'nccs', text: 'Nccs' }
      ]
    },
    {
      text: 'OrderBy',
      dbColumn: 'sortorder',
      options: [
        { code: 'asc', text: 'Ascending' },
        { code: 'desc', text: 'Descending' }
      ]
    }
  ]

  static readonly filters = [
    {
      text: 'State',
      dbColumn: 'state',
      options: [
        { code: 1, text: 'NCR' },
        { code: 2, text: 'Maharashtra' },
        { code: 3, text: 'West Bengal' },
        { code: 4, text: 'Tamil Nadu' },
        { code: 5, text: 'Karnataka' },
        { code: 6, text: 'Telangana' },
        { code: 7, text: 'Gujarat' },
        { code: 8, text: 'Rajasthan' },
      ]
    },
    {
      text: 'City',
      dbColumn: 'city',
      options: [
        { code: 1, text: 'NCR' },
        { code: 2, text: 'Mumbai' },
        { code: 3, text: 'Kolkata' },
        { code: 4, text: 'Chennai' },
        { code: 5, text: 'Bengaluru' },
        { code: 6, text: 'Hyderabad' },
        { code: 7, text: 'Ahmedabad' },
        { code: 8, text: 'Surat' },
        { code: 9, text: 'Pune' },
        { code: 10, text: 'Jaipur' },
      ]
    },
    {
      text: 'NCCS',
      dbColumn: 'nccs',
      options: [
        { code: 1, text: 'A1' },
        { code: 2, text: 'A2' },
        { code: 3, text: 'A3' },
        { code: 4, text: 'B1' },
        { code: 5, text: 'B2' }
      ]
    }
  ]

  static readonly orderMap = {
    'ascending': 'asc',
    'descending': 'desc'
  }
}