const DateFormatter = (getDate: number) => {
  const date = new Date(getDate);
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const dateFormat =
    date &&
    date?.getFullYear() +
      '년 ' +
      (date?.getMonth() + 1) +
      '월 ' +
      date?.getDate() +
      '일 ' +
      day[date.getDay()] +
      '요일 ' +
      date.getHours() +
      '시 ' +
      date.getMinutes() +
      '분 ';
  return dateFormat;
};

export default DateFormatter;
