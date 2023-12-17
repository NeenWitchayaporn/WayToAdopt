/* CalculateAgefunc component to calculate age with input date of birth
 * dob : date of birth
 */
const CalculateAge = (dob) => {
  // if date of birth is not provided or is in an unexpected format, return "-"
  if (!dob || !dob._seconds) {
    return "-";
  }

  // current date
  const currentDate = new Date();

  // converted date of birth from seconds to milliseconds
  const birthDate = new Date(dob._seconds * 1000);

  // calculating the differences of current date and birth date in years, months, and days.
  const yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  const dayDiff = currentDate.getDate() - birthDate.getDate();

  // cases where the birthdate is in the future or invalid
  if (
    yearDiff < 0 ||
    (yearDiff === 0 && monthDiff < 0) ||
    (yearDiff === 0 && monthDiff === 0 && dayDiff > 0)
  ) {
    // cases where age in days
    if (yearDiff === 0 && monthDiff === 0 && dayDiff > 0) {
      return `${dayDiff} วัน`;
    }
    // cases where age in month with a negative month difference
    else if (yearDiff === 0 && monthDiff < 0) {
      return `${Math.abs(monthDiff)} เดือน`;
    }
    // cases where age in month with a positive month difference
    else {
      const remainingMonths = ((yearDiff - 1) * 12 + monthDiff) % 12;
      return remainingMonths > 0 ? `${remainingMonths} เดือน` : "";
    }
  }
  // case where age in years and remaining months for negative month difference
  else if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    const remainingMonths = 12 + monthDiff;
    return `${yearDiff} ปี ${remainingMonths} เดือน`;
  }
  // case where age in months for a positive month difference
  else if (yearDiff === 0 && monthDiff > 0) {
    return `${monthDiff} เดือน`;
  }
  // case where age in years and months for a positive year and month difference
  else {
    return `${yearDiff} ปี ${monthDiff} เดือน`;
  }
};

export default CalculateAge;
