export class ItemExistsInEnum {
  search(input: string, enumVerify: any) {
    for (const key in enumVerify) {
      if (
        Object.prototype.hasOwnProperty.call(enumVerify, key) &&
        enumVerify[key] == input
      ) {
        return enumVerify[key];
      }
    }
    return false;
  }
}
