# STREET ALERT

## Descrizione del progetto
### Panoramica del progetto
Street Alert e' una web app finalizzata per risolvere vari problemi stradali, ad esempio, buche strsegnaladali, etica mancante, semafori non funzionanti, e segnalarli al relativo comune, esso sara' in grado di visualizzare tutte le segnalazioni tramite l'apposita interfaccia designata.

### Descrizione dettagliata
L'area predisposta per gli utienti e' suddivisa in 3 parti:
- Mappa: In questa sezione e' presente una mappa con tutte le segnalazioni all'interno del database, per visualizzare ulteriori informazioni a riguardo di una segnalazione bastera' cliccare il marker sulla mappa

<img src="https://i.ibb.co/dLmS0bB/Immagine-2024-05-27-181331.png" alt="Immagine-2024-05-27-181331" border="0">

<img src="https://i.ibb.co/XktjdMc/Immagine-2024-05-27-182840.png" alt="Immagine-2024-05-27-182840" border="0">

- Area Utente: In questa pagina vengono visualizzati i dati di accesso dell'utente e lo storico delle segnalazioni effettuate

<img src="https://i.ibb.co/d4Rx047/Immagine-2024-05-27-181809.png" alt="Immagine-2024-05-27-181809" border="0">

- Segnalazione: Questa pagina e' dedicata per l'invio di una nuova segnalazione

<img src="https://i.ibb.co/WDCM2vV/Immagine-2024-05-27-182335.png" alt="Immagine-2024-05-27-182335" border="0">

Una volta segnalato il problema, all'interno dell'interfaccia dei comuni e' presente una tabella contenente tutte le segnalazioni con i relativi stati della segnalazione evidenziati con 3 diversi colori:
- **NEW** (Rosso): Segnalazione inviata e non presa in carico
- **SEEN** (Giallo): Segnalazione inviata e presa in carico
- **SOLVED** (Verde): Segnalazione risolta

## Architettura del progetto
### Descrizione dell'architettura
Il progetto si basa sull'architettura client/server, sia lato WEB-APP, sia lato interfaccia comuni:

- **Client**: Il client rappresenta l'applicazione con la quale l'utente/operatore interagisce
- **Server**: Il server si occupa di gestire le richieste del client
- **Database**: Il database contiene tutte le segnalazioni di tutti gli utenti

## Implementazione
### Linguaggi di programmazione e librerie utilizzate
Client:
- **JavaScript**
- **MapTiler**
- **Leaflet**
Server:
- **PHP**
Database:
- **MySQL**

