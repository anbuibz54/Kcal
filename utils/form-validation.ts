const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
const atLeastCharRegex =(numOfChar:number)=> new RegExp(`^(.{${numOfChar},})$`);
const tenNumberPhoneRegex = /^\d{10}$/;
const inputRules={
    isRequired:(value: string)=>{return value!='' ?true:false},
    isValidEmail:(value:string)=>{return emailRegex.test(value)? true:false },
    isValidPassword:(value:string)=>{return atLeastCharRegex(8).test(value)?true:false},
    isValidPhone:(value:string) =>{return tenNumberPhoneRegex.test(value)?true:false}

}
export default inputRules