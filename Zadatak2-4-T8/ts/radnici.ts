let radnici: Radnik[];

//Na osnovu podataka iz teksta zadatka zakljucujemo koje atribute i metode ima klasa radnik
class Radnik {
	name: string;
	godine: number;
	osnovica: number;

	constructor(ime: string, godine: number, osnovica: number){
		this.name = ime;
		this.godine = godine;
		this.osnovica = osnovica;
	}

	get plata(): number {
		return this.osnovica;
	}

	godinaRodjenja(): number {
		//Da bi dobili godinu rodjenja treba nam trenutna godina 
		let datum: Date = new Date(); //Trenutni datum
		let trenutnaGodina = datum.getFullYear(); //Trenutna godina
		return trenutnaGodina - this.godine;
	}
}

class Tehnicar extends Radnik{ //Tehnicareva plata je osnovica - to znaci da nemoramo da redefinisemo roditeljski geter za platu
	constructor(ime: string, godine: number, osnovica: number){
		super(ime, godine, osnovica);
	}
}

class Inzenjer extends Radnik{
	constructor(ime: string, godine: number, osnovica: number){
		super(ime, godine, osnovica);
	}

	get plata(): number { //Plata inzenjera je osnovica + 12% - zbog cega redefinisemo geter za platu
		return this.osnovica * 1.12;
	}
}

class Doktor extends Radnik{
	constructor(ime: string, godine: number, osnovica: number){
		super(ime, godine, osnovica);
	}

	get plata(): number {
		return (this.osnovica * 0.13) + this.osnovica;
	}
}

let o1 = new Tehnicar("Pera", 23, 100);
let o2 = new Inzenjer("Mika", 29, 100);
let o3 = new Doktor("Doca", 35, 100);

radnici = [o1, o2, o3];

console.log(o1.name + " " + o1.plata);
console.log(o2.name + " " + o2.plata);
console.log(o3.name + " " + o3.plata);

//Zadatak 3
function srednjaVrednost(radnici: Radnik[]){
	return radnici.reduce((pr, el, i, arr) => pr + (el.godine / arr.length),0);
}
let prosek: number = srednjaVrednost(radnici);
console.log(prosek);

//Zadatak 4
radnici.forEach((elem) => {
	console.log(`Godina rodjenja za radnika ${elem.name} je ${elem.godinaRodjenja()}`);
});