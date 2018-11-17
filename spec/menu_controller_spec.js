const MenuController = require("../controllers/MenuController");

// #1
 describe("MenuController", () => {
   beforeEach(() => {
      this.menu = new MenuController();
   });
   describe("#getContactCount()", () => {
// #2
   });
   describe("#remindMe()", () => {
     it("should return a string 'Learning is a life-long pursuit' when called", () => {
       expect(this.menu.remindMe()).toContain("Learning is a life-long pursuit");
     });
   });
 });
