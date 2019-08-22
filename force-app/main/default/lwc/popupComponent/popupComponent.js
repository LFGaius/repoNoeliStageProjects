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
    @track success;

    // API properties   
    @api recordlimit=100;  
    @api label;

    @track haveError=false;
    @track haveSuccess=false;



    @wire(getLookupSerachRecordsCityName, { searchCityName: '$searchCityName' ,recordLimit : '$recordlimit'})  
    wiredCitiesName({ error, data }) { 
      
        
     if (data) {  
       
       this.recordsCityName = data;  
       this.error = undefined; 
       
     } else if (error) {  
       this.error = error;  
       this.recordsCityName = undefined; 
       this.showoptionsCityName=false; 
     }  
    }
   
    @wire(getLookupSerachRecordsStateName, { searchStateName: '$searchStateName' ,recordLimit : '$recordlimit'})  
    wiredCitiesStateName({ error, data }) { 
       
     if (data) {
       this.recordsStateName = data;  
       this.error = undefined;   
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
            .then(() => {
                // eslint-disable-next-line no-console
                console.log("good");
                this.success="Address created!";
                this.error = undefined;
                this.haveError=false;
                this.haveSuccess=true;
                this.template.querySelector('form').reset();
            })
            .catch(error => {//we catch error if lifted
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(error));
                this.success=undefined;
                this.error = error.body.message;//showing error message
                this.haveError=true;
                this.haveSuccess=false;
            });
        }

        event.preventDefault();
    }

    focusField(){//when any field get the focus suggestions of all fields ar'nt displayed
        this.showoptionsCityName=false;
        this.showoptionsStateName=false;
    }

    signalPopupClosing(){
        const ev=new CustomEvent('closepop');
        this.dispatchEvent(ev);
    }


}