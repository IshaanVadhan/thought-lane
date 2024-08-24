export function formatDateTime(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = date.getHours();
  const min = String(date.getMinutes()).padStart(2, "0");

  const period = hh >= 12 ? "PM" : "AM";
  const formattedHour = hh % 12 || 12;

  return `${dd}/${mm}/${yyyy} ${String(formattedHour).padStart(
    2,
    "0"
  )}:${min} ${period}`;
}

export function formatDate(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
}

export function formatTime(date) {
  const hh = date.getHours();
  const min = String(date.getMinutes()).padStart(2, "0");

  const period = hh >= 12 ? "PM" : "AM";
  const formattedHour = hh % 12 || 12;

  return `${String(formattedHour).padStart(2, "0")}:${min} ${period}`;
}

export function timeAgo(date) {
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);

  if (secondsAgo === 0) {
    return "now";
  }

  if (secondsAgo < 60) {
    return `${secondsAgo} seconds ago`;
  }

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) {
    return `${minutesAgo} minutes ago`;
  }

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) {
    return `${hoursAgo} hours ago`;
  }

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) {
    return `${daysAgo} days ago`;
  }

  const weeksAgo = Math.floor(daysAgo / 7);
  return `${weeksAgo} weeks ago`;
}
