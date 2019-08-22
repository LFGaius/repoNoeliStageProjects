public with sharing class manageRecordsController {
    @AuraEnabled(cacheable=true)  
   public static List<Street__c> getLookupSerachRecordsStreetName(String searchStreetName ,Integer recordLimit) {  
     if(searchStreetName != null && searchStreetName != ''){  
       String query = 'select Name, Id from Street__c';  
         query += ' where Name like \'%'+ searchStreetName +'%\' ';  
       query+= 'limit ' + recordLimit;  
       return Database.query(query);  
     }  
     return null;  
   } 

   @AuraEnabled(cacheable=true)  
   public static List<City__c> getLookupSerachRecordsCityName(String searchCityName ,Integer recordLimit) {  
     if(searchCityName != null && searchCityName != ''){  
       String query = 'select  Name, Id from City__c';  
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
       query+= 'limit ' + recordLimit;  
       return Database.query(query);  
     }  
     return null;  
   } 

   
   @AuraEnabled
   public static String insertCity(String name,String stateName){//this method will return the id of the inserted city 
      List<City__c> lp=[SELECT Id FROM City__c WHERE Name=:name AND State_Name__c=:stateName];
     
      if(lp.isEmpty()){//If the city does'nt already exist
        City__c city=new City__c();
        city.Name=name;
        city.State_Name__c=stateName;
        List<City__c> l=new List<City__c>{city};
        Database.insert(city, true);
        
        return city.Id;
      }

      return lp[0].Id;
   }

   @AuraEnabled
   public static void insertStreet(String cityId/*the mapping field (Id in our case)*/,String name,String streetType,Integer streetNumber,String zipCode,String evenOdd){
      
      List<Street__c> lp=[SELECT Id FROM Street__c WHERE City__r.Id=:cityId AND Name=:name AND Street_Type__c=:streetType AND Street_Number__c=:streetNumber AND Zip_Code__c=:zipCode AND Even_Odd__c=:evenOdd];
      
      if(lp.isEmpty()){
        Street__c street=new Street__c();
        street.City__c=cityId;
        street.Name=name;
        street.Street_Type__c=streetType;
        street.Street_Number__c=streetNumber;
        street.Zip_Code__c=zipCode;
        street.Even_Odd__c=evenOdd;

        List<Street__c> l1=new List<Street__c>{street};

        Database.insert(l1, true);
      }else{
          throw new SObjectException('This address already exists!');//Error message to propagate
      }
   }

   @AuraEnabled(cacheable=false)
   public static void insertAddress(String cityName,String stateName,String streetName,String streetType,Integer streetNumber,String zipCode,String evenOdd){
      
      System.debug('fdfd');
      insertStreet(
        insertCity(cityName,stateName),
        streetName,streetType,streetNumber,zipCode,evenOdd);
   }
}
