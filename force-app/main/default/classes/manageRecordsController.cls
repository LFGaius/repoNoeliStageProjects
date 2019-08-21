public with sharing class manageRecordsController {
    @AuraEnabled(cacheable=true)  
   public static List<Street__c> getLookupSerachRecordsStreetName(String searchStreetName ,Integer recordLimit) {  
     if(searchStreetName != null && searchStreetName != ''){  
       String query = 'select Name, Id from Street__c';  
         query += ' where Name like \'%'+ searchStreetName +'%\' ';  
       query+= ' limit ' + recordLimit;  
       return Database.query(query);  
     }  
     return null;  
   } 

   @AuraEnabled(cacheable=true)  
   public static List<City__c> getLookupSerachRecordsCityName(String searchCityName ,Integer recordLimit) {  
     if(searchCityName != null && searchCityName != ''){  
       String query = 'select Name, Id from City__c';  
         query += ' where Name like \'%'+ searchCityName +'%\' ';  
       query+= ' limit ' + recordLimit;  
       return Database.query(query);  
     }  
     return null;  
   }

   @AuraEnabled(cacheable=true)  
   public static List<City__c> getLookupSerachRecordsStateName(String searchStateName ,Integer recordLimit) {  
     if(searchStateName != null && searchStateName != ''){  
       String query = 'select State_Name__c, Id from City__c';  
         query += ' where State_Name__c like \'%'+ searchStateName +'%\' ';  
       query+= ' limit ' + recordLimit;  
       return Database.query(query);  
     }  
     return null;  
   } 
}
