
export const formatDate=(date)=> {
    let year = date.slice(0,4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    let hour = date.slice(11,13)
    let min = date.slice(14,16)
    let ampm =''
    parseInt(hour) < 12 ? ampm ='AM' : ampm = 'PM'

    if(hour >= 12){
      hour = hour-12;
    }
    if(hour<10){
      hour = parseInt(hour);
    }

    if(hour===0){
      hour = 12
    }

    let retDate = `${hour}:${min} ${ampm} ${month}/${day}/${year}`
    return retDate;

}