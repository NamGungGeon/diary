export const getCurrentYear= ()=>{
    return new Date().getFullYear();
};
export const getCurrentMonth= ()=>{
    return new Date().getMonth() +1;
};
export const getCurrentDateText= ()=>{
    const date= new Date();
    const dateText=  date.getFullYear()+ "-"+ (date.getMonth()+1)+ "-"+ date.getDate()+ " "
        + date.getHours()+":"+ date.getMinutes()+ ":"+ date.getSeconds();
    return dateText;
};
