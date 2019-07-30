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

class Pas {
    private _ime: string;
    private _starost: number;
    private _vakcinisan: boolean;
    private _rasa: string;

    constructor(ime: string = "Dzeki", starost: number = 1, vakcinisan: boolean = false, rasa: string = "Dodž") {
        this._ime = ime;
        this._starost = starost;
        this._vakcinisan = vakcinisan;
        this._rasa = rasa;
	}

	public get ime(): string {
		return this._ime;
	}

	public get starost(): number {
		return this._starost;
	}

	public get vakcinisan(): boolean {
		return this._vakcinisan;
	}

	public get rasa(): string {
		return this._rasa;
	}

	public set ime(value: string) {
		this._ime = value;
	}

	public set starost(value: number) {
		this._starost = value;
	}

	public set vakcinisan(value: boolean) {
		this._vakcinisan = value;
	}

	public set rasa(value: string) {
		this._rasa = value;
    }
    
    public vakcinisi(): void {
        this._vakcinisan = true;
    }

    public ispisiStarost(): void {
        console.log(this._starost * 7);
    }

    public ispisiSve(): void {
        console.log(`Ime: ${this._ime} \nStarost: ${this._starost}\n` +
                    `Vakcinisan: ${ (this._vakcinisan) ? "Da" : "Ne" }\n`+
                    `Rasa: ${this._rasa}`);
    }
}


class Kennel {
    private _naziv: string;
    private _adresa: string;
    private _psi: Pas[];

    constructor(naziv: string, adresa: string){
        this._naziv = naziv;
        this._adresa = adresa;
        this._psi = []; //U konstruktoru nije potrebeno da dajemo niz pasa kao parametar, jer ocekujemo da novi objekat nece imati pse
    }

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
    
	public get psi(): Pas[] {
		return this._psi;
	}

	public set psi(value: Pas[]) {
		this._psi = value;
	}

    public dodajPsa(value: Pas): void {
        this._psi.push(value);
    }

	public pronadjiNajstarijeg(): Pas {
		//Ono sto je u return callback funkcije reduca ce biti prev parametar u sledecem callbacku, a poslednji callback
		//ce biti rezultat reduca. Tu osobinu mozemo da iskoristimo kako bi iz callback-a u callback slali objekat Pas
		//cija je starost najveca, tj najstarijeg psa. I kao poslednji return vratice nam objekat psa cija je starost najveca.
		return this._psi.reduce((prev, elem) => {
			if(prev.starost >= elem.starost){
				return prev;
			}else{
				return elem;
			}
		});
	}

	public pronadjiNajmladjeg(): Pas {
		//Ima smisla da pretrazujemo niz pasa samo ako postoje psi u njemu
		return this._psi.reduce((prev, elem) => {
			if(prev.starost <= elem.starost){
				return prev;
			}else{
				return elem;
			}
		});
	}

	public vakcinisani(): void {
		for(let i = 0; i < this._psi.length; i++){
			if(this._psi[i].vakcinisan) //Ako je pas vakcinisan, ispisujemo njegoo ime
				console.log(this._psi[i].ime);
		}
	}
}


let p1 = new Pas("Vucko", 1, false, "Sarplaninac");
let p2 = new Pas("Lajka", 3, true, "Mongrel-Husky-Terrier");
let p3 = new Pas();
let p4 = new Pas("Lesi", 5, true, "Skotski ovcar");
let p5 = new Pas("Beethoven", 2, true, "Bernardinac");
let p6 = new Pas("Snoopy", 68, true, "Dodž");
let p7 = new Pas("Scooby Doo", 48, true, "Nemacka doga");

let k = new Kennel("Kennel", "Adressa Kennela");
k.psi = [p1, p2, p3, p4, p5, p6, p7];

console.log("-------------------Najmladji----------------")
let pNM = k.pronadjiNajmladjeg();
console.log(`Najmladji: ${pNM.ime} (${pNM.starost})`);
pNM.ispisiStarost();
console.log("-------------------Najstariji----------------")
let pNS = k.pronadjiNajstarijeg();
console.log(`Najsatriji: ${pNS.ime} (${pNS.starost})`);
pNS.ispisiStarost();
console.log("-------------------Vakcinisani----------------")
k.vakcinisani();

console.log("-------------------Vakcinisani 2----------------")
p3.vakcinisi();
k.vakcinisani();
