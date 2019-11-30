// calculate time since a timestamp
export const timeSince = timestamp => {
  const now = new Date();
  const secondsPast = (now.getTime() - timestamp.getTime()) / 1000;
  if (secondsPast < 60) {
    return parseInt(secondsPast) + "s ago";
  } else if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + "m ago";
  } else if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + "h ago";
  } else {
    const day = timestamp.getDate();
    const month = timestamp
      .toDateString()
      .match(/ [a-zA-Z]*/)[0]
      .replace(" ", "");
    const year =
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

// takes in a tagsArray and turns it into a tagsString
export const makeTagsString = tagsArray => {
  return tagsArray.join(", ");
};

// takes a string and uppercase just the first letter
export const uppercaseFirst = str => {
  return str[0].toUpperCase() + str.slice(1);
};

// takes in a path array and an index i
// returns a path up to i inclusive
export const makePathString = (pathArray, i) => {
  return "/" + pathArray.slice(0, i + 1).join("/");
};

// takes a path string and turns it into an array
export const makePathArray = pathString => {
  return pathString.split("/").filter(Boolean);
};

// stuff that should be excluded from breadcrumbs
// but should appear in the url and actual path
export const pathExclusions = new Set(["u", "view", "edit"]);
