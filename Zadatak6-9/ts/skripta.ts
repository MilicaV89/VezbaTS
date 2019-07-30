let studenti: Student[] = [];

class Predmet {
    constructor(public id: number, public naziv: string, public profesor: string, public ocena: number) { }
}

class Student {
    private _ime: string;
    private _prezime: string;
    private _fakultet: string;
    private _brojIndeksa: string;
    private _prosecnaOcena: number;
    private _polozeniPredmeti: Predmet[];

    constructor(ime: string, prezime: string, fakultet: string, brojIndeksa: string) {
        this._ime = ime;
        this._prezime = prezime;
        this._fakultet = fakultet;
        this._brojIndeksa = brojIndeksa;
        this._prosecnaOcena = 0;
        this._polozeniPredmeti = [];
    }

    public get ime(): string {
        return this._ime;
    }

    public set ime(value: string) {
        this._ime = value;
    }

    public get prezime(): string {
        return this._prezime;
    }

    public set prezime(value: string) {
        this._prezime = value;
    }

    public get fakultet(): string {
        return this._fakultet;
    }

    public set fakultet(value: string) {
        this._fakultet = value;
    }

    public get brojIndeksa(): string {
        return this._brojIndeksa;
    }

    public set brojIndeksa(value: string) {
        this._brojIndeksa = value;
    }

    public get prosecnaOcena(): number {
        return this._prosecnaOcena;
    }

    public set prosecnaOcena(value: number) {
        this._prosecnaOcena = value;
    }

    public get polozeniPredmeti(): Predmet[] {
        return this._polozeniPredmeti;
    }

    public set polozeniPredmeti(value: Predmet[]) {
        this._polozeniPredmeti = value;
        this.izracunajProsecnuOcenu();
    }

    public dodajPredmet(predmet: Predmet): void {
        this.polozeniPredmeti.push(predmet);
        this.izracunajProsecnuOcenu();
    }

    public predstaviSe(): string {
        return `Ja sam ${this._ime} ${this._prezime}, student ${this._fakultet}-a sa prosecnom ocenom ${this._prosecnaOcena}`;
    }

    public izracunajProsecnuOcenu(): void {
        this._prosecnaOcena = this._polozeniPredmeti.reduce((prev, el, index, array) => prev + (el.ocena/array.length), 0);
    }

    public omiljeniProfesori(): string[] {
        //Pronalazimo prvo predmete kod kojih student ima ocenu 11
        //i sa map funkcijom vracamo samo niz imena profesora
        return this._polozeniPredmeti.filter(el => el.ocena == 11)
                                     .map(el => el.profesor);
    }

}

function devetke(studenti: Student[]): Student[] {
    /*
    //Sa reduce-om, losije resenje
    return studenti.filter(el => {
        //koristimo reduce da izracunamo broj devetki
        let brojDevetki = el.polozeniPredmeti.reduce((prev, el) => {
            if(el.ocena == 9){
                return prev + 1;
            }else{
                return prev;
            }
        }, 0);
        //Zadrzavamo studenta, ukoliko ima barem 3 devetke
        return brojDevetki >= 3;
    });
    */
   //Sa dva filtera
   return studenti.filter(el => {
       let brojDevetki = el.polozeniPredmeti.filter(el => el.ocena == 9).length;
       return brojDevetki >= 3;
   });
}

function dugmePredstavi(): void {
    let tekst: HTMLDivElement = document.querySelector("#tekst") as HTMLDivElement;
    tekst.innerHTML = "";
    for (let x in studenti) {
        tekst.innerHTML += studenti[x].predstaviSe() + "<br/>";
    }

}

function dugmeDevetke(): void {
    let tekst: HTMLDivElement = document.querySelector("#tekst") as HTMLDivElement;
    tekst.innerHTML = "";
    let s: Student[] = devetke(studenti);
    for (let x in s) {
        tekst.innerHTML += s[x].predstaviSe() + "<br/>";
        console.log(s[x]);
    }
}

function dugmeOmiljeni(): void {
    let tekst: HTMLDivElement = document.querySelector("#tekst") as HTMLDivElement;
    tekst.innerHTML = "";
    for (let x in studenti) {
        if(studenti[x].omiljeniProfesori().length > 0){
            tekst.innerHTML += studenti[x].ime + " " + studenti[x].prezime + "ima omiljene profesore: " + studenti[x].omiljeniProfesori().join(", ") + ". <br/>";
        }
    }
}

function dodaj(forma: HTMLFormElement): void {
    let ime: string = forma.elements["ime"].value;
    let prezime: string = forma.elements["prezime"].value;
    let fakultet: string = forma.elements["fakultet"].value;
    let indeks: string = forma.elements["indeks"].value;
    let predmeti: string = forma.elements["predmeti"].value;

    let noviStudent: Student = new Student(ime, prezime, fakultet, indeks);

    let p: Predmet[] = [];
    let s: string[] = predmeti.split(";");
    for(let k in s){
        let pd: string[] = s[k].split(",");
        let np: Predmet = new Predmet(Number(pd[0].trim()), pd[1].trim(), pd[2].trim(), Number(pd[3].trim()));
        p.push(np);
    }
    noviStudent.polozeniPredmeti = p;
    studenti.push(noviStudent);
}

let s1: Student = new Student("Pera", "Peric", "FTN", "PP-001");
let s1p1: Predmet = new Predmet(1, "Predmet 1", "Profesor Profesorevic", 9);
let s1p2: Predmet = new Predmet(2, "Predmet 2", "Nastavnik Nastavnikovic", 9);
let s1p3: Predmet = new Predmet(3, "Predmet 3", "Predavac Predavacevic", 9);
let s1p4: Predmet = new Predmet(4, "Predmet 4", "Doktor Doktorevic", 10);
s1.polozeniPredmeti = [s1p1, s1p2, s1p3, s1p4];

let s2: Student = new Student("Mika", "Mikic", "FTN", "MM-001");
let s2p1: Predmet = new Predmet(1, "Predmet 1", "Profesor Profesorevic", 11);
let s2p2: Predmet = new Predmet(2, "Predmet 2", "Nastavnik Nastavnikovic", 9);
let s2p4: Predmet = new Predmet(4, "Predmet 4", "Doktor Doktorevic", 11);
s2.polozeniPredmeti = [s2p1, s2p2, s2p4];

let s3: Student = new Student("Ana", "Anaic", "FTN", "AA-001");
let s3p1: Predmet = new Predmet(1, "Predmet 1", "Profesor Profesorevic", 11);
let s3p2: Predmet = new Predmet(2, "Predmet 2", "Nastavnik Nastavnikovic", 10);
s3.dodajPredmet(s3p1);
s3.dodajPredmet(s3p2);

studenti.push(s1, s2, s3);