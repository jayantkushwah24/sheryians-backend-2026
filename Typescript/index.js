"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// primitive value(number,boolean,string)
let num = 24;
num = true; // Type 'string' is not assignable to type 'number'
num = "jayant"; // X
num = 26;
// arrays
let array = [1, 2, 34, 56];
let array2 = [1, 2, 34, 56, "jayant"]; // X
// tuples
// define array of fixed size with data type of each and every index
let array3 = [43.1, "jk"];
let array4 = [43.1, 3, "jk"]; // X
//enumeration
var StatusCodes;
(function (StatusCodes) {
    StatusCodes["ABONDONED"] = "abandoned status code not found 500";
    StatusCodes["NOTFOUND"] = "not found status code 404";
})(StatusCodes || (StatusCodes = {}));
StatusCodes.ABONDONED;
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["GUEST"] = "guest";
    UserRoles["SUPER_ADMIN"] = "super_admin";
})(UserRoles || (UserRoles = {}));
//any == typescript off
let a;
a = 10;
a = "jayant";
// unknown
let b;
b = 20;
b = "jayant";
if (typeof b === "string")
    b.toLowerCase();
// void
function func() {
    console.log("jayant is the best developer");
}
// null
let c;
let c2;
c2 = "jk";
function func2(obj) {
    console.log(obj.email, obj.password);
}
func2({ name: "jayant", email: "jk@gmail.com", password: "slfjsld" });
func2({
    name: "jayant",
    email: "jk@gmail.com",
    password: "slfjsld",
    gender: "male",
});
let d;
d = 30;
d = "jk";
function func02(a) {
    return a.getDetails;
}
//# sourceMappingURL=index.js.map