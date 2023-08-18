

document.addEventListener('alpine:init', () => {
    Alpine.data('PhoneBill', ()=>{
        return {
            ed_id:'',
            hide: false,
            hideForever: false,
            plan_name: '',
            sms_price: '',
            call_price: '',

            user_plan_name: '',
            user_sms_price: '',
            user_call_price: '',

            plans: [],
            enteredBill: '',
            billTotal: '',
            phonebill: '',



            plan: '',
            action: '',
            typedBill: '',

            plan_name_bll: '',
            sms_cost: '',
            call_cost: '',
            hidePlan: 'false',
            init(){
                this.getPlan();
            },

            getPlan(){
                axios.get('/api/price_plans/')
                .then((res)=>{
                    this.plans = res.data.price_plans;
                    console.log(res.data);
                })
            },
            
            addPlan(){
                axios.post('/api/price_plan/create',{
                    plan_name: this.plan_name,
                    sms_price: this.sms_price,
                    call_price: this.call_price
                })
                .then((res)=>{
                    this.plan_name = this.user_plan_name;
                    this.sms_price = this.user_sms_price;
                    this.call_price = this.user_call_price;

                    console.log(res.data)
                })
                .then(() => {
                    this.getPlan();
                    setTimeout(() => {
                        this.user_call_price='';
                        this.user_sms_price= '';
                        this.user_plan_name = '';
                        this.call_price='';
                        this.sms_price= '';
                        this.plan_name = '';
                    }, 30);
                 })
            },
            deletePlan(id){
                axios.post('/api/price_plan/delete', {
                    id: id
                })
                .then((res)=>{
                    console.log(res.data)

                    this.getPlan();
                    
                })
            },
            updatePlan(plan_name, sms_price, call_price, ed_id){
                axios.post('/api/price_plan/update', {
                    plan_name: this.user_plan_name,
                    sms_price: this.user_sms_price,
                    call_price: this.user_call_price,
                    id: this.ed_id
                })
                .then((res)=>{
                    console.log(res.data)

                    this.getPlan();

                    setTimeout(() => {
                        this.user_call_price='';
                        this.user_sms_price= '';
                        this.user_plan_name = '';
                        this.call_price='';
                        this.sms_price= '';
                        this.plan_name = '';
                    }, 30);
                 })
            },
            totalPhoneBill(bill){
                let call = this.call_price;
                let sms = this.sms_price;
                let callCount = 0;
                let smsCount = 0;
              
                let billArr = bill.split(",");
                
                //loop through the new array containing the calls adnd SMSs
                for(let i in billArr){
                  let trimmed = billArr[i].trim();
                  //count number of calls in the list
                    if(trimmed.includes("call")){
                      callCount += 1;
                    //count the number od SMSs in the list
                  }else if(trimmed.includes("sms")){
                    smsCount += 1;
                  }
                }
                
                //add the total cost of both calls and SMSs
                let total = callCount*call + smsCount*sms;
                //use toFixed method to print to 2 decimal places
                return "R"+total.toFixed(2);
              }
            
        } 
        
    })
})