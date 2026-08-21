// primitive value(number,boolean,string)
let num = 24;
num = true; // Type 'string' is not assignable to type 'number'
num = "jayant"; // X
num = 26;

// arrays
let array: number[] = [1, 2, 34, 56];
let array2: number[] = [1, 2, 34, 56, "jayant"]; // X

// tuples
// define array of fixed size with data type of each and every index
let array3: [number, string] = [43.1, "jk"];
let array4: [number, string] = [43.1, 3, "jk"]; // X

//enumeration
enum StatusCodes {
  ABONDONED = "abandoned status code not found 500",
  NOTFOUND = "not found status code 404",
}
StatusCodes.ABONDONED;
enum UserRoles {
  ADMIN = "admin",
  GUEST = "guest",
  SUPER_ADMIN = "super_admin",
}

//any == typescript off
let a: any;
a = 10;
a = "jayant";

// unknown
let b: unknown;
b = 20;
b = "jayant";
if (typeof b === "string") b.toLowerCase();

// void
function func(): void {
  console.log("jayant is the best developer");
}

// null
let c: null;
let c2: null | string;
c2 = "jk";

// interface
// if we make interface of same variable then they merged
// it create shape of object
interface User {
  name: string;
  email: string;
  password: string;
  gender?: string;
}
function func2(obj: User): void {
  console.log(obj.email, obj.password);
}
func2({ name: "jayant", email: "jk@gmail.com", password: "slfjsld" });
func2({
  name: "jayant",
  email: "jk@gmail.com",
  password: "slfjsld",
  gender: "male",
});
interface Admin extends User {
  admin: boolean;
}

// type aliases
type username = number | string | null;
let d: username;
d = 30;
d = "jk";
type User2 = {
  name: string;
  email: string;
};
type Admin2 = User2 & {
  getDetails(user: string): void;
};
function func02(a:Admin2){
    return a.getDetails
}
