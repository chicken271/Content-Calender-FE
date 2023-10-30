const weekday: string[] = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export function convertToDateSqlFormat(date: Date) {
  return date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' +
    ('00' + date.getUTCHours()).slice(-2) + ':' +
    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
    ('00' + date.getUTCSeconds()).slice(-2);
}

export function convertToDateDisplayFormat(date: Date){
  return weekday[date.getDay()]+' '+ date.getDate()+'/'+
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '/' +
  (date.getUTCFullYear())
}

export function formatTime(value:number){
  if(value.toString().length===1) return '0'+value;
  else return value;
}

export function convertToDateHistoryFormat(date: Date){
  return weekday[date.getDay()] +' '+ 
  date.getDate()+'/'+
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '/' +
  (date.getUTCFullYear()) +' '+ 
  date.getHours() +':'+formatTime(date.getMinutes())+':'+formatTime(date.getSeconds());
}
