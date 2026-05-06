# Balsošanas un aptauju lietotne

---

## Sistēmas palaišanas vadlīnijas

### Priekšnosacījumi

- PHP 8.2 vai jaunāks
- Composer
- Node.js 18 vai jaunāks
- Node Package Manager (npm)

### Pirmreizējā uzstādīšana

```bash
cd backend
composer run setup
```

Šī komanda automātiski instalē atkarības, izveido `.env` failu, ģenerē lietotnes atslēgu, veic datu bāzes migrācijas un uzbūvē frontend.

### Palaist programmu

```bash
# 1. terminālī — backend
cd backend
php artisan serve

# 2. terminālī — frontend
cd frontend
npm run dev
```

Pēc palaišanas lietotne pieejama: `http://localhost:5173`  
API pieejams: `http://127.0.0.1:8000` (nav vizuālās daļas)

### Datu bāzes migrācijas

```bash
cd backend
php artisan migrate
```

### Testa (dummy) datu izveidošana

```bash
cd backend
php artisan db:seed --class=DummyPollSeeder
```

---

## Sistēmas izstrādes rīku saraksts

### Backend

| Rīks            | Versija | Mērķis |
|-----------------|---------|--------|
| PHP             | 8.3.16  | Servera programmēšanas valoda |
| Laravel         | 12      | PHP tīmekļa ietvars (REST API) |
| Laravel Sanctum | 4.3.1   | Tokenu autentifikācija |
| MySQL           | 8.4.3   | Datu bāze (izstrādes vidē) |
| Composer        | 2.9.3   | PHP pakotņu pārvaldnieks |

### Frontend

| Rīks         | Versija | Mērķis                                  |
|--------------|---------|-----------------------------------------|
| React        | 19.2.3  | Lietotāja saskarnes bibliotēka          |
| Vite         | 7.3.1   | Frontend būvēšanas rīks un dev serveris |
| Tailwind CSS | 4.1.18  | Utility-first CSS framework             |
| Axios        | 1.13.6  | HTTP pieprasījumu bibliotēka            |
| React Router | 7.13.0  | Klienta puses maršrutēšana              |
| Node.js      | 22.14.0 | JavaScript izpildes vide                |
| npm          | 10.9.2  | JavaScript pakotņu pārvaldnieks         |


---

## Funkcijas

### Lietotāju iespējas
- Reģistrēšanās / Pieteikšanās
- Aptauju veidošana (nosaukums, apraksts un citas opcijas)
- Vienas vai vairākas izvēles aptaujas
- Obligāti jautājumi
- Aptaujas ilguma iestatīšana
- Aptauju kopīgošana ar saitēm (URL)
- Reāllaika rezultāti
- Iespēja slēpt rezultātus līdz balsošanas beigām
- Balsošanas ierobežošana (piemēram, 1 balss no lietotāja)
- Datu eksportēšana

### Administratora iespējas
- Administrācijas panelis
- Visas lietotāju iespējas
