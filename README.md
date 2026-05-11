# BookExplorer

Aplicație web pentru căutarea și explorarea cărților.

## Student

| | |
|---|---|
| **Nume Prenume** | Simion Ștefan-Teofil |
| **Grupa** | 1147 |

## Linkuri

| Resursă | URL |
|---------|-----|
| **Aplicație publicată (website)** | [https://proiect-cloud-ss.vercel.app/](https://proiect-cloud-ss.vercel.app/) |
| **Repository GitHub** | [https://github.com/stefsimion/proiect_cloud_ss](https://github.com/stefsimion/proiect_cloud_ss) |
| **Link Video** | [https://www.youtube.com/watch?v=KmN6E5M9BAU](https://www.youtube.com/watch?v=KmN6E5M9BAU) |
---

## 1. Introducere

În cadrul acestui proiect a fost realizată aplicația web **BookExplorer**, o platformă destinată utilizatorilor care doresc să caute rapid informații despre cărți și resurse gratuite disponibile online.

Aplicația utilizează două servicii cloud accesate prin intermediul API-urilor REST:

- **Open Library API**
- **Gutendex API**

Scopul aplicației este de a centraliza informații despre cărți într-o singură interfață modernă și ușor de utilizat. Utilizatorul poate introduce un cuvânt cheie sau numele unei cărți, iar aplicația afișează informații relevante precum:

- titlul cărții
- autorul
- anul publicării
- coperta cărții
- link-uri către cărți gratuite disponibile online

Frontend-ul aplicației a fost realizat folosind **React**, iar backend-ul folosind **Node.js** și **Express**.

Aplicația comunică cu serviciile externe prin request-uri HTTP și procesează datele obținute înainte de afișarea lor către utilizator.

---

## 2. Descriere problemă

În prezent există foarte multe surse online pentru căutarea cărților și materialelor educaționale, însă informațiile sunt dispersate pe mai multe platforme.

Utilizatorii trebuie de multe ori să caute separat:

- informații despre o carte
- imagini sau coperte
- materiale gratuite
- link-uri pentru citire online

Problema identificată este lipsa unei aplicații simple care să combine aceste informații într-un singur loc.

Aplicația **BookExplorer** rezolvă această problemă prin integrarea mai multor servicii cloud și prin afișarea rezultatelor într-o manieră clară și accesibilă.

Prin intermediul acestei aplicații, utilizatorii pot economisi timp și pot găsi mai rapid resurse utile pentru studiu sau lectură.

---

## 3. Descriere API

În cadrul aplicației au fost utilizate două API-uri REST externe.

### 3.1 Open Library API

Open Library API este un serviciu cloud care oferă acces la o bază de date vastă de cărți și autori.

API-ul este utilizat pentru obținerea următoarelor informații:

- titlul cărții
- autor
- anul publicării
- coperta cărții

**Endpoint utilizat**

```http
GET https://openlibrary.org/search.json?q={book}
```

**Exemplu request**

```text
https://openlibrary.org/search.json?q=harry+potter
```

**Exemplu response**

```json
{
  "title": "Harry Potter and the Philosopher's Stone",
  "author_name": ["J.K. Rowling"],
  "first_publish_year": 1997
}
```

### 3.2 Gutendex API

Gutendex API oferă acces la cărți gratuite din proiectul Gutenberg.

Acest API este utilizat pentru:

- cărți gratuite
- link-uri de citire
- link-uri de descărcare

**Endpoint utilizat**

```http
GET https://gutendex.com/books/?search={book}
```

**Exemplu request**

```text
https://gutendex.com/books/?search=psychology
```

**Exemplu response**

```json
{
  "title": "Psychology",
  "authors": [{ "name": "Author Name" }]
}
```

---

## 4. Flux de date

Fluxul aplicației este următorul:

1. Utilizatorul introduce numele unei cărți în interfața web.
2. Frontend-ul trimite un request către backend.
3. Backend-ul procesează request-ul și apelează Open Library API.
4. Backend-ul apelează apoi Gutendex API.
5. Datele primite sunt procesate și combinate.
6. Backend-ul trimite rezultatul către frontend.
7. Frontend-ul afișează informațiile într-o interfață grafică.

### Exemple Request / Response

**Request către backend**

```http
GET /api/books/harrypotter
```

**Response backend**

```json
{
  "openLibrary": [
    {
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "year": 1997
    }
  ],
  "gutendex": [
    {
      "title": "Free Book Example",
      "author": "Unknown"
    }
  ]
}
```

### Metode HTTP utilizate

În cadrul aplicației este utilizată metoda:

- **GET** — pentru obținerea informațiilor despre cărți de la serviciile externe.

### Autentificare și autorizare

API-urile utilizate în cadrul proiectului sunt publice și nu necesită:

- autentificare
- token
- API KEY

Acest lucru simplifică integrarea serviciilor și dezvoltarea aplicației.

---

## 5. Capturi ecran aplicație

- **Pagina principală** — interfața la încărcare.
<img width="1920" height="368" alt="image" src="https://github.com/user-attachments/assets/2084fa1a-f7c4-47be-b0c3-f8d7fd902ef9" />

- **Rezultate căutare** — afișarea rezultatelor Open Library și Gutendex după o căutare.
<img width="1195" height="811" alt="image" src="https://github.com/user-attachments/assets/39eae17e-3832-4c7b-be5d-e4e7b65858b0" />

---

## 6. Tehnologii utilizate

**Frontend**

- React
- CSS
- Axios

**Backend**

- Node.js
- Express.js

**Platforme publicare**

- **Vercel** — frontend (React)
- **Render** — backend (API Express)

---

## 7. Concluzii

În urma realizării acestui proiect au fost utilizate concepte importante din dezvoltarea aplicațiilor web moderne:

- comunicarea prin API REST
- integrarea serviciilor cloud
- dezvoltarea frontend-backend
- procesarea datelor externe
- publicarea aplicației online

Aplicația **BookExplorer** demonstrează modul în care mai multe servicii externe pot fi integrate într-o singură platformă pentru a oferi utilizatorului o experiență simplă și eficientă.

---

## 8. Referințe

- [Open Library API](https://openlibrary.org/developers/api)
- [Gutendex API](https://gutendex.com/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Node.js](https://nodejs.org/)
