import moment from 'moment';


export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];
export const years = [2020, 2019, 2018];
const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


export const DateHelper = {
  formatToDateAMPM: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY , hh:mm a');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatAMPM: function (date) {
    try {
      return moment(date).format('hh:mm a');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToTimeHHmmss: function (date) {
    try {
      return moment(date).format('HH:mm:ss');
    } catch (err) {
      return '';
    }
  },
  formatToDate: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },

  formatToDateYYMMDD: function (date) {
    try {
      return moment(date).format('M-D-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDateDMY: function (date) {
    try {
      return moment(date).format('DD-MM-YYYY');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDateYMD: function (date) {
    try {
      return moment(date).format('YYYY-MM-DD');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return '';
    }
  },
  formatToDatePut: function (date) {
    try {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return "";
    }
  },
  getMonthFromDateFormat: function (date) {
    try {
      let newDate = String(date).split('-');
      let monthNum = parseInt(String(newDate[1]));
      return `${monthNames[monthNum - 1]}`;
    } catch (err) {
      return '';
    }
  },
  getDateMontYear: function (date) {
    try {
      let newDate = String(date).split('-');
      let monthNum = parseInt(String(newDate[1]));
      return `${moment(date).format(`DD`)}-${monthNames[monthNum - 1]}-${moment(date).format(`yyyy`)} `;
    } catch (err) {
      return '';
    }
  },

  getDayFromDateFormat: function (date) {
    try {
      let newDate = String(date).split('-');
      let dayNum = parseInt(String(newDate[2]));
      return `${dayNum}`;
    } catch (err) {
      return '';
    }
  },

  formatToHHMM(date) {
    try {
      let newDate = String(date).split(':');
      if (newDate[2] == undefined) {
        return '';
      }
      return `${newDate[0]}:${newDate[1]}`;
    } catch (err) {
      return '';
    }
  },
  getTodayDateNew: function () {
    try {
      var today = new Date();
      var dayDate = today.getDate();
      var month = parseInt(today.getMonth() + 1);
      month = month < 10 ? '0' + month : month;
      dayDate = dayDate < 10 ? '0' + dayDate : dayDate;
      dat = today.getFullYear() + "-" + month + "-" + dayDate;//today.getDate();

      return dat;
    } catch (err) {

      return "";

    }
  },
  getDateFromFormat(date) {
    date = date.split('-');
    let day = parseInt(date[2]);
    let month = parseInt(date[1]) - 1;
    let year = parseInt(date[0]);
    //new Date(2020, 10, 1)
    return new Date(year, month, day);
  },

  getDayFromToday(dateEnd) {
    const today = new Date();
  
    // Split the input date string (DD-MM-YYYY) and convert it to MM/DD/YYYY for JavaScript Date parsing
    const [day, month, year] = dateEnd.split('-');
    const futureDate = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD format
  
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one dayrc
    const diffTime = (futureDate - today) / oneDay; // Time difference in days
    return Math.ceil(diffTime); // Round up to the nearest day
  },

  getDaysBtwDates(dateStart, dateEnd) {
    // Convert dateStart to MM/DD/YYYY format
    const [startDay, startMonth, startYear] = dateStart.split('-');
    const startDate = new Date(`${startYear}-${startMonth}-${startDay}`); // Convert to YYYY-MM-DD format
  
    // Convert dateEnd to MM/DD/YYYY format
    const [endDay, endMonth, endYear] = dateEnd.split('-');
    const endDate = new Date(`${endYear}-${endMonth}-${endDay}`); // Convert to YYYY-MM-DD format
  
    const oneDay = 1000 * 60 * 60 * 24; // Milliseconds in one day
    const diffTime = (endDate - startDate) / oneDay; // Time difference in days
    return Math.ceil(diffTime); // Round up to the nearest day
  },

  getDifferenceBtwDate(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  },

  getDateFromFormatLabel(date) {
    date = date.split('-');
    let day = parseInt(date[1]);
    let month = parseInt(date[0]) - 1;
    let year = parseInt(date[2]);
    //new Date(2020, 10, 1)
    //return date[2] + date[1]
    return new Date(year, month, day);
  },

  getDDMMYYYYFormatLabel(date) {
    date = date.split('-');
    let day = date[2];
    let month = date[1];
    let year = date[0];
    return `${day}-${month}-${year}`;
  },

  getFirstAndLastDateOfMonth() {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      firstDay,
      lastDay,
    };
  },
  formatToOnlyDate: function (date) {
    console.log(moment('2020-05-21T16:57:04.215+0000').format('DD-MM-YYYY hh:mm a'));
    return moment(date).format('DD-MM-YYYY');
    //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
  },
  formatToDDMMYYYYNew: function (dateStr) {
    var date = new Date(dateStr);
    var dayDate = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    dayDate = dayDate < 10 ? '0' + dayDate : dayDate;
    month = month < 9 ? '0' + (month + 1) : (month + 1);

    var strDate = year + '-' + month + '-' + dayDate;
    return strDate;
  },
  formatToDirectTWithZ(date) {     //2023-09-09T15:22:46.5961943Z
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1 and pad with leading zeros
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
      return formattedDate
    } catch (err) {
      return "";
    }

  },
  formatToYYYYMMDD: function (dateStr) {
    var date = new Date(dateStr);
    var dayDate = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    dayDate = dayDate < 10 ? '0' + dayDate : dayDate;
    month = month < 9 ? '0' + (month + 1) : (month + 1);

    var strDate = dayDate + '-' + month + '-' + year;
    return strDate;
  },

  formatToDDMMYYYYTIME: function (date) {  //04-07-2024 05:52 PM
    const months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    return `${day}-${month}-${year} ${strTime}`;
  },
  formatToYMDTFromDDMMYYYYTIME: function (inputDateTime) {
    const [datePart, timePartWithPeriod] = inputDateTime.split(' , ');
    const [timePart, period] = timePartWithPeriod.split(' ');

    // Split the date part into day, month, and year
    const [day, month, year] = datePart.split('-');

    // Split the time part into hour and minute
    const [hourPart, minutePart] = timePart.split(':');

    let hour = parseInt(hourPart, 10);
    const minute = parseInt(minutePart, 10);

    // Handle hour conversion for 12-hour format to 24-hour format
    if (period.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    }

    // Ensure hour and minute are two digits
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    // Format the date to YYYY-MM-DD HH:MM:SS
    const formattedDateTime = `${year}-${month}-${day} ${formattedHour}:${formattedMinute}:00`;

    return formattedDateTime;
  },
  formatToDateTime: function (date) {
    try {
      //2020-05-02 24:00:0
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
      //return this.formatToDate(date) + ', ' + this.formatAMPM(date);
    } catch (err) {
      return ""
    }

  },
};
