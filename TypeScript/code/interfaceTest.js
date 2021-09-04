var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var person = {
    age: 10,
    name: 'TEST'
};
var gamer = { name: 'best gammer', age: 10, sex: 'man', gameType: 'AOS' };
console.log(gamer);
var Person = /** @class */ (function () {
    function Person() {
    }
    return Person;
}());
var Person2 = /** @class */ (function () {
    function Person2(age, name) {
        this.age = age;
        this.name = name;
    }
    return Person2;
}());
var address = {
    country: 'Korea',
    city: 'Seoul',
    address1: '1',
    address2: '2',
    address3: '3'
};
var country = address.country, city = address.city, dist = __rest(address, ["country", "city"]);
console.log(country, city, dist);
person.name = 'test2';
console.log('person ', person);
var personName1 = "person1 = " + person.name;
var personName2 = "person2 = " + person.name;
console.log(personName1, personName2);
