export function randomEmail(prefix = 'pw', domain = 'example.com') {
  const stamp = Date.now();
  return `${prefix}.${stamp}@${domain}`;
}
