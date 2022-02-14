(base) yulinwan@Yulins-Air Downloads % javac -cp "gson-2.8.2.jar" BlockJ.java
error: file not found: BlockJ.java
Usage: javac <options> <source files>
use --help for a list of possible options
(base) yulinwan@Yulins-Air Downloads % cd /Users/yulinwan/IdeaProjects/blockchain131              
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockJ.java
BlockJ.java:77: error: package com.google.gson does not exist
import com.google.gson.Gson;
                      ^
BlockJ.java:78: error: package com.google.gson does not exist
import com.google.gson.GsonBuilder;
                      ^
BlockJ.java:444: error: cannot find symbol
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        ^
  symbol:   class Gson
  location: class BlockJ
BlockJ.java:444: error: cannot find symbol
        Gson gson = new GsonBuilder().setPrettyPrinting().create();
                        ^
  symbol:   class GsonBuilder
  location: class BlockJ
BlockJ.java:462: error: cannot find symbol
        Gson gson = new Gson();
        ^
  symbol:   class Gson
  location: class BlockJ
BlockJ.java:462: error: cannot find symbol
        Gson gson = new Gson();
                        ^
  symbol:   class Gson
  location: class BlockJ
6 errors
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockJ.java
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockJ.java
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockJ.java
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ

Error: Could not find or load main class BlockJ
Caused by: java.lang.ClassNotFoundException: BlockJ
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ
Error: Could not find or load main class BlockJ
Caused by: java.lang.ClassNotFoundException: BlockJ
(base) yulinwan@Yulins-Air blockchain131 % ls
BlockInput0.txt		BlockMaster.bat		bc-output.txt
BlockInput1.txt		BlockRecord.class	bc.java
BlockInput2.txt		ProcessOne.bat		blockchain131.iml
BlockInputG.java	ProcessTwo.bat		checklist-block.html
BlockJ			ProcessZero.bat		gson-2.8.2.jar
BlockJ.class		WorkB.java		src
BlockJ.java		WorkBOutput.txt
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ.class
Error: Could not find or load main class BlockJ.class
Caused by: java.lang.ClassNotFoundException: BlockJ.class
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ  
Error: Could not find or load main class BlockJ
Caused by: java.lang.ClassNotFoundException: BlockJ
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockJ.java       
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ
Error: Could not find or load main class BlockJ
Caused by: java.lang.ClassNotFoundException: BlockJ
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".;gson-2.8.2.jar" BlockJ
Error: Could not find or load main class BlockJ
Caused by: java.lang.ClassNotFoundException: BlockJ
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".:gson-2.8.2.jar" BlockJ
In the constructor...
Running now


 =========> In DemonstrateUtilities <=========

Process number: 0 Ports: 4710 4810

Timestamp:  2022-01-21.02:59:55.0

Has the signature been verified: true

Hexidecimal byte[] Representation of Original SHA256 Hash: cb28775a502efafdd950e2085868d228ef5274d7521f5029c1a5fd051624da2c

The signed SHA-256 string: jPwb8nPJvThhGShj3gNzapE59BOp0BqupTZiIvRE5TI+EPAvpQtOoOQwdRYMsN0YOHdvmBkcEg9IwdNmqO6mEeePDXdz78NvPvknHZNcT0xlMWApkEYVhxK7efw3YlDI6HfkcW2hPIgJsrT06xBnjZHQIRU812NK5qql0SmT44s=

Testing restore of signature: true
Has the restored signature been verified: true

Key in Byte[] form: [B@446cdf90
Key in String form: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxwC8yRl9AaFSfZ/ih+x3PKBcSr5yEmc7mcNmu2fC1SdFlG8svSnxLZJTmtCVB5qybpPrtnybZ2udQeqZjew5T+mDOirqxzlJh5RlmmootlIxTCqUtsgmBBHscx3mypzsz/lOUUUsGmLsrQpyK3qqHE0Fq9aoOAFB0krwzTH/KFQIDAQAB

Bad key in String form: MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxwC8yRl9AaFMfZ/ih+x3PKBcSr5yEmc7mcNmu2fC1SdFlG8svSnxLZJTmtCVB5qybpPrtnybZ2udQeqZjew5T+mDOirqxzlJh5RlmmootlIxTCqUtsgmBBHscx3mypzsz/lOUUUsGmLsrQpyK3qqHE0Fq9aoOAFB0krwzTH/KFQIDAQAB
Key in Byte[] form again: [B@531d72ca
Has the signature been verified: true

Has the CONVERTED-FROM-STRING signature been verified: true

Damaged key in Byte[] form: [B@2cdf8d8a
Has the CONVERTED-FROM-STRING bad key signature been verified: false

We will now simulate some work: 
....... <-- We did 6 tenths of a second of *work*.


Extra encryption functionality in case you want it:
Starting Hash string: cb28775a502efafdd950e2085868d228ef5274d7521f5029c1a5fd051624da2c
Encrypted Hash string: EwrjTq+FHvm8NhuKdr0LkkpMOXR1s8dW3oa8rrKNMIK5M9fA8l/eVLq+dKzPxfkrzzv6/RNw/Z/TjpVkbdSCl3X2i0h/LFBtfc5gAcQDUfP6KtHyS9wWAtVSnWNoIfZ7O+oMYMkHsXXOYOC43yhEc/RT2UNnP7IaAe3qURFlDU8=
Original (now decrypted) Hash string: cb28775a502efafdd950e2085868d228ef5274d7521f5029c1a5fd051624da2c

=========> In WriteJSON <=========

Unique Block ID: 2fefd640-ab31-4503-b361-7fd29acba4f1

Our string random seed is: A05979. Wait, I mean it is: e8510f

String blockRecord is: 2fefd640-ab31-4503-b361-7fd29acba4f1Process2nullJosephChang123-45-6789Hot Chili Peppersnulle8510f

JSON String blockRecord is: {
  "BlockID": "2fefd640-ab31-4503-b361-7fd29acba4f1",
  "VerificationProcessID": "Process2",
  "uuid": "2fefd640-ab31-4503-b361-7fd29acba4f1",
  "Fname": "Joseph",
  "Lname": "Chang",
  "SSNum": "123-45-6789",
  "Rx": "Hot Chili Peppers",
  "RandomSeed": "e8510f",
  "WinningHash": "6361577b14638ba0310902ffd9328b3933507d6282fc07ddd2ca0331a7377ad8"
}

=========> In ReadJSON <=========

BlockRecord@60f82f98
Name is: Joseph Chang
String UUID: 2fefd640-ab31-4503-b361-7fd29acba4f1 Stored-binaryUUID: 2fefd640-ab31-4503-b361-7fd29acba4f1
(base) yulinwan@Yulins-Air blockchain131 % javac -cp "gson-2.8.2.jar" BlockInputG.java

(base) yulinwan@Yulins-Air blockchain131 % java -cp ".:gson-2.8.2.jar" BlockInputG

In the constructor...
Running now

Process number: 0 Ports: 4710 4820

Using input file: BlockInput0.txt
Timestamp:  2022-01-21.03:09:44.0
Timestamp:  2022-01-21.03:09:45.0
Timestamp:  2022-01-21.03:09:46.0
Timestamp:  2022-01-21.03:09:47.0
4 records read.

Records in the linked list:
 2022-01-21.03:09:44.0 John Smith
 2022-01-21.03:09:45.0 Joe Blow
 2022-01-21.03:09:46.0 Julie Wilson
 2022-01-21.03:09:47.0 Wayne Blaine

The shuffled list:
 2022-01-21.03:09:46.0 Julie Wilson
 2022-01-21.03:09:47.0 Wayne Blaine
 2022-01-21.03:09:45.0 Joe Blow
 2022-01-21.03:09:44.0 John Smith

Placing shuffled records in our priority queue...

Priority Queue (restored) Order:
 2022-01-21.03:09:44.0 John Smith
 2022-01-21.03:09:45.0 Joe Blow
 2022-01-21.03:09:46.0 Julie Wilson
 2022-01-21.03:09:47.0 Wayne Blaine




JSON (suffled) String list is: [
  {
    "BlockID": "e9e12583-73bd-4e42-810b-3b6b6755e0db",
    "TimeStamp": " 2022-01-21.03:09:46.0",
    "Fname": "Julie",
    "Lname": "Wilson",
    "SSNum": "123-45-6999",
    "DOB": "1996.03.07",
    "Diag": "Insomnia",
    "Treat": "Exercise",
    "Rx": "HotPeppers"
  },
  {
    "BlockID": "d3653db5-88ef-495d-bf7b-902fdaddbfc8",
    "TimeStamp": " 2022-01-21.03:09:47.0",
    "Fname": "Wayne",
    "Lname": "Blaine",
    "SSNum": "123-45-6777",
    "DOB": "1942.07.07",
    "Diag": "Measles",
    "Treat": "WaitToGetBetter",
    "Rx": "CodLiverOil"
  },
  {
    "BlockID": "8db0e9c0-aacb-4c3f-b8b5-a22963894f84",
    "TimeStamp": " 2022-01-21.03:09:45.0",
    "Fname": "Joe",
    "Lname": "Blow",
    "SSNum": "123-45-6888",
    "DOB": "1996.03.07",
    "Diag": "Smallpox",
    "Treat": "BedRest",
    "Rx": "Whiskey"
  },
  {
    "BlockID": "3396f478-d782-41e8-8684-557f3bb241a9",
    "TimeStamp": " 2022-01-21.03:09:44.0",
    "Fname": "John",
    "Lname": "Smith",
    "SSNum": "123-45-6789",
    "DOB": "1996.03.07",
    "Diag": "Chickenpox",
    "Treat": "BedRest",
    "Rx": "aspirin"
  }
]
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".:gson-2.8.2.jar" m %2
Error: Could not find or load main class m
Caused by: java.lang.ClassNotFoundException: m
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".:gson-2.8.2.jar" BlockInputG %1
In the constructor...
Running now

Process number: 0 Ports: 4710 4820

Using input file: BlockInput0.txt
Timestamp:  2022-01-21.03:14:54.0
Timestamp:  2022-01-21.03:14:55.0
Timestamp:  2022-01-21.03:14:56.0
Timestamp:  2022-01-21.03:14:57.0
4 records read.

Records in the linked list:
 2022-01-21.03:14:54.0 John Smith
 2022-01-21.03:14:55.0 Joe Blow
 2022-01-21.03:14:56.0 Julie Wilson
 2022-01-21.03:14:57.0 Wayne Blaine

The shuffled list:
 2022-01-21.03:14:55.0 Joe Blow
 2022-01-21.03:14:54.0 John Smith
 2022-01-21.03:14:57.0 Wayne Blaine
 2022-01-21.03:14:56.0 Julie Wilson

Placing shuffled records in our priority queue...

Priority Queue (restored) Order:
 2022-01-21.03:14:54.0 John Smith
 2022-01-21.03:14:55.0 Joe Blow
 2022-01-21.03:14:56.0 Julie Wilson
 2022-01-21.03:14:57.0 Wayne Blaine




JSON (suffled) String list is: [
  {
    "BlockID": "7ae4d7e2-4e21-4823-a9f9-036894738dfa",
    "TimeStamp": " 2022-01-21.03:14:55.0",
    "Fname": "Joe",
    "Lname": "Blow",
    "SSNum": "123-45-6888",
    "DOB": "1996.03.07",
    "Diag": "Smallpox",
    "Treat": "BedRest",
    "Rx": "Whiskey"
  },
  {
    "BlockID": "08337565-003d-4dd2-8326-b4949d73196c",
    "TimeStamp": " 2022-01-21.03:14:54.0",
    "Fname": "John",
    "Lname": "Smith",
    "SSNum": "123-45-6789",
    "DOB": "1996.03.07",
    "Diag": "Chickenpox",
    "Treat": "BedRest",
    "Rx": "aspirin"
  },
  {
    "BlockID": "6fffca87-a75f-42f4-91c3-f5bb335bab0a",
    "TimeStamp": " 2022-01-21.03:14:57.0",
    "Fname": "Wayne",
    "Lname": "Blaine",
    "SSNum": "123-45-6777",
    "DOB": "1942.07.07",
    "Diag": "Measles",
    "Treat": "WaitToGetBetter",
    "Rx": "CodLiverOil"
  },
  {
    "BlockID": "175a58e8-5c55-4653-bdc7-93cf5a36bbd8",
    "TimeStamp": " 2022-01-21.03:14:56.0",
    "Fname": "Julie",
    "Lname": "Wilson",
    "SSNum": "123-45-6999",
    "DOB": "1996.03.07",
    "Diag": "Insomnia",
    "Treat": "Exercise",
    "Rx": "HotPeppers"
  }
]
(base) yulinwan@Yulins-Air blockchain131 % java -cp ".:gson-2.8.2.jar" BlockInputG 2 
In the constructor...
Running now

Process number: 2 Ports: 4712 4822

Using input file: BlockInput2.txt
Timestamp:  2022-01-21.03:16:54.2
Timestamp:  2022-01-21.03:16:56.2
Timestamp:  2022-01-21.03:16:57.2
Timestamp:  2022-01-21.03:16:58.2
4 records read.

Records in the linked list:
 2022-01-21.03:16:54.2 Helen Keller
 2022-01-21.03:16:56.2 Abraham Lincoln
 2022-01-21.03:16:57.2 John Kennedy
 2022-01-21.03:16:58.2 Joe DiMaggio

The shuffled list:
 2022-01-21.03:16:58.2 Joe DiMaggio
 2022-01-21.03:16:57.2 John Kennedy
 2022-01-21.03:16:56.2 Abraham Lincoln
 2022-01-21.03:16:54.2 Helen Keller

Placing shuffled records in our priority queue...

Priority Queue (restored) Order:
 2022-01-21.03:16:54.2 Helen Keller
 2022-01-21.03:16:56.2 Abraham Lincoln
 2022-01-21.03:16:57.2 John Kennedy
 2022-01-21.03:16:58.2 Joe DiMaggio




JSON (suffled) String list is: [
  {
    "BlockID": "daf64ce3-12a0-4464-bda9-98aa01c22695",
    "TimeStamp": " 2022-01-21.03:16:58.2",
    "Fname": "Joe",
    "Lname": "DiMaggio",
    "SSNum": "111-22-3333",
    "DOB": "1914.11.25",
    "Diag": "SoreKnees",
    "Treat": "RestFromSports",
    "Rx": "Aspirin"
  },
  {
    "BlockID": "805077e8-7d0e-4542-8005-5702b1bec462",
    "TimeStamp": " 2022-01-21.03:16:57.2",
    "Fname": "John",
    "Lname": "Kennedy",
    "SSNum": "333-45-6999",
    "DOB": "1917.05.29",
    "Diag": "AddisonsDisease",
    "Treat": "DrugTherapy",
    "Rx": "Steroids"
  },
  {
    "BlockID": "46c22719-7b8d-4451-8606-c12851d58269",
    "TimeStamp": " 2022-01-21.03:16:56.2",
    "Fname": "Abraham",
    "Lname": "Lincoln",
    "SSNum": "444-45-6888",
    "DOB": "1809.02.12",
    "Diag": "GreviousWound",
    "Treat": "Surgery",
    "Rx": "Whiskey"
  },
  {
    "BlockID": "234d3471-5ea1-4894-a85e-003eafddfa26",
    "TimeStamp": " 2022-01-21.03:16:54.2",
    "Fname": "Helen",
    "Lname": "Keller",
    "SSNum": "666-45-6789",
    "DOB": "1880.06.27",
    "Diag": "Arthritis",
    "Treat": "WarmCloths",
    "Rx": "Aspirin"
  }
]
(base) yulinwan@Yulins-Air blockchain131 % 
