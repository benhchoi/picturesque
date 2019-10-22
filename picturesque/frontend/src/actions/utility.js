// calculate time since a timestamp
export const timeSince = timestamp => {
  const now = new Date(),
    secondsPast = (now.getTime() - timestamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h";
  }
  if (secondsPast > 86400) {
    day = timestamp.getDate();
    month = timestamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    year =
      timestamp.getFullYear() == now.getFullYear()
        ? ""
        : " " + timestamp.getFullYear();
    return day + " " + month + year;
  }
};

// splits tagsString by sequence of one or more commas or spaces
export const makeTagsArray = tagsString => {
  return tagsString.split(/[ ,]+/).filter(Boolean);
};
