export function hasPerm(obj, perm) {
  return obj.myPerms && obj.myPerms.indexOf(perm) >= 0
}
