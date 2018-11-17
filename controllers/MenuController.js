const inquirer = require('inquirer');
const ContactController = require("./ContactController");

 module.exports = class MenuController {
   constructor() {

     this.mainMenuQuestions = [
       {
        type: "list",
         name: "mainMenuChoice",
         message: "Please choose from an option below: ",
         choices: [
           "Add new contact",
           "View all contacts",
           "Search for a contact",
           "Show Date/Time",
           "Exit"
         ]
       }
     ];
     this.book = new ContactController();
   }

   main(){
     console.log(`Welcome to AddressBloc!`);
     inquirer.prompt(this.mainMenuQuestions).then((response) => {
       switch(response.mainMenuChoice){
         case "Add new contact":
           this.addContact();
           break;
         case "View all contacts":
           this.getContacts();
           break;
         case "Search for a contact":
           this.search();
           break;
         case "Show Date/Time":
           this.getDate();
           break;
         case "Exit":
           this.exit();
         default:
           console.log("Invalid input");
           this.main();
       }
     })
     .catch((err) => {
       console.log(err);
     });
   }

   clear(){
     console.log("\x1Bc");
   }

   addContact() {
     this.clear();
     inquirer.prompt(this.book.addContactQuestions).then((answers) => {
       this.book.addContact(answers.name, answers.phone).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });
     this.main();
   }
   getContacts(){
     this.clear();

     this.book.getContacts().then((contacts) => {
       for (let contact of contacts) {
         console.log(`
         name: ${contact.name}
         phone number: ${contact.phone}
         email: ${contact.email}
         ---------------`
         );
       }
       this.main();
     }).catch((err) => {
       console.log(err);
       this.main();
     });
   }
   exit() {
     console.log("Thanks for using AddressBloc!");
     process.exit();
   }
   getDate() {
     let today  = new Date();

     let formattedDate =  today.toLocaleString("en-US");
     this.clear();
     console.log(formattedDate);
     console.log("\n");
     this.main();
   }
   getContactCount() {
     //method definition
     return this.contacts.length;
   }
   remindMe() {
     return "Learning is a life-long pursuit";
   }
   search(){
     inquirer.prompt(this.book.searchQuestions)
     .then((target) => {
      this.book.search(target.name)
      .then((contact) => {
         if(contact === null){
           this.clear();
           console.log("contact not found");
           this.search();
         } else {
           this.showContact(contact);
        }

       });
    })
    .catch((err) => {
      console.log(err);
      this.main();
    });
   }

   showContact(contact){
     this._printContact(contact);
   }

   _printContact(contact){
     console.log(`
       name: ${contact.name}
       phone number: ${contact.phone}
       email: ${contact.email}
       ---------------`
     );
   }
   delete(contact){
     inquirer.prompt(this.book.deleteConfirmQuestions)
     .then((answer) => {
       if(answer.confirmation){
         this.book.delete(contact.id);
         console.log("contact deleted!");
         this.main();
       } else {
         console.log("contact not deleted");
         this.showContact(contact);
       }
     })
     .catch((err) => {
       console.log(err);
       this.main();
     });
   }
 }
