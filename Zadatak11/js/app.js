var Namestaj = /** @class */ (function () {
    function Namestaj(sifra, naziv, jedinicnaCena, kolicinaUMagacinu) {
        this._sifra = sifra;
        this._naziv = naziv;
        this._jedinicnaCena = jedinicnaCena;
        this._kolicinaUMagacinu = kolicinaUMagacinu;
    }
    Object.defineProperty(Namestaj.prototype, "sifra", {
        //Geteri i seteri
        get: function () {
            return this._sifra;
        },
        set: function (value) {
            this._sifra = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Namestaj.prototype, "naziv", {
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Namestaj.prototype, "jedinicnaCena", {
        get: function () {
            return this._jedinicnaCena;
        },
        set: function (value) {
            this._jedinicnaCena = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Namestaj.prototype, "kolicinaUMagacinu", {
        get: function () {
            return this._kolicinaUMagacinu;
        },
        set: function (value) {
            this._kolicinaUMagacinu = value;
        },
        enumerable: true,
        configurable: true
    });
    return Namestaj;
}());
var Salon = /** @class */ (function () {
    function Salon(naziv, adresa, telefon) {
        this._naziv = naziv;
        this._adresa = adresa;
        this._telefon = telefon;
        //Novi salon namestaja nece imati namestaje, ali zelimo da mozemo da dodajemo namestaj u niz
        //zbog toga inicijalizujemo niz namestaja na prazan niz
        this._namestaj = [];
    }
    Salon.prototype.ispisiNamestajNaStanju = function () {
        this._namestaj.forEach(function (el, i) {
            //Posto zelimo da ispisemo samo namestaj koji imamo na stanju, proveravamo da li je kolicinaUMagacinu > 0, ako jeste ispisujemo (tj. nudimo kupcu proizvod za kupovinu)
            if (el.kolicinaUMagacinu > 0) {
                console.log((i + 1) + ". " + el.sifra + " " + el.naziv + " " + el.kolicinaUMagacinu + " " + el.jedinicnaCena);
            }
        });
        console.log(" "); //Kako bi imali prazan izmedju dva ispisa
    };
    Salon.prototype.dodajNaLager = function (sifra, kolicina) {
        var nizSaJednimElementom = this._namestaj.filter(function (el) { return el.sifra == sifra; });
        //Ukoliko ne postoji element sa navedenom sifrom, filter ce nam vratiti prazan niz
        if (nizSaJednimElementom.length > 0)
            nizSaJednimElementom[0].kolicinaUMagacinu += kolicina; //Posto je sifra jedinstvena, ako postoji element sa navedenom sifrom filter ce uvek vracati niz sa jednim elementom, a njemu pristupamo sa indekskom 0 
    };
    Salon.prototype.dodajNamestaj = function (namestaj) {
        //Ukoliko duzina niza kojeg smo dobili sa filterom je veca od 0, to znaci
        //da postoji element sa prosledjenom sifrom.
        if (this._namestaj.filter(function (el) { return el.sifra == namestaj.sifra; }).length > 0) {
            console.log("Vec postoji namestaj sa tom siform!"); //Ispisi poruku o gresci
            console.log("Dodavanje nije uspesno!");
            return; //Prekini izvrsavanje metode
        }
        //Ukoliko se for petlja izvrsila, a nije prekinuto izvrsavanje metode, to znaci da ne postoji namestaj sa tom
        //sifrom u nizu namestaja, tako da ga dodajemo u niz:
        this._namestaj.push(namestaj);
    };
    Salon.prototype.prodajKomad = function (sifra, kolicina) {
        var nizSaJednimElementom = this._namestaj.filter(function (el) { return el.sifra == sifra; });
        if (nizSaJednimElementom.length > 0) {
            var n = nizSaJednimElementom[0];
            if (n.kolicinaUMagacinu <= kolicina) {
                console.log("Prodaja nije uspesna! Nema dovoljno komada namestaja u magacinu!"); //Ukoliko nema ispisujemo poruku o gresci.
                return; //Prekidamo izvrsavanje metode
            }
            else {
                n.kolicinaUMagacinu -= kolicina; //kolicinuUMagacinu smanjujemo za kupljenu kolicinu					
                //Ispisujemo poruku o prodaji
                console.log("Uspesno ste kupili " + kolicina + " namestaja " + n.naziv + " za " + (kolicina * n.jedinicnaCena) + "RSD!");
                return; //Prekidamo izvrsenje metode kao uspesno
            }
        }
        //Ukoliko for petlja nije pronasla komad namestaj, ispisujemo poruku o gresci
        //Posto koristimo return u gornjem kodu, do ovog koda je moguce doci samo ako ne postoji komad namestaja sa 
        //prosledjenom sifrom
        console.log("Ne postoji namestaj sa tom sifrom!");
    };
    Object.defineProperty(Salon.prototype, "naziv", {
        //Geteri i seteri
        get: function () {
            return this._naziv;
        },
        set: function (value) {
            this._naziv = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Salon.prototype, "adresa", {
        get: function () {
            return this._adresa;
        },
        set: function (value) {
            this._adresa = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Salon.prototype, "telefon", {
        get: function () {
            return this._telefon;
        },
        set: function (value) {
            this._telefon = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Salon.prototype, "namestaj", {
        get: function () {
            return this._namestaj;
        },
        set: function (value) {
            this._namestaj = value;
        },
        enumerable: true,
        configurable: true
    });
    return Salon;
}());
var n1 = new Namestaj(111, "Ester Komoda", 50386.50, 15);
var n2 = new Namestaj(123, "Rita Lezaj", 41127.12, 5);
var n3 = new Namestaj(143, "Fiona Lezaj", 41127.12, 0);
var n4 = new Namestaj(144, "Kloe Klub Sto", 20241, 2);
var s = new Salon("Simpo", "Bulevar Oslobodjenja BB", "021/000111");
s.namestaj = [n1, n2, n3, n4];
s.ispisiNamestajNaStanju();
s.dodajNaLager(3, 144);
s.ispisiNamestajNaStanju();
var n5 = new Namestaj(254, "Fira Klub Sto", 30360.83, 11);
s.dodajNamestaj(n5);
n5.sifra = 5;
s.dodajNamestaj(n5);
s.prodajKomad(111, 20);
s.prodajKomad(111, 11);
s.ispisiNamestajNaStanju();
//# sourceMappingURL=app.js.map