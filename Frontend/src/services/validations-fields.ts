const capitalLetterReg = /^[A-Zא-ת].*$/;

export const nameRules = [
  (val: string) => !!val || 'Required',
  (val: string) => val.length > 2 || 'Must be a minimum of 3 chars',
  (val: string) => val.length < 21 || 'Can`t exceed 20 chars',
  (val: string) =>
    capitalLetterReg.test(val) || 'Must start with a capital letter',
  (val: string) => val.toLocaleLowerCase() != process.env.botName.toLocaleLowerCase() || 'The username exist',
];

export const textRules = [
  (val) => !!val || 'Required',
  (val: string) => val.length > 0 || 'Must be a minimum of 1 chars',
  (val: string) => val.length < 5000 || 'Can`t exceed 5000 chars',
];
