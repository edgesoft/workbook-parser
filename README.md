# Workbook parser

A parser that fetches workbook data from wol and formats in json. In the first version only swedish is supported

## usage

run yarn init && node index.js to start the server on localhost:3000

### payload and response
Make a `POST` request to the server using the format below

```json
{
    "lang": "sv", // default is sv and the only supported language right now
    "requestDates": [
        {
            "year": 2020,
            "month": 8,
            "day": 1
        },
        {
            "year": 2021,
            "month": 3,
            "day": 22
        }
    ]
}
```

Response should be in the following format. There are five available sections and they can have the types specified below

- `OVERVIEW`
  - `DATE` The week as string
  - `BIBLE_READING` Bible reading for the week
- `INTRODUCTION`
  - `SONG` The opening song
  - `OPENING_COMMENTS` Opening comments
- `TREASURES_FROM_GODS_WORD`
  - `HIGHLIGHTS` Highlight from the workbook
  - `GEMS` Spiritual gems
  - `BIBLE_READING` Bible reading
- `APPLY_YOURSELF_MINISTRY`
  - `INITIAL_CALL` The initial call
  - `RETURN_VISIT` Return visit
  - `BIBLE_COURSE` Bible course
  - `TALK` Talk
  - `MEMORIAL_INVITATION` Memorial invitation
  - `VIDEO` Video
  - `UNKNOWN` Special case when there is another talk
- `LIVING_AS_CHRISTIANS`
  - `SONG` The opening song
  - `CONCLUDING_COMMENTS` Concluding comments
  - `UNKNOWN` Normal talk
  - `CONGREGATION_BIBLE_STUDY` Congregation bible study
  
```json
[
    {
        "year": 2020,
        "month": 8,
        "day": 1,
        "data": {
            "OVERVIEW": [
                {
                    "label": "27 juli–2 augusti",
                    "type": "DATE"
                },
                {
                    "label": "2 MOSEBOKEN 12",
                    "type": "BIBLE_READING "
                }
            ],
            "INTRODUCTION": [
                {
                    "label": "Sång 20 och bön",
                    "description": null,
                    "type": "SONG"
                },
                {
                    "label": "Inledande ord (1 min.)",
                    "description": null,
                    "type": "OPENING_COMMENTS"
                }
            ],
            "TREASURES_FROM_GODS_WORD": [
                {
                    "label": "”Påskens betydelse för de kristna”: (10 min.)",
                    "description": null,
                    "type": "HIGHLIGHTS"
                },
                {
                    "label": "Andliga guldkorn: (10 min.)",
                    "description": null,
                    "type": "GEMS"
                },
                {
                    "label": "Bibelläsning: (max 4 min.)",
                    "description": "2Mo 12:1–20 (th lektion 5)",
                    "type": "BIBLE_READING"
                }
            ],
            "APPLY_YOURSELF_MINISTRY": [
                {
                    "label": "Förstabesök: (max 3 min.)",
                    "description": "Inled med samtalsförslaget. Bemöt en vanlig invändning. (th lektion 2)",
                    "type": "INITIAL_CALL:"
                },
                {
                    "label": "Återbesök: (max 4 min.)",
                    "description": "Inled med samtalsförslaget. Erbjud sedan någon av de senaste tidskrifterna som handlar om det ni pratat om. (th lektion 6)",
                    "type": "RETURN_VISIT"
                },
                {
                    "label": "Bibelkurs: (max 5 min.)",
                    "description": "bhs 16 § 21, 22 (th lektion 19)",
                    "type": "BIBLE_COURSE"
                }
            ],
            "LIVING_AS_CHRISTIANS": [
                {
                    "label": "Sång 38",
                    "description": null,
                    "type": "SONG"
                },
                {
                    "label": "”Jehova skyddar sitt folk”: (15 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon Utställningar i Warwick: ”Ett folk för Jehovas namn”.",
                    "type": "UNKNOWN"
                },
                {
                    "label": "Församlingens bibelstudium: (max 30 min.)",
                    "description": "jy kap. 125",
                    "type": "CONGREGATION_BIBLE_STUDY"
                },
                {
                    "label": "Avslutande ord (max 3 min.)",
                    "description": null,
                    "type": "CONCLUDING_COMMENTS"
                },
                {
                    "label": "Sång 129 och bön",
                    "description": null,
                    "type": "SONG"
                }
            ]
        }
    },
    {
        "year": 2021,
        "month": 2,
        "day": 12,
        "data": {
            "OVERVIEW": [
                {
                    "label": "8–14 februari",
                    "type": "DATE"
                },
                {
                    "label": "4 MOSEBOKEN 1, 2",
                    "type": "BIBLE_READING "
                }
            ],
            "INTRODUCTION": [
                {
                    "label": "Sång 123 och bön",
                    "description": null,
                    "type": "SONG"
                },
                {
                    "label": "Inledande ord (1 min.)",
                    "description": null,
                    "type": "OPENING_COMMENTS"
                }
            ],
            "TREASURES_FROM_GODS_WORD": [
                {
                    "label": "”Jehova organiserar sitt folk”: (10 min.)",
                    "description": null,
                    "type": "HIGHLIGHTS"
                },
                {
                    "label": "Andliga guldkorn: (10 min.)",
                    "description": null,
                    "type": "GEMS"
                },
                {
                    "label": "Bibelläsning: (4 min.)",
                    "description": "4Mo 1:1–19 (th lektion 5)",
                    "type": "BIBLE_READING"
                }
            ],
            "APPLY_YOURSELF_MINISTRY": [
                {
                    "label": "Förstabesök: (3 min.)",
                    "description": "Inled med samtalsförslaget. Erbjud en bibelkurs, och introducera videon Hur går en bibelkurs till? (Spela inte upp videon.) (th lektion 9)",
                    "type": "INITIAL_CALL:"
                },
                {
                    "label": "Återbesök: (4 min.)",
                    "description": "Inled med samtalsförslaget. Anpassa samtalet efter den besöktes behov och välj ett passande bibelställe. (th lektion 12)",
                    "type": "RETURN_VISIT"
                },
                {
                    "label": "Tal: (5 min.)",
                    "description": "w08 1/7 21. Tema: Varför talar Bibeln om Israels 12 stammar när det egentligen fanns 13 stammar? (th lektion 7)",
                    "type": "TALK"
                }
            ],
            "LIVING_AS_CHRISTIANS": [
                {
                    "label": "Sång 57",
                    "description": null,
                    "type": "SONG"
                },
                {
                    "label": "”Organiserade att predika för alla”: (10 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon Bli Jehovas vän – Predika på ett annat språk. Berätta om några av funktionerna i appen JW Language®.",
                    "type": "UNKNOWN"
                },
                {
                    "label": "Församlingens behov: (5 min.)",
                    "description": null,
                    "type": "UNKNOWN"
                },
                {
                    "label": "Församlingens bibelstudium: (30 min.)",
                    "description": "rr kap. 4 § 10–17",
                    "type": "CONGREGATION_BIBLE_STUDY"
                },
                {
                    "label": "Avslutande ord (3 min.)",
                    "description": null,
                    "type": "CONCLUDING_COMMENTS"
                },
                {
                    "label": "Sång 1 och bön",
                    "description": null,
                    "type": "SONG"
                }
            ]
        }
    }
]
```
