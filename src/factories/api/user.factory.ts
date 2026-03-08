export function makeUniqueUser() {
  const stamp = Date.now()

  return {
    name: 'Oleh API Test',
    email: `oleh.strohush+${stamp}@example.com`,
    password: 'Qwerty123!',
    title: 'Mr',
    birth_date: '5',
    birth_month: '4',
    birth_year: '1998',
    firstname: 'Oleh',
    lastname: 'Strohush',
    company: 'QA',
    address1: 'Street 1',
    address2: 'Apartment 2',
    country: 'Ukraine',
    zipcode: '98700',
    state: 'Lviv',
    city: 'SomeSity',
    mobile_number: '380939999999',
  }
}
