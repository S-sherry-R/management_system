export const getTimeMsg= ()=>{
  let message:string  = ''
  const hour:number = new Date().getHours()
  if(hour <= 9){
    message = '早上'
  } else if(hour <= 12){
    message = '上午'
  } else if(hour <= 18){
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
