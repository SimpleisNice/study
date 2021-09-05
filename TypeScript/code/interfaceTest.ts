interface IPerson {
  age: number;
  name: string;
  sex?: string;
}

const person:IPerson = {
  age: 10,
  name: 'TEST',
}


const gamer: {
  name: string;
  age: number;
  sex?: string;
  gameType?: string;
} = { name: 'best gammer', age: 10, sex: 'man', gameType: 'AOS' };

console.log(gamer);


class Person implements IPerson {
  age: number;
  name: string;
}

class Person2 implements IPerson {
  constructor(public age: number, public name: string) {}
}


let address: any = {
  country: 'Korea',
  city: 'Seoul',
  address1: '1',
  address2: '2',
  address3: '3',
}

const { country, city, ...dist } = address;

console.log(country, city, dist);



(<{name: string}>person).name = 'test2';
console.log('person ', person);

let personName1 = `person1 = ${(<{name: string}> person).name}`;
let personName2 = `person2 = ${(person as {name: string}).name}`;

console.log(personName1, personName2);


type ageToString = (number) => string;
let f: ageToString = function(age: number): string { return ''}
let g: ageToString = function(age: number): number { return 0 }