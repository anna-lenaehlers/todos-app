function convertDate(millis: number) {
  var date = new Date(millis);
  return (
    date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
  );
}

export { convertDate };
