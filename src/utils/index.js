export const titleAdjuster = (text) => {
  let str = text?.replace(/-/g, " ");
  let _str = str?.split(" ");
  _str?.forEach((item, i) => {
    let changedString = _str?.[i];
    let capitalizedWord =
      changedString?.charAt(0)?.toUpperCase() +
      changedString?.slice(1)?.toLowerCase();
    _str[i] = capitalizedWord;
  });

  return _str?.join(" ");
};
