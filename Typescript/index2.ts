// class
class Device {
  name = "dell";
  price = 40000;
  category = "electronics";
}
let d1 = new Device();

// constructor
// there are two ways to define ..first one is shorthand, easy and simple....
class Music {
  constructor(
    public name: string,
    public length: number,
    public artist: string,
    public thumbnail: string = "thumbnail.png",
    public isFree: boolean,
  ) {}
}
const m1 = new Music("tere naam", 300, "udit narayan", "", true);
class Music2 {
  public name;
  public length;
  public artist;
  public isFree;
  constructor(name: string, length: number, artist: string, isFree: boolean) {
    this.name = name;
    this.length = length;
    this.artist = artist;
    this.isFree = isFree;
  }
}

// public,private,protected
class BottleMaker {
  public company;
  private material;
  protected price;
  constructor(company: string, material: string, price: number) {
    this.company = company;
    this.material = material;
    this.price = price;
  }
}
const b1 = new BottleMaker("milton", "metal", 1200);
b1.company = "bilton";
b1.material = "plastic"; //Property 'material' is private and only accessible within class 'BottleMaker'.
b1.price = 1100; // Property 'price' is protected and only accessible within

// static
class User {
  static name = "jk";
  static getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }
}
User.getRandomNumber;
User.name;

// function
function func(
  name: string,
  age: number,
  callback: (value1: number, value2: number) => boolean,
): void {
  callback(23, 23);
}
const isEqual = (value1: number, value2: number): boolean => {
  return value1 == value2;
};
func("jayant", 26, isEqual);
function acceptViaRestOperator(...arr: number[]): void {
  console.log(arr);
}
acceptViaRestOperator(3, 5, 34, 5, 453, 5, 7, 78, 6, 5, 54, 3, 3, 564, 5, 6, 4);

// generics
// while calling a function we can define the type of the arguments
function func2<T>(a: T): T {
  return a as T;
}
func2<string>("jayant");
func2<number>(126);
func2<boolean>(true);

