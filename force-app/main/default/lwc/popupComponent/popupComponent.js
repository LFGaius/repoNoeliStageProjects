import { LightningElement,track,api,wire} from 'lwc';  
import getLookupSerachRecordsCityName from '@salesforce/apex/manageRecordsController.getLookupSerachRecordsCityName';  
import getLookupSerachRecordsStateName from '@salesforce/apex/manageRecordsController.getLookupSerachRecordsStateName';
import insertAddress from '@salesforce/apex/manageRecordsController.insertAddress';

export default class PopupComponent extends LightningElement {

    // Tracked properties  
    @track recordsCityName;
    @track recordsStateName;  

    @track showoptionsCityName = true; 
    @track showoptionsStateName = true;  


    @track searchCityName = '';
    @track searchStateName = '';  

    @track selectedCityName;
    @track selectedStateName;
    @track optionsList=[{label:'strada',value:'STRADA'},{label:'piata',value:'PIATA'},{label:'intrarea',value:'INTRAREA'},{label:'aleea',value:'ALEEA'},{label:'strada',value:'STRADA'},{label:'piata',value:'PIATA'},{label:'intrarea',value:'INTRAREA'},{label:'aleea',value:'ALEEA'}];  
    @track error;

    // API properties   
    @api recordlimit=100;  
    @api label;

    @track haveError=false;



    @wire(getLookupSerachRecordsCityName, { searchCityName: '$searchCityName' ,recordLimit : '$recordlimit'})  
    wiredCitiesName({ error, data }) { 
      
        
     if (data) {  
       if(data.length>0){//if empty list
        this.recordsCityName = data;  
        this.error = undefined; 
       }else{
        this.recordsCityName = undefined; 
        this.showoptionsCityName=false; 
       }
       
     } else if (error) {  
       this.error = error;  
       this.recordsCityName = undefined; 
       this.showoptionsCityName=false; 
     }  
    }
   
    @wire(getLookupSerachRecordsStateName, { searchStateName: '$searchStateName' ,recordLimit : '$recordlimit'})  
    wiredCitiesStateName({ error, data }) { 
       
     if (data) {
      if(data.length>0){//if empty list
        this.recordsStateName = data;  
        this.error = undefined; 
       }else{
        this.recordsStateName = undefined; 
        this.showoptionsStateName=false; 
       }   
     } else if (error) {  
       this.error = error;  
       this.recordsStateName = undefined; 
       this.showoptionsStateName=false;
     }  
    }

    // handle event called lookupselect  
    
    handlelookupselectCityName(event){  
        this.selectedCityName = event.detail.Name;  
        this.showoptionsCityName = false;  
    }
    handlelookupselectStateName(event){
        this.selectedStateName = event.detail.State_Name__c
        this.showoptionsStateName = false;  
    }  

  

    // key change on the text field 
    handleKeyChangeCityName(event) {
        this.showoptionsCityName = true;  
        this.searchCityName = event.target.value;
    }
    handleKeyChangeStateName(event) {
        this.showoptionsStateName = true;  
        this.searchStateName = event.target.value;
    }
    
    //method prevent(empeche) redirection when the form is submitted
    clickHandle(event){
        
        //let myform=this.template.querySelector('form');
        let l=this.template.querySelectorAll('.field');//list of different fields in the popup
        let valid=true;
        for(let i=0;i<l.length;i++){
          if(!l[i].checkValidity){
            valid=false;
            break;
          }
        }

        if(valid){
          
          insertAddress({cityName:l[0].value,stateName:l[1].value,streetName:l[2].value,streetType:l[3].value,streetNumber:l[4].value,zipCode:l[5].value,evenOdd:l[6].value})
            .then(() => {//insertion succeed
                
                this.error = undefined;
                this.haveError=false;
                this.signalCreateSucceed();
            })
            .catch(error => {//we catch error if lifted
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(error));
                this.error = error.body.message;//showing error message
                this.haveError=true;
               // if(myform.attachEvent){//eventually submit event
                 // myform.attachEvent.stopPropagation();
                //}
            });
        }

        event.preventDefault();
        event.stopPropagation();//we stop the submit event propagation to prevent eventually unexpected and prevent the form to listen this current submition again
    }

    focusField(){//when any field get the focus suggestions of all fields ar'nt displayed
        this.showoptionsCityName=false;
        this.showoptionsStateName=false;
    }

    signalPopupClosing(){
        const ev=new CustomEvent('closepop');
        this.dispatchEvent(ev);
    }

    signalCreateSucceed(){//signal that address creation has succeed
      const ev=new CustomEvent('creationsucceed');

      this.dispatchEvent(ev);
    }


}