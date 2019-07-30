var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var radnici;
//Na osnovu podataka iz teksta zadatka zakljucujemo koje atribute i metode ima klasa radnik
var Radnik = /** @class */ (function () {
    function Radnik(ime, godine, osnovica) {
        this.name = ime;
        this.godine = godine;
        this.osnovica = osnovica;
    }
    Object.defineProperty(Radnik.prototype, "plata", {
        get: function () {
            return this.osnovica;
        },
        enumerable: true,
        configurable: true
    });
    Radnik.prototype.godinaRodjenja = function () {
        //Da bi dobili godinu rodjenja treba nam trenutna godina 
        var datum = new Date(); //Trenutni datum
        var trenutnaGodina = datum.getFullYear(); //Trenutna godina
        return trenutnaGodina - this.godine;
    };
    return Radnik;
}());
var Tehnicar = /** @class */ (function (_super) {
    __extends(Tehnicar, _super);
    function Tehnicar(ime, godine, osnovica) {
        return _super.call(this, ime, godine, osnovica) || this;
    }
    return Tehnicar;
}(Radnik));
var Inzenjer = /** @class */ (function (_super) {
    __extends(Inzenjer, _super);
    function Inzenjer(ime, godine, osnovica) {
        return _super.call(this, ime, godine, osnovica) || this;
    }
    Object.defineProperty(Inzenjer.prototype, "plata", {
        get: function () {
            return this.osnovica * 1.12;
        },
        enumerable: true,
        configurable: true
    });
    return Inzenjer;
}(Radnik));
var Doktor = /** @class */ (function (_super) {
    __extends(Doktor, _super);
    function Doktor(ime, godine, osnovica) {
        return _super.call(this, ime, godine, osnovica) || this;
    }
    Object.defineProperty(Doktor.prototype, "plata", {
        get: function () {
            return (this.osnovica * 0.13) + this.osnovica;
        },
        enumerable: true,
        configurable: true
    });
    return Doktor;
}(Radnik));
var o1 = new Tehnicar("Pera", 23, 100);
var o2 = new Inzenjer("Mika", 29, 100);
var o3 = new Doktor("Doca", 35, 100);
radnici = [o1, o2, o3];
console.log(o1.name + " " + o1.plata);
console.log(o2.name + " " + o2.plata);
console.log(o3.name + " " + o3.plata);
//Zadatak 3
function srednjaVrednost(radnici) {
    return radnici.reduce(function (pr, el, i, arr) { return pr + (el.godine / arr.length); }, 0);
}
var prosek = srednjaVrednost(radnici);
console.log(prosek);
//Zadatak 4
radnici.forEach(function (elem) {
    console.log("Godina rodjenja za radnika " + elem.name + " je " + elem.godinaRodjenja());
});
//# sourceMappingURL=radnici.js.map