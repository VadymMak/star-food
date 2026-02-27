"""
UB Market — Fill Romanian (ro.md) blog content for all 12 posts
RUN FROM star-food PROJECT ROOT:
  python fill_ro_blogs.py

Reads `image` from en.md frontmatter, writes full ro.md content.
Content adapted for Romanian market: neighbor of Bulgaria, Danube trade route,
EU member, growing food import market, connection to Black Sea region.
"""

import os
import re

BLOG_DIR = "src/content/blog"


def get_image_from_en(slug):
    """Read image field from en.md frontmatter"""
    en_path = os.path.join(BLOG_DIR, slug, "en.md")
    if not os.path.exists(en_path):
        print(f"  ⚠️  en.md not found for {slug}, using default image")
        return "/images/vegetable-oil.webp"
    with open(en_path, "r", encoding="utf-8") as f:
        content = f.read()
    match = re.search(
        r'^image:\s*["\']?(.+?)["\']?\s*$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return "/images/vegetable-oil.webp"


# ============================================================
# ALL 12 BLOG POSTS — ROMANIAN CONTENT
# ============================================================

posts = {}

# ============================================================
# POST 1: sunflower-oil-wholesale-guide
# ============================================================
posts["sunflower-oil-wholesale-guide"] = {
    "title": "Ghid complet pentru achiziția de ulei de floarea soarelui en gros în Europa",
    "description": "Tot ce trebuie să știți despre achiziția de ulei de floarea soarelui în cantități mari — tipuri, clase de calitate, factori de preț și cum să alegeți un furnizor de încredere.",
    "date": "2026-03-01",
    "tags": '["en gros", "ulei de floarea soarelui", "Europa", "ghid"]',
    "readingTime": 10,
    "body": """## Uleiul de floarea soarelui — cel mai tranzacționat ulei vegetal din Europa

Piața europeană a uleiului de floarea soarelui este estimată la aproximativ **9,36 miliarde USD în 2025**. România, alături de Bulgaria și Ucraina, face parte din principalele țări producătoare din regiunea Mării Negre — ceea ce oferă cumpărătorilor români un avantaj strategic în ceea ce privește accesul la materie primă de calitate.

Pentru achizitorii en gros, înțelegerea structurii pieței, a standardelor de calitate și a lanțurilor de aprovizionare este esențială pentru obținerea celor mai bune prețuri.

## Tipuri de ulei de floarea soarelui

### Ulei rafinat de floarea soarelui

Cel mai frecvent comercializat tip pentru retail și HoReCa. Procesul de rafinare include degumarea, neutralizarea, albirea, dezodorizarea și winterizarea. Rezultatul este un ulei cu gust neutru și punct de ardere ridicat (~230 °C).

**Parametri de calitate conform normelor UE:**
- Acizi grași liberi: max. 0,1%
- Indice de peroxid: max. 10 meq O₂/kg
- Culoare: max. 1,5 (scala Lovibond)
- Umiditate: max. 0,1%

### Ulei brut (nerafinat) de floarea soarelui

Utilizat preponderent ca materie primă pentru rafinării. Păstrează culoarea și gustul natural. Se comercializează în cisterne de 22–25 tone.

### Ulei de floarea soarelui cu conținut ridicat de acid oleic (High-Oleic)

Varianta premium cu un conținut de acid oleic de peste 80%. Stabilitate oxidativă superioară, ideal pentru prăjire industrială și piețe orientate spre sănătate. Cererea crește anual cu 8–12% în Europa de Vest.

## Factori care influențează prețul

**Factori globali:**
- Recoltele din principalele țări producătoare (Ucraina, Rusia, Argentina)
- Cursul de schimb EUR/USD
- Costurile de transport maritim și rutier
- Evoluțiile geopolitice din regiunea Mării Negre

**Factori regionali:**
- Taxele vamale UE și acordurile comerciale
- Fluctuațiile sezoniere ale cererii
- Nivelul stocurilor la procesatorii europeni

**Factori specifici produsului:**
- Gradul de rafinare (brut vs. rafinat)
- Tipul de ambalare (vrac vs. PET)
- Certificări (bio, non-GMO, HACCP)
- Cantitățile minime de comandă

## Opțiuni de ambalare

| Ambalaj | Volum | Utilizare |
|---------|-------|-----------|
| Sticle PET | 0,5 L – 10 L | Retail, HoReCa |
| Bag-in-Box | 10 L – 20 L | Restaurante, cantina |
| Container IBC | 1.000 L | Procesare industrială |
| Cisternă auto | 22.000 – 25.000 L | Rafinării, procesatori |
| Flexitank | 20.000 – 24.000 L | Transport maritim |

## Certificări și asigurarea calității

Pentru piața din România și UE, următoarele certificări sunt esențiale:

- **ISO 22000** — Sistem de management al siguranței alimentare
- **HACCP** — Analiza pericolelor și punctele critice de control
- **IFS Food** — Standard internațional pentru siguranța alimentară
- **Certificare non-GMO** — Tot mai cerută pe piața românească
- **Certificare bio (UE)** — Pentru segmentul organic în creștere

## Logistica livrării în România

România beneficiază de o poziție geografică privilegiată:

- **Vecină directă cu Bulgaria** — transport rutier în 3–6 ore de la Varna
- **Porturile dunărene** (Giurgiu, Galați, Brăila) — acces la transportul fluvial
- **Portul Constanța** — al treilea cel mai mare port la Marea Neagră
- **Rețea de autostrăzi în dezvoltare** — conexiuni îmbunătățite est-vest

**Trasee de livrare de la UB Market (Varna, Bulgaria):**
| Destinație | Distanță | Timp tranzit |
|-----------|----------|-------------|
| București | 380 km | 5–6 ore |
| Constanța | 280 km | 4–5 ore |
| Cluj-Napoca | 780 km | 10–12 ore |
| Timișoara | 650 km | 8–10 ore |

## Întrebări frecvente

**Care sunt prețurile actuale en gros?**
Prețurile variază în funcție de calitate, cantitate și condiții de livrare. Contactați-ne pentru o ofertă personalizată — răspundem în 24 de ore.

**Care este cantitatea minimă de comandă?**
De la 1 palet (~800–1.000 kg) pentru sticle PET, de la 22 tone pentru cisterne.

**Puteți livra direct în România?**
Da, livrăm DAP la orice adresă din România. Ca vecini direcți, timpul de tranzit este minim.

## Următorul pas

UB Market conectează producătorii din Europa de Est cu cumpărătorii en gros din toată Europa. Ca și companie înregistrată în UE, cu sediul în Bulgaria — vecina directă a României — oferim lanțuri de aprovizionare scurte, prețuri competitive și calitate constantă.

[Solicitați oferta dvs. personalizată →](/ro/quote)
"""
}

# ============================================================
# POST 2: sunflower-oil-prices-europe-2026
# ============================================================
posts["sunflower-oil-prices-europe-2026"] = {
    "title": "Prețurile uleiului de floarea soarelui în Europa 2026 — Analiză de piață",
    "description": "Prețuri actualizate pentru uleiul de floarea soarelui en gros în Europa. Tendințe, prognoze și factori care influențează piața în 2026.",
    "date": "2026-03-05",
    "tags": '["prețuri", "ulei de floarea soarelui", "analiză de piață", "2026"]',
    "readingTime": 7,
    "body": """## Situația prețurilor: Ulei de floarea soarelui en gros în Europa

Piața uleiului de floarea soarelui s-a stabilizat după perturbările din 2022–2023. Prețurile se situează semnificativ sub valorile maxime, dar rămân peste nivelul pre-criză.

## Prețuri actuale (T1 2026)

| Produs | FOB Marea Neagră | CIF Europa de Vest | DAP România |
|--------|-----------------|-------------------|-------------|
| Rafinat (vrac) | 850–950 USD/t | 950–1.050 USD/t | 950–1.050 USD/t |
| Brut (vrac) | 780–870 USD/t | 880–970 USD/t | 870–960 USD/t |
| High-Oleic (vrac) | 1.050–1.200 USD/t | 1.150–1.300 USD/t | 1.150–1.280 USD/t |
| Rafinat (1L PET) | 1.100–1.250 USD/t | 1.200–1.350 USD/t | 1.200–1.340 USD/t |

*Notă: Prețurile DAP România sunt mai avantajoase datorită proximității geografice cu Bulgaria.*

## Avantajul României în ceea ce privește prețurile

România beneficiază de condiții favorabile pentru achiziția de ulei de floarea soarelui:

1. **Proximitate cu zona de producție** — Bulgaria și Ucraina sunt vecini direcți
2. **Costuri reduse de transport** — distanțe scurte, transport rutier eficient
3. **Producție internă** — România este ea însăși un producător important (2–2,5 milioane tone semințe/an)
4. **Acces la portul Constanța** — hub pentru importurile din regiunea Mării Negre

## Factori de preț în 2026

### Recolta 2025/2026

Producția globală estimată: 52–54 milioane tone.

- **Ucraina:** Recuperare a producției la 12–13 mil. tone
- **Rusia:** Producție stabilă la 16–17 mil. tone
- **România:** 2–2,5 mil. tone (bun producător european)
- **Bulgaria:** 1,8–2 mil. tone
- **Argentina:** 3,5–4 mil. tone

### Costuri energetice și transport

Prețul combustibililor afectează atât costurile de producție, cât și cele de transport. Proximitatea România-Bulgaria minimizează impactul costurilor de transport.

### Cursul EUR/USD

Uleiul de floarea soarelui se tranzacționează internațional în dolari americani. Un euro mai puternic înseamnă prețuri de import mai avantajoase.

## Prognoze pentru 2026

- Prețuri stabile sau ușor descendente comparativ cu 2025
- Cerere crescută pentru variante High-Oleic
- Presiune de preț din partea exporturilor ucrainene în creștere
- Creștere sezonieră între mai și septembrie

## Cum obțineți cel mai bun preț

1. **Contracte pe termen lung** — Acorduri trimestriale sau anuale pentru stabilitate
2. **Livrare directă din Bulgaria** — Eliminați intermediarii suplimentari
3. **Cantități mai mari** — De la 100 tone/lună, condiții semnificativ mai bune
4. **Condiții FOB** — Mai ieftin dacă aveți propria logistică

## Solicitați o ofertă actualizată

Prețurile pe piața uleiului se schimbă săptămânal. Pentru o cotație actuală, contactați-ne direct.

[Solicitați cotație de preț →](/ro/quote)
"""
}

# ============================================================
# POST 3: how-we-created-star-food-labels
# ============================================================
posts["how-we-created-star-food-labels"] = {
    "title": "Cum au fost create etichetele Star Food — Design și identitate de brand",
    "description": "O privire în culise: cum am colaborat cu un designer profesionist pentru a crea etichetele produselor noastre Star Food.",
    "date": "2026-03-10",
    "tags": '["Star Food", "design", "etichetă", "branding"]',
    "readingTime": 6,
    "body": """## De ce designul etichetelor contează în comerțul alimentar

Pe piața europeană extrem de competitivă a produselor alimentare, ambalajul face adesea diferența între succes și eșec. Studiile arată că achizitorii B2B formează o primă impresie despre un produs în 3–5 secunde. O etichetă proiectată profesional comunică calitate, seriozitate și cunoaștere a pieței.

Pentru UB Market, investiția în designul profesional al etichetelor Star Food a fost o decizie strategică.

## Colaborarea cu un designer profesionist

Pentru dezvoltarea identității vizuale a brandului nostru, am colaborat cu [Anastasiia Kolisnyk — AK Illustrator](https://akillustrator.com), o designer cu experiență în packaging și branding.

## Procesul de design

### Faza 1: Brief și analiză de piață

Împreună cu designerul, am analizat:
- Produsele concurente de pe piața europeană
- Cerințele legale pentru etichetele alimentare în UE
- Psihologia culorilor în sectorul alimentar
- Preferințele vizuale pentru diferite piețe europene (inclusiv România)

### Faza 2: Dezvoltarea conceptului

Au fost elaborate mai multe concepte care au integrat:
- Câmpuri de floarea soarelui ca element vizual principal — natural, proaspăt, de încredere
- Logo-ul Star Food poziționat prominent
- Ierarhie clară a informațiilor pentru etichetarea nutrițională conformă UE
- Tipografie multilingvă (EN, BG, PL, GR, UA)

### Faza 3: Rafinare și producție

După mai multe iterații, a rezultat designul final:
- Paletă caldă de culori cu galben de floarea soarelui și tonuri naturale de verde
- Tipografie clară pentru lizibilitate optimă pe diferite dimensiuni de sticle
- Poziționare conformă UE a tuturor informațiilor obligatorii
- Scalabilitate de la 0,5 litri la 10 litri

## Rezultatul

Etichetele finale transmit exact ceea ce reprezintă Star Food: calitate europeană, procesare profesională și fiabilitate. Ele sunt utilizate astăzi pe toate produsele Star Food în peste 12 țări europene.

## Designul profesional ca investiție

Investiția în design profesional s-a dovedit profitabilă:
- Recunoaștere instantanee a brandului la raft
- Încredere sporită din partea partenerilor de afaceri noi
- Identitate de brand consistentă pe toate liniile de produse
- Prezentare conformă UE a tuturor informațiilor obligatorii

Etichetele noastre au fost create de [Anastasiia Kolisnyk](https://akillustrator.com), un designer profesionist specializat în packaging și branding.

[Aflați mai multe despre produsele noastre →](/ro/products/sunflower-oil)
"""
}

# ============================================================
# POST 4: fob-cif-dap-explained
# ============================================================
posts["fob-cif-dap-explained"] = {
    "title": "FOB, CIF și DAP — Termenii comerciali Incoterms explicați pentru cumpărătorii de alimente",
    "description": "Ce înseamnă FOB, CIF și DAP în comerțul internațional cu alimente? Explicație clară a celor mai importante clauze comerciale.",
    "date": "2026-03-15",
    "tags": '["Incoterms", "FOB", "CIF", "DAP", "comerț"]',
    "readingTime": 7,
    "body": """## Incoterms — Limbajul comerțului internațional

Incoterms (International Commercial Terms) sunt termeni comerciali standardizați care definesc responsabilitățile și riscurile între cumpărător și vânzător. Pentru comerțul en gros cu alimente, trei clauze sunt deosebit de relevante: **FOB**, **CIF** și **DAP**.

## FOB — Free on Board (Franco la Bord)

La condiția FOB, vânzătorul livrează marfa la portul de încărcare convenit. Din acel punct, toate costurile și riscurile trec la cumpărător.

**Responsabilitatea vânzătorului:**
- Producție și control de calitate
- Transport la port/punct de încărcare
- Formalități vamale de export
- Încărcare pe camion/navă

**Responsabilitatea cumpărătorului:**
- Transportul principal (navlu)
- Asigurarea transportului
- Formalități vamale de import
- Descărcare și livrare finală

**Avantaj:** Cel mai mic preț de achiziție — controlați transportul și asigurarea.

## CIF — Cost, Insurance and Freight (Cost, Asigurare și Navlu)

La CIF, vânzătorul preia suplimentar costurile de navlu și asigurarea de transport până la portul de destinație.

**Responsabilitatea vânzătorului:**
- Toate serviciile FOB
- Navlu principal până la portul de destinație
- Asigurare de transport (acoperire minimă ICC-C)

**Responsabilitatea cumpărătorului:**
- Descărcare la portul de destinație
- Formalități vamale de import
- Livrare la depozit

**Avantaj:** Mai puțin efort de coordonare — navlul și asigurarea sunt incluse în preț.

## DAP — Delivered at Place (Livrat la Locul Convenit)

La DAP, vânzătorul livrează marfa până la locul de destinație convenit. Doar descărcarea rămâne în responsabilitatea cumpărătorului.

**Responsabilitatea vânzătorului:**
- Toate serviciile CIF
- Transport până la destinație (depozitul dvs.)
- Toate riscurile pe parcursul tranzitului

**Responsabilitatea cumpărătorului:**
- Descărcare
- Formalități vamale de import (dacă este în afara UE)

**Avantaj:** Confort maxim — livrare „la rampă".

## Tabel comparativ

| Clauză | Responsabilitate vânzător | Responsabilitate cumpărător | Nivel de preț |
|--------|--------------------------|---------------------------|--------------|
| FOB | Până la încărcare + export | Navlu + asigurare + import | Cel mai mic |
| CIF | + Navlu + asigurare | Descărcare + import + livrare | Mediu |
| DAP | Până la depozitul dvs. | Doar descărcare | Cel mai mare |

## Avantajul DAP România — Bulgaria

Fiind vecini direcți, condiția **DAP** pentru livrări din Bulgaria în România este deosebit de avantajoasă:
- Distanțe scurte = costuri reduse de transport
- Fără formalități vamale (ambele sunt în UE)
- Timp de livrare de doar 5–12 ore în funcție de destinație
- Prețul DAP este foarte aproape de prețul FOB

## Recomandarea noastră

Pentru clienții din România, recomandăm **DAP** — primiți un preț total clar, fără costuri ascunse, cu livrare directă la depozitul dumneavoastră.

[Solicitați ofertă cu condiția de livrare preferată →](/ro/quote)
"""
}

# ============================================================
# POST 5: refined-vs-crude-sunflower-oil
# ============================================================
posts["refined-vs-crude-sunflower-oil"] = {
    "title": "Ulei de floarea soarelui rafinat vs. brut — Diferențe și aplicații",
    "description": "Comparație detaliată între uleiul rafinat și cel brut de floarea soarelui. Specificații tehnice, domenii de utilizare și ghid de decizie.",
    "date": "2026-03-20",
    "tags": '["ulei de floarea soarelui", "rafinat", "brut", "calitate"]',
    "readingTime": 8,
    "body": """## Două categorii — o singură materie primă

Uleiul de floarea soarelui se comercializează în două categorii principale: rafinat și brut (crude). Alegerea depinde de scopul utilizării, capacitățile de procesare și cerințele clienților dvs.

## Ulei brut de floarea soarelui (Crude Sunflower Oil)

Se obține prin presare și/sau extracție din semințe de floarea soarelui, cu procesare minimă (filtrare, eventual degummare).

**Specificații tehnice:**
- Acizi grași liberi: 0,5–2,0%
- Indice de peroxid: până la 15 meq O₂/kg
- Culoare: galben închis spre brun
- Umiditate: max. 0,15%
- Conținut de fosfor: 200–800 ppm

**Cumpărători tipici:**
- Rafinării de ulei
- Producători alimentari cu capacitate proprie de rafinare
- Industria furajelor
- Producători de biodiesel

**Volume comerciale:** Preponderent în cisterne auto (22–25 t) sau transport maritim în flexitankuri.

## Ulei rafinat de floarea soarelui

Procesul de rafinare include mai multe etape:

1. **Degummare** — Îndepărtarea fosfolipidelor
2. **Neutralizare** — Reducerea acizilor grași liberi
3. **Albire** — Eliminarea pigmenților și impurităților
4. **Dezodorizare** — Eliminarea mirosurilor și gusturilor
5. **Winterizare** — Eliminarea cerurilor pentru claritate la temperaturi scăzute

**Specificații tehnice (rafinat):**
- Acizi grași liberi: max. 0,1%
- Indice de peroxid: max. 10 meq O₂/kg
- Culoare: galben deschis, limpede
- Punct de ardere: ~230 °C
- Gust: neutru

**Cumpărători tipici:**
- Lanțuri de retail (mărci proprii)
- Restaurante și cantina de masă
- Producători alimentari (panificație, conserve, mâncăruri gata preparate)
- Exportatori de produse finite

## Tabel comparativ

| Caracteristică | Ulei brut | Ulei rafinat |
|---------------|----------|-------------|
| Acizi grași liberi | 0,5–2,0% | max. 0,1% |
| Punct de ardere | ~160 °C | ~230 °C |
| Gust | Pronunțat, de nucă | Neutru |
| Culoare | Galben închis/brun | Galben deschis, limpede |
| Termen de valabilitate | 6–9 luni | 12–18 luni |
| Preț (vrac) | Cu 10–15% mai ieftin | Preț de referință |
| Comandă minimă | 22 t (cisternă) | De la 1 palet |

## Documentația de calitate

Pentru piața românească, documentația este esențială:
- Certificat de analiză (COA)
- Certificat de origine
- Declarație de conformitate non-GMO
- Certificare HACCP/IFS a producătorului
- Raport de analiză a reziduurilor (pesticide, metale grele)

## Recomandarea noastră

Pentru majoritatea cumpărătorilor en gros din România, recomandăm **uleiul rafinat de floarea soarelui**, deoarece poate fi comercializat direct și corespunde așteptărilor de calitate ale consumatorilor finali.

Dacă operați o rafinărie sau achiziționați materie primă pentru procesare, **uleiul brut** oferă un raport preț-calitate semnificativ mai bun.

[Solicitați consultanță personalizată →](/ro/quote)
"""
}

# ============================================================
# POST 6: high-oleic-sunflower-oil-horeca
# ============================================================
posts["high-oleic-sunflower-oil-horeca"] = {
    "title": "Ulei de floarea soarelui High-Oleic pentru HoReCa — Avantaje și utilizări",
    "description": "De ce uleiul High-Oleic este alegerea optimă pentru bucătăriile profesionale. Beneficii pentru sănătate, eficiență economică și proprietăți tehnice.",
    "date": "2026-03-25",
    "tags": '["High-Oleic", "HoReCa", "restaurante", "ulei de prăjit"]',
    "readingTime": 7,
    "body": """## High-Oleic — Alternativa premium pentru bucătării profesionale

Uleiul de floarea soarelui High-Oleic (HOSO) conține peste 80% acid oleic — comparativ cu 20–25% la uleiul convențional. Această proprietate conferă uleiului caracteristici remarcabile pentru utilizarea profesională.

## Profil de acizi grași — comparație

| Acid gras | Convențional | High-Oleic |
|----------|-------------|-----------|
| Acid oleic (C18:1) | 20–25% | 80–90% |
| Acid linoleic (C18:2) | 60–70% | 5–10% |
| Acid palmitic (C16:0) | 6–7% | 3–4% |
| Acid stearic (C18:0) | 3–4% | 3–4% |

## Avantaje pentru sectorul HoReCa din România

### 1. Rezistență mai mare la prăjire

Datorită conținutului ridicat de acid oleic, HOSO este semnificativ mai stabil la oxidare:
- **Durată de utilizare de 2–3 ori mai mare** față de uleiul convențional
- Mai puține schimburi de ulei — economie directă
- Calitate constantă a produselor prăjite pe toată durata de utilizare

### 2. Beneficii pentru sănătate

Profilul favorabil de acizi grași face din HOSO o alternativă mai sănătoasă:
- Conținut mai scăzut de acizi grași polinesaturați
- Conținut mai ridicat de acizi grași mononesaturați (comparabil cu uleiul de măsline)
- Formare redusă de acizi grași trans la prăjire

### 3. Gust neutru

HOSO are un gust și mai neutru decât uleiul rafinat convențional. Produsele prăjite își păstrează gustul propriu.

### 4. Conformitate mai ușoară cu reglementările

În mai multe țări UE, limitele pentru compuși polari în uleiul de prăjire sunt înăsprite. Cu HOSO, atingeți aceste limite mult mai târziu.

## Calcul economic pentru restaurante

| Parametru | Convențional | High-Oleic |
|----------|-------------|-----------|
| Preț per litru | 1,00–1,20 € | 1,40–1,70 € |
| Interval schimb ulei | 3–4 zile | 7–10 zile |
| Costuri anuale ulei* | ~3.800 € | ~2.800 € |
| Efort schimb ulei | Mare | Redus |

*Calcul pentru o friteuză profesională, 5 zile/săptămână*

În ciuda prețului mai mare per litru, HOSO este **mai economic** în calculul total.

## Dimensiuni disponibile

UB Market livrează ulei High-Oleic în următoarele formate:
- Canistre de 10 litri (Bag-in-Box)
- Canistre de 20 litri
- Containere IBC de 1.000 litri
- Vrac (cisternă)

## Trecerea la High-Oleic

Vă consultăm cu plăcere pentru trecerea la ulei High-Oleic și vă oferim o ofertă personalizată bazată pe consumul și cerințele dvs.

[Programați o discuție de consultanță →](/ro/quote)
"""
}

# ============================================================
# POST 7: sunflower-oil-packaging-guide
# ============================================================
posts["sunflower-oil-packaging-guide"] = {
    "title": "Soluții de ambalare pentru ulei de floarea soarelui — De la sticla PET la cisternă",
    "description": "Ghid complet privind opțiunile de ambalare pentru uleiul de floarea soarelui en gros. Avantaje, cerințe UE și costuri.",
    "date": "2026-04-01",
    "tags": '["ambalare", "ulei de floarea soarelui", "PET", "vrac", "logistică"]',
    "readingTime": 7,
    "body": """## Alegerea corectă a ambalajului

Ambalajul influențează nu doar costurile logistice, ci și termenul de valabilitate, manipularea și posibilitățile de comercializare. Acest ghid vă ajută să găsiți soluția optimă.

## Sticle PET (0,5 L – 10 L)

**Utilizare:** Retail, HoReCa, consumatori finali

| Volum | Sticle/palet | Cumpărător tipic |
|-------|-------------|-----------------|
| 0,5 L | 1.920 buc. | Magazine de proximitate |
| 1 L | 1.080 buc. | Supermarketuri |
| 3 L | 480 buc. | Consumatori mari |
| 5 L | 240 buc. | HoReCa, familii |
| 10 L | 88 buc. | Cantina de masă |

**Avantaje:** Comercializare directă, design personalizat de etichetă, termen lung de valabilitate (12–18 luni).

## Bag-in-Box (10 L – 20 L)

**Utilizare:** Restaurante, cantine, catering

Soluție eficientă din punct de vedere al costurilor. Sacul se micșorează pe măsură ce uleiul este folosit, minimizând contactul cu oxigenul.

## Container IBC (1.000 L)

**Utilizare:** Procesare industrială

Container plastic într-un cadru metalic. Stivuibil, reutilizabil, manipulabil cu motostivuitor standard.

## Cisternă auto (22.000 – 25.000 L)

**Utilizare:** Rafinării, procesatori mari, îmbuteliatori

Cea mai economică metodă de transport pentru cantități mari. Cisterne de inox alimentar.

## Flexitank (20.000 – 24.000 L)

**Utilizare:** Transport maritim internațional

Sac de plastic de unică folosință montat într-un container standard de 20 de picioare.

## Cerințe UE pentru materialele de ambalare

- **Regulamentul UE nr. 1935/2004** — Materiale în contact cu alimentele
- **Regulamentul UE nr. 10/2011** — Materiale plastice în contact cu alimentele
- **Etichetare** — Conform Regulamentului UE nr. 1169/2011

## Soluții Private Label

UB Market oferă și soluții Private Label: eticheta dvs., calitatea noastră. Vă asistăm în designul etichetelor conforme UE și alegerea dimensiunii optime.

[Solicitați ofertă Private Label →](/ro/quote)
"""
}

# ============================================================
# POST 8: how-food-trading-works-europe
# ============================================================
posts["how-food-trading-works-europe"] = {
    "title": "Cum funcționează comerțul alimentar în Europa — Ghid practic",
    "description": "De la producător la cumpărător: cum funcționează comerțul internațional cu alimente în UE. Structuri comerciale, reglementare și calitate.",
    "date": "2026-04-05",
    "tags": '["comerț alimentar", "Europa", "UE", "import", "export"]',
    "readingTime": 9,
    "body": """## Structura comerțului alimentar european

Piața alimentară europeană este cea mai mare piață unică din lume — peste 440 de milioane de consumatori și un volum comercial de peste 1,1 trilioane de euro.

## Actorii comerciali

### Producători
Exploatații agricole și companii de procesare. În sectorul uleiului de floarea soarelui, aceștia sunt fabricile de ulei și rafinăriile din Ucraina, Rusia, România, Bulgaria și Argentina.

### Companii comerciale (Traderi)
Companii precum UB Market, care fac legătura între producători și cumpărători. Ele gestionează aprovizionarea, controlul calității, logistica și documentația.

**Valoarea adăugată a unui trader:**
- Acces la o rețea de producători verificați
- Control de calitate înainte de expediere
- Gestionarea documentației de export
- Condiții flexibile de livrare (FOB/CIF/DAP)
- Minimizarea riscurilor prin contractare profesională

### Importatori / Angrosiste
Organizații mari de achiziții care importă și distribuie mai departe.

### Retail și HoReCa
Ultima verigă din lanțul de aprovizionare — produsul ajunge la consumator.

## Reglementarea UE

### Siguranță alimentară
**Regulamentul (CE) nr. 178/2002** — fundamentul legislației alimentare europene. Impune trasabilitatea completă „de la fermă la furculiță".

### Etichetare
**Regulamentul UE nr. 1169/2011** reglementează informațiile obligatorii:
- Denumirea alimentului
- Lista ingredientelor
- Alergeni
- Declarație nutrițională
- Cantitate netă
- Data de durabilitate minimă
- Indicarea originii (pentru anumite produse)

### Documentație comercială
Pentru comerțul intracomunitar:
- Factură comercială
- CMR (scrisoare de trăsură)
- Certificat de analiză (COA)
- Certificat sanitar (pentru anumite produse)
- Certificat de origine

## Avantajul pieței unice

Ca societate înregistrată în Bulgaria (stat membru UE), UB Market beneficiază de:
- Fără formalități vamale în comerțul intracomunitar
- Regimul TVA reverse charge
- Fără taxe vamale sau contingente
- Standarde armonizate de produs

## Colaborarea cu UB Market

Simplificăm comerțul alimentar internațional: de la selecția produselor la controlul calității și livrarea la depozitul dvs.

[Contactați-ne pentru o discuție inițială →](/ro/quote)
"""
}

# ============================================================
# POST 9: food-trading-bulgaria-eu-advantage
# ============================================================
posts["food-trading-bulgaria-eu-advantage"] = {
    "title": "Bulgaria ca platformă comercială UE — Avantaje pentru importul alimentar în România",
    "description": "De ce Bulgaria este un punct strategic pentru comerțul alimentar european. Vecinătatea cu România, membru UE, costuri competitive.",
    "date": "2026-04-10",
    "tags": '["Bulgaria", "România", "UE", "comerț", "avantaj"]',
    "readingTime": 7,
    "body": """## Bulgaria — Puntea Europei spre Est

Bulgaria ocupă o poziție unică în comerțul alimentar european: ca stat membru UE la Marea Neagră, conectează marii producători din Europa de Est cu piețele de consum din vest — și în special cu vecina sa, România.

## Avantaje geografice — perspectiva României

România și Bulgaria împărtășesc nu doar o graniță, ci și o relație comercială intensă:

- **Graniță comună** de peste 600 km, inclusiv granița dunăreană
- **Poduri dunărene** (Giurgiu–Ruse, Calafat–Vidin) — transport rutier și feroviar direct
- **Porturile de la Marea Neagră** — Varna (BG) și Constanța (RO) la doar 280 km distanță
- **Transport rutier** — 3–12 ore în funcție de destinație

**Distanțe de la Varna (Bulgaria) la principalele orașe din România:**
| Oraș | Distanță | Timp de tranzit |
|------|----------|----------------|
| București | 380 km | 5–6 ore |
| Constanța | 280 km | 4–5 ore |
| Craiova | 500 km | 7–8 ore |
| Cluj-Napoca | 780 km | 10–12 ore |
| Timișoara | 650 km | 8–10 ore |
| Iași | 550 km | 7–9 ore |

## Avantajul UE — Comerț fără bariere

Ambele țări fiind membre UE, comerțul bilateral este simplificat la maximum:

### Libera circulație a mărfurilor
Fără controale vamale, fără taxe de import, fără contingente. Produsele din Bulgaria sunt tratate la fel ca cele românești.

### Standarde armonizate
Produsele alimentare conforme cu standardele UE din Bulgaria îndeplinesc automat cerințele pieței românești.

### TVA simplificată
Livrările intracomunitare utilizează mecanismul reverse charge — fără TVA pe factură, cumpărătorul declară TVA în România.

## Avantajul de cost al Bulgariei

Bulgaria oferă costuri operaționale competitive:
- Impozit pe profit: **10%** (cel mai scăzut din UE)
- Costuri salariale: ~30% din media UE
- Costuri logistice și de depozitare mai mici decât în Europa de Vest
- Prețuri competitive la energie

## Bulgaria ca hub pentru ulei de floarea soarelui

Bulgaria produce anual ~2 milioane de tone de semințe de floarea soarelui și dispune de o industrie de procesare performantă. În plus, funcționează ca platformă pentru produsele din regiunea Mării Negre:

- Import direct din Ucraina pe cale rutieră sau maritimă
- Procesare și rafinare în fabricile bulgare
- Re-export ca marfă UE în toate statele membre

## UB Market — Partenerul dvs. din Bulgaria

Ca societate înregistrată în Bulgaria (UB Market LTD, Varna), valorificăm toate aceste avantaje pentru clienții noștri din România:

- Acces direct la producătorii din Europa de Est
- Documentație conformă UE
- Prețuri competitive datorită costurilor operaționale mai mici
- Livrare rapidă — România este prima noastră piață de export

[Aflați mai multe despre serviciile noastre →](/ro/quote)
"""
}

# ============================================================
# POST 10: how-to-choose-food-supplier
# ============================================================
posts["how-to-choose-food-supplier"] = {
    "title": "Cum să alegeți furnizorul alimentar potrivit — 8 criterii pentru achizitori en gros",
    "description": "La ce să fiți atenți când alegeți un furnizor de alimente. Calitate, certificări, fiabilitate și protecție contractuală.",
    "date": "2026-04-15",
    "tags": '["furnizor", "calitate", "certificări", "en gros"]',
    "readingTime": 8,
    "body": """## De ce alegerea furnizorului este crucială

În comerțul alimentar, succesul dvs. depinde în mod direct de fiabilitatea furnizorilor. Un singur incident de calitate poate duce la retrageri de produse, daune de imagine și pierderi financiare.

Acest ghid descrie cele opt criterii esențiale pentru evaluarea unui furnizor alimentar.

## 1. Certificări și sisteme de management al calității

Baza oricărei evaluări a furnizorilor:
- **IFS Food** — Standard cerut de marile lanțuri de retail
- **BRC Global Standard** — Standard internațional de siguranță alimentară
- **ISO 22000** — Sistem de management al siguranței alimentare
- **HACCP** — Analiza pericolelor și puncte critice de control
- **FSSC 22000** — Certificare pentru siguranță alimentară

## 2. Trasabilitate

Furnizorul trebuie să documenteze întregul lanț de aprovizionare — de la materia primă până la livrare.

## 3. Calitatea produsului și specificații

Conveniți specificații scrise:
- Fișe tehnice de produs (TDS)
- Certificate de analiză per lot (COA)
- Cerințe senzoriale
- Limite pentru contaminanți
- Specificații de ambalare

## 4. Fiabilitatea livrării

Verificați capacitatea de livrare:
- Punctualitatea livrărilor anterioare
- Capacități de depozitare și disponibilitate
- Flexibilitate la modificări de cantitate
- Planuri de urgență pentru întârzieri

## 5. Raportul preț-calitate

Cel mai mic preț nu este întotdeauna cea mai bună alegere:
- Costuri totale (inclusiv transport, ambalare)
- Condiții de plată
- Reduceri de volum și contracte cadru
- Clauze de indexare a prețului pentru piețe volatile

## 6. Comunicare și accesibilitate

Un furnizor bun se distinge prin comunicare profesională:
- Persoană de contact dedicată
- Disponibilitate în fusul dvs. orar
- Comunicare multilingvă (română, engleză, bulgară)
- Timpi rapizi de răspuns

## 7. Stabilitate juridică și financiară

Verificați soliditatea partenerului:
- Înregistrare la registrul comerțului și în UE
- Informații financiare (dacă sunt disponibile)
- Asigurări (răspundere produs, transport)
- Referințe de la clienți existenți

## 8. Localizare geografică și logistică

Locația furnizorului influențează timpii și costurile de livrare:
- Proximitatea față de porturi sau granițe
- Acces la autostrăzi și rețeaua feroviară
- Experiență cu logistică internațională
- Flexibilitate Incoterms (FOB, CIF, DAP)

## Checklist pentru evaluarea furnizorului

✅ Certificate IFS/BRC/ISO valide?
✅ Trasabilitate completă documentată?
✅ Specificații de produs convenite în scris?
✅ Referințe verificate de la clienți existenți?
✅ Condiții și termene de livrare definite clar?
✅ Procedură de reclamații stabilită?
✅ Livrare de probă convenită?

## De ce UB Market îndeplinește aceste criterii

Ca societate înregistrată în UE cu sediul în Bulgaria — vecina directă a României — îndeplinim toate criteriile menționate. Vă invităm să ne cunoașteți și să convenim o livrare de probă.

[Programați o discuție inițială →](/ro/quote)
"""
}

# ============================================================
# POST 11: best-frying-oil-restaurants
# ============================================================
posts["best-frying-oil-restaurants"] = {
    "title": "Cel mai bun ulei de prăjit pentru restaurante — Comparație și recomandări",
    "description": "Ce ulei este cel mai potrivit pentru prăjire profesională? Comparație între ulei de floarea soarelui, ulei de palmier și variante High-Oleic.",
    "date": "2026-04-20",
    "tags": '["ulei de prăjit", "restaurante", "comparație", "HoReCa"]',
    "readingTime": 7,
    "body": """## Alegerea uleiului de prăjit — o decizie cu impact

Pentru restaurante, alegerea uleiului de prăjit este una dintre cele mai importante decizii operaționale. Uleiul potrivit influențează gustul preparatelor, costurile operaționale și conformitatea cu reglementările.

## Comparația principalelor uleiuri de prăjit

| Proprietate | Ulei de floarea soarelui | High-Oleic | Ulei de rapiță | Ulei de palmier |
|------------|-------------------------|-----------|---------------|----------------|
| Punct de ardere | 230 °C | 230 °C | 220 °C | 235 °C |
| Gust | Neutru | Foarte neutru | Ușor de nucă | Neutru |
| Rezistență la prăjire | Medie | Ridicată | Medie-ridicată | Ridicată |
| Interval schimb | 3–4 zile | 7–10 zile | 4–5 zile | 6–8 zile |
| Preț/litru (en gros) | 1,00–1,20 € | 1,40–1,70 € | 1,10–1,30 € | 0,85–1,05 € |
| Profil de sănătate | Bun | Foarte bun | Bun | Mai puțin favorabil |

## Ulei rafinat de floarea soarelui — Soluția universală

Cel mai utilizat ulei de prăjit în restaurantele din România. Raport bun preț-calitate, gust neutru, punct ridicat de ardere.

**Recomandat pentru:** Restaurante cu volum moderat de prăjire, bucătărie variată.

## Ulei High-Oleic — Alegerea premium

Pentru restaurante cu volum mare de prăjire, cea mai economică opțiune pe termen lung. Durata de utilizare mai lungă compensează prețul mai mare.

**Recomandat pentru:** Fast-food, takeaway, catering cu volum zilnic mare.

## Ulei de rapiță — Alternativa tradițională

Mai răspândit în Europa de Nord. Profil bun de acizi grași, dar punct de ardere ușor mai scăzut.

## Ulei de palmier — Eficient, dar controversat

Cel mai produs ulei vegetal din lume. Excelent pentru prăjire, dar imagine publică tot mai negativă din cauza preocupărilor de sustenabilitate.

## Reglementări în România

- **Compuși polari:** Limită maximă pentru uleiul de prăjire
- **Verificare regulată** a calității uleiului de prăjire
- **Documentare** a intervalelor de schimb a uleiului
- **Procese de prăjire conforme HACCP**

## Recomandarea noastră pentru piața românească

Pentru majoritatea restaurantelor din România, recomandăm **ulei de floarea soarelui rafinat** ca soluție standard și **High-Oleic** pentru restaurantele cu volum mare de prăjire.

UB Market livrează ambele variante în toate dimensiunile de ambalare, direct la restaurantul dvs.

[Solicitați ofertă pentru restaurantul dvs. →](/ro/quote)
"""
}

# ============================================================
# POST 12: wholesale-beet-sugar-europe
# ============================================================
posts["wholesale-beet-sugar-europe"] = {
    "title": "Zahăr din sfeclă en gros — Aprovizionare în Europa",
    "description": "Tot despre achiziția en gros de zahăr din sfeclă în Europa: clase de calitate, piața UE a zahărului, factori de preț și strategii de aprovizionare.",
    "date": "2026-04-25",
    "tags": '["zahăr", "sfeclă", "en gros", "Europa"]',
    "readingTime": 7,
    "body": """## Piața europeană a zahărului

UE este unul dintre cei mai mari producători mondiali de zahăr din sfeclă, cu o producție anuală de aproximativ 15–17 milioane de tone. Franța, Germania, Polonia și Țările de Jos sunt principalele țări producătoare. România contribuie cu aproximativ 1 milion de tone anual.

## Clase de calitate

### Zahăr alb (Categoria 1)
- Polarizare: min. 99,7 °Z
- Culoare: max. 25 unități ICUMSA
- Umiditate: max. 0,06%
- Cenușă: max. 0,04%
- Utilizare: Retail, panificație, băuturi

### Zahăr alb (Categoria 2)
- Polarizare: min. 99,5 °Z
- Culoare: max. 45 unități ICUMSA
- Utilizare: Procesare industrială

### Zahăr brut
- Polarizare: 96–99 °Z
- Utilizare: Rafinare ulterioară

## Piața zahărului în UE

- **Taxe vamale de import:** Zahărul din țări terțe este supus taxelor UE
- **Acorduri preferențiale:** Anumite țări beneficiază de acces preferențial
- **Piața internă:** Comerțul intracomunitar este liber de taxe vamale

## Factori de preț

- **Prețurile mondiale** ale zahărului brut (ICE Sugar No. 11)
- **Recolta de sfeclă din UE** (dependent de clima din Franța, Germania)
- **Cererea de bioetanol** (concurează pentru materia primă)
- **Cursuri de schimb** (EUR/BRL pentru zahărul brazilian)
- **Costuri energetice** (rafinarea zahărului este energointensivă)

## Opțiuni de ambalare

| Ambalaj | Greutate | Utilizare |
|---------|---------|-----------|
| Pachete mici | 500 g – 5 kg | Retail |
| Saci mari | 25 kg – 50 kg | Patiserii, restaurante |
| Big Bags | 500 kg – 1.000 kg | Procesare industrială |
| Vrac (silo-camion) | 25 t | Procesatori mari |

## România — piață în creștere

România este atât producător, cât și importator de zahăr:
- Producția internă nu acoperă integral cererea
- Import semnificativ din Polonia, Germania și Franța
- Cerere crescută din sectorul HoReCa și procesare alimentară
- Poziție strategică pentru re-export în Republica Moldova și Balcani

## UB Market — Partener pentru zahăr en gros

Pe lângă uleiul de floarea soarelui, zahărul este unul dintre produsele noastre principale. Livrăm zahăr alb categoria 1 și 2 de la producători europeni certificați.

- Livrare în saci sau Big Bags
- Cantități flexibile, de la 1 palet
- Documentație conformă UE
- Livrare directă în toată România

[Solicitați prețuri pentru zahăr →](/ro/quote)
"""
}


# ============================================================
# WRITE ALL FILES
# ============================================================
def main():
    print("=" * 60)
    print("UB Market — Filling Romanian (ro.md) blog content")
    print("=" * 60)

    created = 0
    skipped = 0

    for slug, post in posts.items():
        ro_path = os.path.join(BLOG_DIR, slug, "ro.md")
        dir_path = os.path.dirname(ro_path)

        if not os.path.exists(dir_path):
            print(f"  ⚠️  Directory not found: {dir_path} — creating it")
            os.makedirs(dir_path, exist_ok=True)

        image = get_image_from_en(slug)

        frontmatter = f"""---
title: "{post['title']}"
date: "{post['date']}"
description: "{post['description']}"
image: "{image}"
tags: {post['tags']}
readingTime: {post['readingTime']}
---
"""
        full_content = frontmatter + post["body"].strip() + "\n"

        with open(ro_path, "w", encoding="utf-8") as f:
            f.write(full_content)

        print(f"  ✅ {slug}/ro.md ({len(post['body'].split())} words)")
        created += 1

    print(f"\n{'=' * 60}")
    print(f"Done! Created: {created} files, Skipped: {skipped}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
