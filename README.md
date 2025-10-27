# Individuell examination - Kundtjänstbot TechNova AB

## Instruktioner

Du ska utveckla en AI-baserad kundsupportassistent för ett fiktivt företag som säljer teknikprodukter online.
Assistenten ska kunna svara på kundfrågor om produkter, leveranser och garantier genom att hämta information från företagets FAQ- och policydokument. Se bifogad textfil på Azomo för företagets FAQ-och policydokument.

## Kravspecifikation

- Det ska finnas ett gränssnitt för skriva till kundtjänstboten och ställa frågor.
- Kundtjänstboten ska komma ihåg vad som skrivits i tidigare meddelanden (dock inget krav på att komma ihåg tidigare sessioner etc).
- Kundtjänstboten ska kunna svara på frågor kring företagets FAQ-och policydokument.
- Kundtjänstboten ska ifall den använder information från företagets FAQ- och policydokument för att svara på kundens fråga visa i sitt svar vilka delar från företagets FAQ- och policydokument som ligger till grund för detta svar.
- Kundtjänstboten ska enbart kunna svara på frågor om TechNova AB, produkter, leveranser, garantier samt info från företagets FAQ-och policydokument. Det ska alltså inte kunna gå och fråga "Vad är Javascript?", då ska ett vänligt svar ges att jag kan inte svara på en sådan fråga.

## Tekniska krav

**Du kan bygga denna examination antingen som enbart en React-app (och då med `npm i @langchain/core@0.3.77 @langchain/community@0.3.57`) eller som en fullstack-applikation då Langchain.js istället finns i ett Express.js API.**

- React
- Langchain.js
  - PromptTemplates (och eller ChatPromptTemplates)
  - RunnableSequence (med eller utan RunnablePassThrough)
  - Retreiver-funktion för Vektordatabasen
- Ollama
- Supabase

## Betygskriterier

**För Godkänt:**

- Uppfyller alla funktionella och tekniska krav

**För Väl Godkänt:**

- Du ska ha delat upp din kod så att Langchain.js är skilt från dina React-komponenter (alltså egna JS-filer för kedjor, templates etc).
- Du ska ha implementerat en passande funktion som finns i Langchain.js som inte har gåtts igenom under kursen (här får du läsa dokumentationen och välja fritt). Skriv några rader i din README varför du valde just denna funktion.
