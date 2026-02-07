export function uniqueEmail(prefix = 'tn') {
  return `${prefix}_${Date.now()}@example.com`;
}

export function randomFirstName() {
  return 'John'; // keep simple for now
}

export function randomLastName() {
  return 'Doe';
}

export function randomTelephone() {
  return `5${Math.floor(100000000 + Math.random() * 900000000)}`;
}

export function validPassword() {
  return 'Test@1234'; // stable, meets rules
}

export function createValidRegisterUser() {
  return {
    firstName: randomFirstName(),
    lastName: randomLastName(),
    email: uniqueEmail(),
    telephone: randomTelephone(),
    password: validPassword(),
  }}

