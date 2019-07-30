/*//Zadatak 4
Napisati klasu Pas.
Svaki pas ima ime, starost (u psećim godinama), podatak da li je vakcinisan i naziv rase.
Napisati konstruktor (sa podrazumevanim vrednostima za parametre), gettere i settere.
Psa je moguće vakcinisati, ispisati njegovu starost u ljudskim godinama*, ispisati sve podatke o psu. (napraviti metode za navedene funkcionalnosti)

Kreirati posebnu Kennel klasu. Kennel klasa ima naziv, adresu, i niz Pasa.
Napisati konstruktor koji kao parametre prima samo naziv i adresu.
Implementirati getere i setere, kao i metodu za dodavanje pasa u niz.
(Prilikom testiranja u taj niz dodati barem 7 pasa). Implementirati metode koje omogucuju sledece funkcionalnosti:
    -pronaći najstarijeg psa
    -pronaci najmladjeg psa
    -ispisati imena vakcinisanih pasa.
    
*Napomena: Jedna pseća godina je 7 ljudskih.*/
var Pas = /** @class */ (function () {
    function Pas(ime, starost, vakcinisan, rasa) {
        if (ime === void 0) { ime = "Dzeki"; }
        if (starost === void 0) { starost = 1; }
        if (vakcinisan === void 0) { vakcinisan = false; }
        if (rasa === void 0) { rasa = "Dodž"; }
        this._ime = ime;
        this._starost = starost;
        this._vakcinisan = vakcinisan;
        this._rasa = rasa;
    }
    Object.defineProperty(Pas.prototype, "ime", {
        get: function () {
            return this._ime;
        },
        set: function (value) {
            this._ime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pas.prototype, "starost", {
        get: function () {
            return this._starost;
        },
        set: function (value) {
            this._starost = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pas.prototype, "vakcinisan", {
        get: function () {
            return this._vakcinisan;
        },
        set: function (value) {
            this._vakcinisan = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pas.prototype, "rasa", {
        get: function () {
            return this._rasa;
        },
        set: function (value) {
            this._rasa = value;
        },
        enumerable: true,
        configurable: true
    });
    Pas.prototype.vakcinisi = function () {
        this._vakcinisan = true;
    };
    Pas.prototype.ispisiStarost = function () {
        console.log(this._starost * 7);
    };
    Pas.prototype.ispisiSve = function () {
        console.log("Ime: " + this._ime + " \nStarost: " + this._starost + "\n" +
            ("Vakcinisan: " + ((this._vakcinisan) ? "Da" : "Ne") + "\n") +
            ("Rasa: " + this._rasa));
    };
    return Pas;
}());
var Kennel = /** @class */ (function () {
    function Kennel(naziv, adresa) {
        this._naziv = naziv;
        this._adresa = adresa;
        this._psi = []; //U konstruktoru nije potrebeno da dajemo niz pasa kao parametar, jer ocekujemo da novi objekat nece imati pse
    }
    Object.defineProperty(Kennel.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Kennel.prototype, "adresa", {
        get: function () {
            return this._adresa;
        },
        set: function (value) {
            this._adresa = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Kennel.prototype, "psi", {
        get: function () {
            return this._psi;
        },
        set: function (value) {
            this._psi = value;
        },
        enumerable: true,
        configurable: true
    });
    Kennel.prototype.dodajPsa = function (value) {
        this._psi.push(value);
    };
    Kennel.prototype.pronadjiNajstarijeg = function () {
        //Ono sto je u return callback funkcije reduca ce biti prev parametar u sledecem callbacku, a poslednji callback
        //ce biti rezultat reduca. Tu osobinu mozemo da iskoristimo kako bi iz callback-a u callback slali objekat Pas
        //cija je starost najveca, tj najstarijeg psa. I kao poslednji return vratice nam objekat psa cija je starost najveca.
        return this._psi.reduce(function (prev, elem) {
            if (prev.starost >= elem.starost) {
                return prev;
            }
            else {
                return elem;
            }
        });
    };
    Kennel.prototype.pronadjiNajmladjeg = function () {
        //Ima smisla da pretrazujemo niz pasa samo ako postoje psi u njemu
        return this._psi.reduce(function (prev, elem) {
            if (prev.starost <= elem.starost) {
                return prev;
            }
            else {
                return elem;
            }
        });
    };
    Kennel.prototype.vakcinisani = function () {
        for (var i = 0; i < this._psi.length; i++) {
            if (this._psi[i].vakcinisan)
                console.log(this._psi[i].ime);
        }
    };
    return Kennel;
}());
var p1 = new Pas("Vucko", 1, false, "Sarplaninac");
var p2 = new Pas("Lajka", 3, true, "Mongrel-Husky-Terrier");
var p3 = new Pas();
var p4 = new Pas("Lesi", 5, true, "Skotski ovcar");
var p5 = new Pas("Beethoven", 2, true, "Bernardinac");
var p6 = new Pas("Snoopy", 68, true, "Dodž");
var p7 = new Pas("Scooby Doo", 48, true, "Nemacka doga");
var k = new Kennel("Kennel", "Adressa Kennela");
k.psi = [p1, p2, p3, p4, p5, p6, p7];
console.log("-------------------Najmladji----------------");
var pNM = k.pronadjiNajmladjeg();
console.log("Najmladji: " + pNM.ime + " (" + pNM.starost + ")");
pNM.ispisiStarost();
console.log("-------------------Najstariji----------------");
var pNS = k.pronadjiNajstarijeg();
console.log("Najsatriji: " + pNS.ime + " (" + pNS.starost + ")");
pNS.ispisiStarost();
console.log("-------------------Vakcinisani----------------");
k.vakcinisani();
console.log("-------------------Vakcinisani 2----------------");
p3.vakcinisi();
k.vakcinisani();
//# sourceMappingURL=script.js.map