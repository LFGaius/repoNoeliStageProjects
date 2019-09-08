import { LightningElement, track, api, wire} from 'lwc';  
 import getLookupSerachRecordsStreetName from '@salesforce/apex/manageRecordsController.getLookupSerachRecordsStreetName';  
 import getLookupSerachRecordsCityName from '@salesforce/apex/manageRecordsController.getLookupSerachRecordsCityName';  
 import getLookupSerachRecordsStateName from '@salesforce/apex/manageRecordsController.getLookupSerachRecordsStateName';  
 import { ShowToastEvent } from 'lightning/platformShowToastEvent';
 
 export default class CompositionContactSearch extends LightningElement {  
   // Tracked properties  
   @track recordsStreetName;  
   @track recordsCityName;
   @track recordsStateName;
   @track popupopened=false;  
   //@track noRecordsFlag = false;  
   @track showoptionsStreetName = true; 
   @track showoptionsCityName = true; 
   @track showoptionsStateName = true;  
   @track searchStreetName = '';
   @track searchCityName = '';
   @track searchStateName = '';  
   @track selectedStreetName;
   @track selectedCityName;
   @track selectedStateName;  

   @track optionsList=[{label:'strada',value:'STRADA'},{label:'piata',value:'PIATA'},{label:'intrarea',value:'INTRAREA'},{label:'aleea',value:'ALEEA'},{label:'strada',value:'STRADA'},{label:'piata',value:'PIATA'},{label:'intrarea',value:'INTRAREA'},{label:'aleea',value:'ALEEA'}];
   // API properties   
   @api recordlimit;  
   @api label;  
   @track disab=false;
   @track disabsave=true;
   
   // Wire method to function, which accepts the Search String, Dynamic SObject, Record Limit, Search Field  
   @wire(getLookupSerachRecordsStreetName, { searchStreetName: '$searchStreetName' ,recordLimit : '$recordlimit'})  
   wiredStreets({ error, data }) { 
      
     
     //this.noRecordsFlag = 0;  
     if (data) {  
      if(data.length>0){//if empty list
        this.recordsStreetName = data;  
        this.error = undefined; 
       }else{
        this.recordsStreetName = undefined; 
        this.showoptionsStreetName=false; 
       } 
       //this.noRecordsFlag = this.records.length === 0 ? true : false;  
     } else if (error) {  
       this.error = error;  
       this.recordsStreetName = undefined;  
       this.showoptionsStreetName=false;
     }  
   } 
   
   @wire(getLookupSerachRecordsCityName, { searchCityName: '$searchCityName' ,recordLimit : '$recordlimit'})  
   wiredCitiesName({ error, data }) { 
     
     //this.noRecordsFlag = 0;  
     if (data) {  
      if(data.length>0){//if empty list
        this.recordsCityName = data;  
        this.error = undefined; 
       }else{
        this.recordsCityName = undefined; 
        this.showoptionsCityName=false; 
       } 
       //this.noRecordsFlag = this.records.length === 0 ? true : false;  
     } else if (error) {  
       this.error = error;  
       this.recordsCityName = undefined; 
       this.showoptionsCityName=false; 
     }  
   }
   
   @wire(getLookupSerachRecordsStateName, { searchStateName: '$searchStateName' ,recordLimit : '$recordlimit'})  
   wiredCitiesStateName({ error, data }) { 
     
     //this.noRecordsFlag = 0;  
     if (data) {
      if(data.length>0){//if empty list
        this.recordsStateName = data;  
        this.error = undefined; 
       }else{
        this.recordsStateName = undefined; 
        this.showoptionsStateName=false; 
       }  
       //this.noRecordsFlag = this.records.length === 0 ? true : false;  
     } else if (error) {  
       this.error = error;  
       this.recordsStateName = undefined; 
       this.showoptionsStateName=false;
     }  
   }

   
   // handle event called lookupselect  
   handlelookupselectStreetName(event){  
     this.selectedStreetName = event.detail.Name;  
     this.showoptionsStreetName = false;  
   }
   handlelookupselectCityName(event){  
    this.selectedCityName = event.detail.Name;  
    this.showoptionsCityName = false;  
  }
  handlelookupselectStateName(event){
    this.selectedStateName = event.detail.State_Name__c
    this.showoptionsStateName = false;  
  }  

   

   // key change on the text field  
   handleKeyChangeStreetName(event) {
     
     this.showoptionsStreetName = true;  
     this.searchStreetName = event.target.value || ''; //if event.detail.Name if undefined, we put empty character;
   }
   handleKeyChangeCityName(event) {
     
    this.showoptionsCityName = true;  
    this.searchCityName = event.target.value || ''; //if event.detail.Name if undefined, we put empty character;
  }
  handleKeyChangeStateName(event) {
     
    this.showoptionsStateName = true;  
    this.searchStateName = event.target.value || ''; //if event.detail.Name if undefined, we put empty character;
  }  


  //method prevent(empeche) redirection when the form is submitted
  clickHandle(event){
    // eslint-disable-next-line no-console
    console.log("dasdasdas");
    event.preventDefault();
  }

    //this methos display the popup who contains the create form
    openPopup(){
        this.popupopened=true;
        this.focusField();
    }

    //this methos close the popup who contains the create form
    closePopup(){
        this.popupopened=false;
    }

    focusField(){//when any field get the focus suggestions of all fields ar'nt displayed
        this.showoptionsCityName=false;
        this.showoptionsStateName=false;
        this.showoptionsStreetName=false;
    }

    handleCreationSucceed(){
      this.closePopup();
      const toastEvent=new ShowToastEvent({
        title:'Good job!',
        message:'The address has been successfully inserted!',
        variant:'success'
      });

      this.dispatchEvent(toastEvent);
    }
 }