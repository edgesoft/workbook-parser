# Workbook parser

A parser that fetches workbook data from wol and formats in json. In the first version only swedish is supported

## usage

run yarn init && node index.js to start the server on localhost:3000

### payload and response
Make a `POST` request to the server using the format below

- `lang` the language code. sv is currently the only supported locale
- `requestDates` array
  - `year` mandatory
  - `month` mandatory
  - `day` mandatory
  - `invalidateCache`if set to true we will fetch from wol otherwise try to get from cache. Not mandatory

  
```json
{
    "lang": "sv",
    "requestDates": [
        {
            "year": 2020,
            "month": 8,
            "day": 1,
             "invalidateCache": true
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
                    "type": "BIBLE_READING"
                }
            ],
            "INTRODUCTION": [
                {
                    "label": "Sång 20 och bön",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                },
                {
                    "label": "Inledande ord (1 min.)",
                    "description": null,
                    "type": "OPENING_COMMENTS",
                    "time": 1
                }
            ],
            "TREASURES_FROM_GODS_WORD": [
                {
                    "label": "”Påskens betydelse för de kristna”: (10 min.)",
                    "description": null,
                    "type": "HIGHLIGHTS",
                    "time": 10
                },
                {
                    "label": "Andliga guldkorn: (10 min.)",
                    "description": null,
                    "type": "GEMS",
                    "time": 10
                },
                {
                    "label": "Bibelläsning: (max 4 min.)",
                    "description": "2Mo 12:1–20 (th lektion 5)",
                    "type": "BIBLE_READING",
                    "time": 4
                }
            ],
            "APPLY_YOURSELF_MINISTRY": [
                {
                    "label": "Förstabesök: (max 3 min.)",
                    "description": "Inled med samtalsförslaget. Bemöt en vanlig invändning. (th lektion 2)",
                    "type": "INITIAL_CALL:",
                    "time": 3
                },
                {
                    "label": "Återbesök: (max 4 min.)",
                    "description": "Inled med samtalsförslaget. Erbjud sedan någon av de senaste tidskrifterna som handlar om det ni pratat om. (th lektion 6)",
                    "type": "RETURN_VISIT",
                    "time": 4
                },
                {
                    "label": "Bibelkurs: (max 5 min.)",
                    "description": "bhs 16 § 21, 22 (th lektion 19)",
                    "type": "BIBLE_COURSE",
                    "time": 5
                }
            ],
            "LIVING_AS_CHRISTIANS": [
                {
                    "label": "Sång 38",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                },
                {
                    "label": "”Jehova skyddar sitt folk”: (15 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon Utställningar i Warwick: ”Ett folk för Jehovas namn”.",
                    "type": "UNKNOWN",
                    "time": 15
                },
                {
                    "label": "Församlingens bibelstudium: (max 30 min.)",
                    "description": "jy kap. 125",
                    "type": "CONGREGATION_BIBLE_STUDY",
                    "time": 30
                },
                {
                    "label": "Avslutande ord (max 3 min.)",
                    "description": null,
                    "type": "CONCLUDING_COMMENTS",
                    "time": 3
                },
                {
                    "label": "Sång 129 och bön",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                }
            ]
        }
    },
    {
        "year": 2021,
        "month": 3,
        "day": 22,
        "data": {
            "OVERVIEW": [
                {
                    "label": "22–28 mars",
                    "type": "DATE"
                },
                {
                    "label": "4 MOSEBOKEN 13, 14",
                    "type": "BIBLE_READING"
                }
            ],
            "INTRODUCTION": [
                {
                    "label": "Sång 118 och bön",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                },
                {
                    "label": "Inledande ord (1 min.)",
                    "description": null,
                    "type": "OPENING_COMMENTS",
                    "time": 1
                }
            ],
            "TREASURES_FROM_GODS_WORD": [
                {
                    "label": "”Tro gör oss modiga”: (10 min.)",
                    "description": null,
                    "type": "HIGHLIGHTS",
                    "time": 10
                },
                {
                    "label": "Andliga guldkorn: (10 min.)",
                    "description": null,
                    "type": "GEMS",
                    "time": 10
                },
                {
                    "label": "Bibelläsning: (4 min.)",
                    "description": "4Mo 13:1–20 (th lektion 5)",
                    "type": "BIBLE_READING",
                    "time": 4
                }
            ],
            "APPLY_YOURSELF_MINISTRY": [
                {
                    "label": "Tal: (5 min.)",
                    "description": "w15 15/9 14–16 § 8–12. Tema: Frågor som kan hjälpa oss att granska vår tro (th lektion 14)",
                    "type": "TALK",
                    "time": 5
                },
                {
                    "label": "”Öka din glädje i tjänsten: Ställ frågor”: (10 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon Upplev glädjen med att göra lärjungar – Bli skickligare – Ställ frågor.",
                    "type": "UNKNOWN",
                    "time": 10
                }
            ],
            "LIVING_AS_CHRISTIANS": [
                {
                    "label": "Sång 73",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                },
                {
                    "label": "Varför kristna behöver mod – För att predika: (8 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon. Fråga sedan: Vad kämpade Kitty Kelly med? Vad hjälpte henne att bli modig? Vilka glädjeämnen fick hon uppleva tack vare att hon var modig?",
                    "type": "UNKNOWN",
                    "time": 8
                },
                {
                    "label": "Varför kristna behöver mod – För att vara politiskt neutrala: (7 min.)",
                    "description": "Resonemang med åhörarna. Spela upp videon. Fråga sedan: Vilken svår situation upplevde Ayenge Nsilu? Vad hjälpte honom att vara modig? Vilken tanke hjälpte honom att lita på Jehova?",
                    "type": "UNKNOWN",
                    "time": 7
                },
                {
                    "label": "Församlingens bibelstudium: (30 min.)",
                    "description": "rr kap. 6 § 14–19",
                    "type": "CONGREGATION_BIBLE_STUDY",
                    "time": 30
                },
                {
                    "label": "Avslutande ord (3 min.)",
                    "description": null,
                    "type": "CONCLUDING_COMMENTS",
                    "time": 3
                },
                {
                    "label": "Sång 143 och bön",
                    "description": null,
                    "type": "SONG",
                    "time": 5
                }
            ]
        }
    }
]
```
