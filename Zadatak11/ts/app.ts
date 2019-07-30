class Namestaj {
	private _sifra: number;
	private _naziv: string;
	private _jedinicnaCena: number;
	private _kolicinaUMagacinu: number;


	constructor(sifra: number, naziv: string, jedinicnaCena: number, kolicinaUMagacinu: number) {
		this._sifra = sifra;
		this._naziv = naziv;
		this._jedinicnaCena = jedinicnaCena;
		this._kolicinaUMagacinu = kolicinaUMagacinu;
	}

	//Geteri i seteri
	public get sifra(): number {
		return this._sifra;
	}

	public get naziv(): string {
		return this._naziv;
	}

	public get jedinicnaCena(): number {
		return this._jedinicnaCena;
	}

	public get kolicinaUMagacinu(): number {
		return this._kolicinaUMagacinu;
	}

	public set sifra(value: number) {
		this._sifra = value;
	}

	public set naziv(value: string) {
		this._naziv = value;
	}

	public set jedinicnaCena(value: number) {
		this._jedinicnaCena = value;
	}

	public set kolicinaUMagacinu(value: number) {
		this._kolicinaUMagacinu = value;
	}
}

class Salon {
	private _naziv: string;
	private _adresa: string;
	private _telefon: string;
	private _namestaj: Namestaj[];

	constructor(naziv: string, adresa: string, telefon: string) {
		this._naziv = naziv;
		this._adresa = adresa;
		this._telefon = telefon;
		//Novi salon namestaja nece imati namestaje, ali zelimo da mozemo da dodajemo namestaj u niz
		//zbog toga inicijalizujemo niz namestaja na prazan niz
		this._namestaj = [];
	}

	public ispisiNamestajNaStanju(): void {
		this._namestaj.forEach((el, i)=>{
			//Posto zelimo da ispisemo samo namestaj koji imamo na stanju, proveravamo da li je kolicinaUMagacinu > 0, ako jeste ispisujemo (tj. nudimo kupcu proizvod za kupovinu)
			if(el.kolicinaUMagacinu > 0){
				console.log((i + 1) + ". " + el.sifra + " " + el.naziv + " " + el.kolicinaUMagacinu + " " + el.jedinicnaCena);
			}
		});
		console.log(" "); //Kako bi imali prazan izmedju dva ispisa
	}

	public dodajNaLager(sifra: number, kolicina: number): void {
		let nizSaJednimElementom: Namestaj[] = this._namestaj.filter(el => el.sifra == sifra);
		//Ukoliko ne postoji element sa navedenom sifrom, filter ce nam vratiti prazan niz
		if(nizSaJednimElementom.length > 0) //Ukoliko je pronasao element, zelimo da povecamo kolicinu na lageru
			nizSaJednimElementom[0].kolicinaUMagacinu += kolicina; //Posto je sifra jedinstvena, ako postoji element sa navedenom sifrom filter ce uvek vracati niz sa jednim elementom, a njemu pristupamo sa indekskom 0 
	}

	public dodajNamestaj(namestaj: Namestaj): void {
		//Ukoliko duzina niza kojeg smo dobili sa filterom je veca od 0, to znaci
		//da postoji element sa prosledjenom sifrom.
		if(this._namestaj.filter(el => el.sifra == namestaj.sifra).length > 0){
			console.log("Vec postoji namestaj sa tom siform!") //Ispisi poruku o gresci
			console.log("Dodavanje nije uspesno!")
			return; //Prekini izvrsavanje metode
		}
		//Ukoliko se for petlja izvrsila, a nije prekinuto izvrsavanje metode, to znaci da ne postoji namestaj sa tom
		//sifrom u nizu namestaja, tako da ga dodajemo u niz:
		this._namestaj.push(namestaj); 
	}

	public prodajKomad(sifra: number, kolicina: number): void {
		let nizSaJednimElementom: Namestaj[] = this._namestaj.filter(el => el.sifra == sifra);
		if(nizSaJednimElementom.length > 0) {
			let n: Namestaj = nizSaJednimElementom[0];
			if(n.kolicinaUMagacinu <= kolicina){ //Proveravao da li ima dovoljno komada namestaja za prodaju
				console.log("Prodaja nije uspesna! Nema dovoljno komada namestaja u magacinu!"); //Ukoliko nema ispisujemo poruku o gresci.
				return;//Prekidamo izvrsavanje metode
			} else { //Ukoliko ima dovoljno komada namestaja u magacinu
				n.kolicinaUMagacinu -= kolicina; //kolicinuUMagacinu smanjujemo za kupljenu kolicinu					
				//Ispisujemo poruku o prodaji
				console.log("Uspesno ste kupili " + kolicina + " namestaja " + n.naziv + " za " + (kolicina*n.jedinicnaCena) + "RSD!");
				return; //Prekidamo izvrsenje metode kao uspesno
			}
		}
		//Ukoliko for petlja nije pronasla komad namestaj, ispisujemo poruku o gresci
		//Posto koristimo return u gornjem kodu, do ovog koda je moguce doci samo ako ne postoji komad namestaja sa 
		//prosledjenom sifrom
		console.log("Ne postoji namestaj sa tom sifrom!");
	}

	//Geteri i seteri
	public get naziv(): string {
		return this._naziv;
	}

	public set naziv(value: string) {
		this._naziv = value;
	}

	public get adresa(): string {
		return this._adresa;
	}

	public set adresa(value: string) {
		this._adresa = value;
	}

	public get telefon(): string {
		return this._telefon;
	}

	public set telefon(value: string) {
		this._telefon = value;
	}

	public get namestaj(): Namestaj[] {
		return this._namestaj;
	}

	public set namestaj(value: Namestaj[]) {
		this._namestaj = value;
	}

}

let n1: Namestaj = new Namestaj(111, "Ester Komoda", 50386.50, 15);
let n2: Namestaj = new Namestaj(123, "Rita Lezaj", 41127.12, 5);
let n3: Namestaj = new Namestaj(143, "Fiona Lezaj", 41127.12, 0);
let n4: Namestaj = new Namestaj(144, "Kloe Klub Sto", 20241, 2);

let s: Salon = new Salon("Simpo", "Bulevar Oslobodjenja BB", "021/000111");
s.namestaj = [n1, n2, n3, n4];
s.ispisiNamestajNaStanju();

s.dodajNaLager(3, 144);

s.ispisiNamestajNaStanju();

let n5: Namestaj = new Namestaj(254, "Fira Klub Sto", 30360.83, 11);
s.dodajNamestaj(n5);

n5.sifra = 5;
s.dodajNamestaj(n5);

s.prodajKomad(111, 20);

s.prodajKomad(111, 11);
s.ispisiNamestajNaStanju();

