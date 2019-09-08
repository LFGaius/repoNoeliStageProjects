@isTest
private class TestManageRecordsController {
    
    @isTest static void TestGetLookupSerachRecordsStreetName(){
        
    }
    
    @isTest static void TestGetLookupSerachRecordsCityName(){
        
    }
    
    @isTest static void TestGetLookupSerachRecordsStateName(){
        
    }
    
    @isTest static void TestInsertCity(){
        String idt=manageRecordsController.insertCity('Bafoussam','Cameroon');
        
        System.assert(idt!=null);
        System.assertEquals('Bafoussam', ([SELECT Name FROM City__c WHERE Id=:idt])[0].Name);
    }
    
    @isTest static void TestInsertStreet(){
        City__c c=new City__c(Name='Yaounde',State_Name__c='Cameroon');
        insert c;
        Integer n=([SELECT Name FROM Street__c WHERE City__r.Id=:c.Id and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size();
        Test.startTest();
        manageRecordsController.insertStreet(c.Id,'orly','PIATA',1,'or1','a');
        Test.stopTest();
        
        System.assert(([SELECT Name FROM Street__c WHERE City__r.Id=:c.Id and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size()>n);
    }
    
    
    @isTest static void TestInsertAddress(){
        
        Integer n=([SELECT Name FROM Street__c WHERE City__r.Name='Y1' and City__r.State_Name__c='C1' and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size();
        Test.startTest();
        manageRecordsController.insertAddress('Y1','C1','orly','PIATA',1,'or1','a');
        Test.stopTest();
        
        System.assert(([SELECT Name FROM Street__c WHERE City__r.Name='Y1' and City__r.State_Name__c='C1' and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size()>n);
    }
    
    @isTest static void TestInsertAddress1(){//with already exists
        City__c c=new City__c(Name='Y1',State_Name__c='C1');
        insert c;
        Street__c s=new Street__c(City__c=c.Id,Name='orly',Street_Type__c='PIATA',Street_Number__c=1,Zip_Code__c='or1',Even_Odd__c='a');
        insert s;
        
        Integer n=([SELECT Name FROM Street__c WHERE City__r.Name='Y1' and City__r.State_Name__c='C1' and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size();
        Test.startTest();
        manageRecordsController.insertAddress('Y1','C1','orly','PIATA',1,'or1','a');
        Test.stopTest();
        
        System.assert(([SELECT Name FROM Street__c WHERE City__r.Name='Y1' and City__r.State_Name__c='C1' and Name='orly' and Street_Type__c='PIATA' and Street_Number__c=1 and Zip_Code__c='or1' and Even_Odd__c='a']).size()==n);
    }
}