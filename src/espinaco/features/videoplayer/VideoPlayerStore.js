import { create } from "zustand";

export const BASE_URL_HEROKU_VIDEO_YT_DL =
  "https://video-dl-esp.herokuapp.com/video/video?url=";
export const BASE_URL_LOCAL_VIDEO_YT_DL =
  "http://localhost:4000/video/video?url=";
export const BASE_URL_RENDERER_YT_DL =
  "https://video-dl.onrender.com/video/video?url=";

export const LOVE_LO_HABITS = {
  name: "Tove Lo - Habits (Stay High)",
  url: "videos/stayHigh.mp4",
};

export const MCPI = {
  name: "Critical Pi - John Cena (prod Lasio) (Live)",
  url: "videos/mcpi.mp4",
};

export const GATACATTANA_GOTHAM = {
  name: "Gata Cattana - Gotham",
  url: "videos/gotham.mp4",
};

export const FARCRY_VASS_DEATH = {
  name: "Far Cry 3 - Vass Death",
  url: "videos/farcry3VassDeath.mp4",
};

export const CHRISTIAN_LOFFER = {
  name: "Christian Löffler & Ensemble - Haul (Live Berlin)",
  url: "videos/christianloffer.mp4",
};

export const KIASMOS = {
  name: "Kiasmos - Looped (Live on KEXP)",
  url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Kiasmos+-+Looped+(Live+on+KEXP).mp4",
};

export const YOUNG_MIKO = {
  name: "Feid, Young Miko - Classy 101 (Official Video)",
  url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Feid%2C+Young+Miko+-+Classy+101+(Official+Video).mp4",
};

export const SOTOASA_ZOWI = {
  name: "Soto Asa y La Zowi - Smartphone | GALLERY SESSION",
  url: "videos/sotoasazowi.mp4",
};

export const ROSALIA = {
  name: "Rosalía - 'Me quedo contigo' | Goya 2019",
  url: "videos/rosalia.mp4",
};

export const LOGIC = {
  name: "Logic ft. Alessia Cara, Khalid - 1-800-273-8255 (Live At The MTV VMAs)",
  url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Logic+ft.+Alessia+Cara%2C+Khalid+-+1-800-273-8255+(Live+At+The+MTV+VMAs).mp4",
};

/**
 *
 *
 * https://www.youtube.com/watch?v=taSubkjZUA4
 * https://www.youtube.com/watch?v=fLzU21ltH4U
 * https://www.youtube.com/watch?v=sFBS3kBpMpM
 *
 */

/**
 * Reference1:
 *  (chatgpt)
 *  He agregado una función de comparación como argumento para el método .sort().
 *  Esta función de comparación utiliza el método localeCompare()
 *  para comparar los nombres de los videos y ordenar el array en orden alfabético.
 *  Esto garantiza que el array videos se ordene correctamente según el nombre de cada video en el momento de la declaración
 */

export const useVideoPlayerStore = create((set, get) => ({
  videos: [
    LOVE_LO_HABITS,
    MCPI,
    GATACATTANA_GOTHAM,
    FARCRY_VASS_DEATH,
    CHRISTIAN_LOFFER,
    KIASMOS,
    YOUNG_MIKO,
    SOTOASA_ZOWI,
    LOGIC,
    ROSALIA,
    {
      name: "070 shake",
      url: "videos/070shake.mp4",
    },
    {
      name: "EO - 1Take (Naija to London) | @MixtapeMadness",
      url: "videos/eo1take.mp4",
    },
    {
      name: "Paula Cendejas - x ti (Videoclip Oficial)",
      url: "videos/paulacendeja.mp4",
    },
    {
      name: "FUFU - SLOU",
      url: "videos/fufu.mp4",
    },
    { name: "HOKE - MOONDIAL", url: "videos/HOKE-MOONDIAL.mp4" },
    {
      name: "FEID - Normal",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Feid+-+Normal+(Official+Video).mp4",
    },
    {
      name: "Winton Marsalis Eric Clapton - Layla",
      url: "videos/layla.mp4",
    },
    {
      name: "El Bugg - SUB21",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/El+Bugg+-+SUB21.mp4",
    },
    {
      name: "HADES 66 - BRILLAN",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/HADES+66+-+BRILLAN+(+OFFICIAL+VIDEO+).mp4",
    },
    {
      name: "MILO J - BZRP SESSION 57",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/MILO+J+++BZRP+Music+Sessions+%2357.mp4",
    },
    {
      name: "GRECAS - ES COMO FAK",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/GRECAS+-+ES+COMO+FAK.mp4",
    },
    {
      name: "PEDRO ∞ LADROGA ≠ ≈KE KIERE ASE KE KIE≈ ",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/%E2%89%A0+PEDRO+%E2%88%9E+LADROGA+%E2%89%A0+++%E2%89%88KE+KIERE+ASE++KE+KIE+%E2%89%88+%5BVEEDEO%5D+'ZzZzZz+(h+o+l+o+g+r+a+m_ep).mp4",
    },
    {
      name: "Emilia, Ludmilla, Zecca - No_se_ve.mp3",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Emilia%2C+Ludmilla%2C+Zecca+-+No_se_ve.mp3+(Official+Video).mp4",
    },
    {
      name: "Central Cee x Dave - Sprinter",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Central+Cee+x+Dave+-+Sprinter+%5BMusic+Video%5D.mp4",
    },
    {
      name: "El Chalo y El Lirola Entre dos Aguas Albaicín, Granada",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/El+Chalo++y++El+Lirola+++++Entre+dos+Aguas+++Albaic%C3%ADn%2C+Granada.mp4",
    },
    {
      name: "Rihanna - Diamonds",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Rihanna+-+Diamonds.mp4",
    },
    {
      name: "Ingratax - Paris",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Ingratax+-+Paris+(Official+Video).mp4",
    },
    {
      name: "Lee Eye - Gata",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lee+Eye+-+Gata+(+Prod.+By+Alka+Produce+)+%5B+TCE+Mic+Check+%5D.mp4",
    },
    {
      name: "GATA CATTANA - BANZAI - DISCO COMPLETO",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/GATA+CATTANA+-+BANZAI+-+DISCO+COMPLETO.mp4",
    },
    {
      name: "SOKO Sweet Sound of Ignorance",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/SOKO++Sweet+Sound+of+Ignorance+(Official+Video).mp4",
    },
    {
      name: "ROSALÍA (LLYLM Live en NYC)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Saborea+la+transformaci%C3%B3n+++Coca-Cola%C2%AE+feat.+ROSAL%C3%8DA+(LLYLM+Live+en+NYC).mp4",
    },
    {
      name: "6LACK - LVRN x RapCaviar Cypher, Westside Boogie, BRS Kash, NoonieVsEverybody, OMB Bloodbath",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/LVRN+x+RapCaviar+Cypher+-+6LACK%2C+Westside+Boogie%2C+BRS+Kash%2C+NoonieVsEverybody%2C+OMB+Bloodbath.mp4",
    },
    {
      name: "Lana Del Rey - Chemtrails Over The Country Club",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lana+Del+Rey+-+Chemtrails+Over+The+Country+Club+(Official+Music+Video).mp4",
    },
    {
      name: "Lana Del Rey - West Coast",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lana+Del+Rey+-+West+Coast.mp4",
    },
    ,
    {
      name: "Coldplay - Viva La Vida (Live In São Paulo)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Coldplay+-+Viva+La+Vida+(Live+In+S%C3%A3o+Paulo).mp4",
    },
    ,
    {
      name: "Harry Styles - As It Was (Official Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Harry+Styles+-+As+It+Was+(Official+Video).mp4",
    },
    {
      name: "D.NADIE - LOS OJOS COMO LUNAS (Visualizer)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/D.NADIE+-+LOS+OJOS+COMO+LUNAS+(Visualizer).mp4",
    },
    {
      name: "Lana Del Rey - Young and Beautiful",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lana+Del+Rey+-+Young+and+Beautiful.mp4",
    },
    {
      name: "HIGHKILI - AY LINDA",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/AY+LINDA+++++++++++++++HIGHKILI.mp4",
    },
    {
      name: "Bad Bunny (ft. Chencho Corleone) - Me Porto Bonito (Official Video)   Un Verano Sin Ti",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Bad+Bunny+(ft.+Chencho+Corleone)+-+Me+Porto+Bonito+(Official+Video)+++Un+Verano+Sin+Ti.mp4",
    },
    {
      name: "BAD BUNNY ft. YOUNG MIKO - FINA (Visualizer)   nadie sabe lo que va a pasar mañana",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/BAD+BUNNY+ft.+YOUNG+MIKO+-+FINA+(Visualizer)+++nadie+sabe+lo+que+va+a+pasar+ma%C3%B1ana.mp4",
    },
    {
      name: "DELLAFUENTE · CONSENTIA",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELLAFUENTE+%C2%B7+CONSENTIA.mp4",
    },
    {
      name: "DELLAFUENTE, Morad - Manos Rotas",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELLAFUENTE%2C+Morad+-+Manos+Rotas.mp4",
    },
    {
      name: "Israel B - Nadie Regala Nada",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Israel+B+-+Nadie+Regala+Nada.mp4",
    },
    {
      name: "Kaydy Cain - Perdedores del Barrio (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Kaydy+Cain+-+Perdedores+del+Barrio+(Video+Oficial).mp4",
    },
    {
      name: "Lana Del Rey - Ride",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lana+Del+Rey+-+Ride.mp4",
    },
    {
      name: "Lana Del Rey - Summertime Sadness (Official Music Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lana+Del+Rey+-+Summertime+Sadness+(Official+Music+Video).mp4",
    },
    {
      name: "LiL PEEP – Vibe",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/LiL+PEEP+%E2%80%93+Vibe.mp4",
    },
    {
      name: "XXXTENTACION - MOONLIGHT (OFFICIAL MUSIC VIDEO)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/XXXTENTACION+-+MOONLIGHT+(OFFICIAL+MUSIC+VIDEO).mp4",
    },
    {
      name: "Soto Asa - La Primera (ft. Mala Rodríguez)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/2.+Soto+Asa+-+La+Primera+(ft.+Mala+Rodr%C3%ADguez).mp4",
    },
    {
      name: "Andy Stott - Faith In Strangers",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Andy+Stott+-+Faith+In+Strangers.mp4",
    },
    {
      name: "babi - colegas (letra)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/babi+-+colegas+(letra).mp4",
    },
    {
      name: "BEJO -  Guaña Guaña O O (Vidéo)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/BEJO+-++Gua%C3%B1a+Gua%C3%B1a+O+O+(Vid%C3%A9o).mp4",
    },
    {
      name: "BEJO - CAMBIAR EL MUNDO (PROD. COOKIN SOUL).mp4",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/BEJO+-+CAMBIAR+EL+MUNDO+(PROD.+COOKIN+SOUL).mp4",
    },
    {
      name: "BEJO - Pecata Minuta (Vidéo)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/BEJO+-+Pecata+Minuta+(Vid%C3%A9o).mp4",
    },
    {
      name: "Cemeteries - Sodus",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Cemeteries+-+Sodus.mp4",
    },
    {
      name: "DELAOSSA - JUDAS (PROD. JMOODS)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELAOSSA+-+JUDAS+(PROD.+JMOODS).mp4",
    },
    {
      name: "DELLAFUENTE - 13 18",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELLAFUENTE+-+13+18.mp4",
    },
    {
      name: "Foxes in Fiction - Ontario Gothic",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Foxes+in+Fiction+-+Ontario+Gothic.mp4",
    },
    {
      name: "Future Islands - Like the Moon",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Future+Islands+-+Like+the+Moon.mp4",
    },
    {
      name: "Greentea Peng - Downers   A COLORS SHOW",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Greentea+Peng+-+Downers+++A+COLORS+SHOW.mp4",
    },
    {
      name: "Soto Asa - Jugador 9 (Videoclip)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Soto+Asa+-+Jugador+9+(Videoclip).mp4",
    },
    {
      name: "PEDRO ∞ LãDROGA _d e s c o n e c t a r_(offline) (Prod. Blank Body)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/PEDRO+%E2%88%9E+L%C3%A3DROGA+_d+e+s+c+o+n+e+c+t+a+r_(offline)+(Prod.+Blank+Body).mp3.mp4",
    },
    {
      name: "Saiko - Supernova (Official Video).mp4",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Saiko+-+Supernova+(Official+Video).mp4",
    },
    {
      name: "Saiko, Feid, Quevedo, Mora - Polaris Remix (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Saiko%2C+Feid%2C+Quevedo%2C+Mora+-+Polaris+Remix+(Video+Oficial).mp4",
    },
    {
      name: "Memory Tapes - Real Love (NSFW Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Memory+Tapes+-+Real+Love+(NSFW+Video).mp4",
    },
    {
      name: "Lil Xan - Betrayed",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lil+Xan+-+Betrayed.mp4",
    },
    {
      name: "SASKE - BUCLE",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/SASKE+-+BUCLE.mp4",
    },
    {
      name: "SASKE & KAS RULES - TRAMONTANA (VIDEO ALBUM)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/SASKE+%26+KAS+RULES+-+TRAMONTANA+(VIDEO+ALBUM).mp4",
    },
    {
      name: "YUNG BEEF X COOKIN SOUL~EL PAPASITO BARS~",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/YUNG+BEEF+X+COOKIN+SOUL~EL+PAPASITO+BARS~.mp4",
    },
    {
      name: "Jorja Smith - Blue Lights   A COLORS SHOW",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Jorja+Smith+-+Blue+Lights+++A+COLORS+SHOW.mp4",
    },
    {
      name: "Lola Young - Don't Hate Me",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Lola+Young+-+Don't+Hate+Me.mp4",
    },
    {
      name: "DELLAFUENTE   ENAMORAO DE UNA EMO",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELLAFUENTE+++ENAMORAO+DE+UNA+EMO.mp4",
    },
    {
      name: "Canserbero - Jeremías 175 (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Canserbero+-+Jerem%C3%ADas+175+(Video+Oficial).mp4",
    },
    {
      name: "G-Vampires Corp. - DJ Set 2023",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/G-Vampires+Corp.+-+DJ+Set+2023.mp4",
    },
    {
      name: "CRITICAL Pi - Noviembre   PROD LASIO",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/CRITICAL+Pi+-+Noviembre+++PROD+LASIO.mp4",
    },
    {
      name: "Critical Pi - John Cena (prod Lasio)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Critical+Pi+-+John+Cena+(prod+Lasio).mp4",
    },
    {
      name: "Pony Pool Club - #VACKSTAGE - Fumar",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Pony+Pool+Club+-+%23VACKSTAGE+-+Fumar.mp4",
    },
    {
      name: "TRAPANI - LA ULTIMA CENA (VIDEOCLIP) Prod. Delson Aravena",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+LA+ULTIMA+CENA+(VIDEOCLIP)+Prod.+Delson+Aravena.mp4",
    },
    {
      name: "Danié & Murrah - Ohana (prod Lasio)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Dani%C3%A9+%26+Murrah+-+Ohana+(prod+Lasio).mp4",
    },
    {
      name: "Danié & Lasio - 4 de Diciembre [VIDEOCLIP] #4dediciembre",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Dani%C3%A9+%26+Lasio+-+4+de+Diciembre+%5BVIDEOCLIP%5D+%234dediciembre.mp4",
    },
    {
      name: "Clairo - Pretty Girl",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Clairo+-+Pretty+Girl.mp4",
    },
    {
      name: "NIKITA - ВЕРЕВКИ [OFFICIAL VIDEO]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/NIKITA+-+%D0%92%D0%95%D0%A0%D0%95%D0%92%D0%9A%D0%98+%5BOFFICIAL+VIDEO%5D.mp4",
    },
    {
      name: "Nemesixx - Monster High",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Nemesixx+-+Monster+High.mp4",
    },
    {
      name: "JONA x JUANK - LA BOHÈME",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/JONA+x+JUANK+-+LA+BOH%C3%88ME.mp4",
    },
    {
      name: "Estopa - Como Camaron (Videoclip)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Estopa+-+Como+Camaron+(Videoclip).mp4",
    },
    {
      name: "Billie Eilish - everything i wanted (Official Music Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Billie+Eilish+-+everything+i+wanted+(Official+Music+Video).mp4",
    },
    {
      name: "By the time you've finished your coffee   original song",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/By+the+time+you've+finished+your+coffee+++original+song.mp4",
    },
    {
      name: "COCCO LEXA   MA BARRIERA (VIDEOCLIP OFICIAL)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/COCCO+LEXA+++MA+BARRIERA+(VIDEOCLIP+OFICIAL).mp4",
    },
    {
      name: "CRUZ CAFUNÉ - AMÉN   VIDEO",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/CRUZ+CAFUN%C3%89+-+AM%C3%89N+++VIDEO.mp4",
    },
    {
      name: "Coccolino Deep - Before Sunrise",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Coccolino+Deep+-+Before+Sunrise.mp4",
    },
    {
      name: "DELAOSSA - NIGHTMARES (Directed by J.Blanco)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELAOSSA+-+NIGHTMARES+(Directed+by+J.Blanco).mp4",
    },
    {
      name: "DELLAFUENTE - DILE [VIDEO OFICIAL]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DELLAFUENTE+-+DILE+%5BVIDEO+OFICIAL%5D.mp4",
    },
    {
      name: "DaBaby - BOP on Broadway (Hip Hop Musical)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/DaBaby+-+BOP+on+Broadway+(Hip+Hop+Musical).mp4",
    },
    {
      name: "Delaossa - Ojos Verdes",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Delaossa+-+Ojos+Verdes.mp4",
    },
    {
      name: "Delaossa - Veneno (Prod. Kiddo Manteca y J.Moods) [Audio Oficial]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Delaossa+-+Veneno+(Prod.+Kiddo+Manteca+y+J.Moods)+%5BAudio+Oficial%5D.mp4",
    },
    {
      name: "3. Guau Guau   METRIKA, D.Basto",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/3.+Guau+Guau+++METRIKA%2C+D.Basto.mp4",
    },
    {
      name: "6LACK - PRBLMS [Official Music Video].mp4",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/6LACK+-+PRBLMS+%5BOfficial+Music+Video%5D.mp4",
    },
    {
      name: "999999999 - X0003000X [NTNLTD001X].mp4",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/999999999+-+X0003000X+%5BNTNLTD001X%5D.mp4",
    },
    {
      name: "A$AP Rocky - Praise The Lord (Da Shine) (Official Video) ft. Skepta",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/A%24AP+Rocky+-+Praise+The+Lord+(Da+Shine)+(Official+Video)+ft.+Skepta.mp4",
    },
    {
      name: "Dheformer & Ciclo - Cuello de gitano [ Supremo conocimiento del mundo]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Dheformer+%26+Ciclo+-+Cuello+de+gitano+%5B+Supremo+conocimiento+del+mundo%5D.mp4",
    },
    {
      name: "Dheformer & Ciclo - Mercedes Benz feat N-Wise Allah",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Dheformer+%26+Ciclo+-+Mercedes+Benz+feat+N-Wise+Allah.mp4",
    },
    {
      name: "ERICK HERVÉ - TE LA DEBÍA",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/ERICK+HERV%C3%89+-+TE+LA+DEB%C3%8DA.mp4",
    },
    {
      name: "El After de Mi Kasa",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/El+After+de+Mi+Kasa.mp4",
    },
    {
      name: "Eminem - Mockingbird [Official Music Video]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Eminem+-+Mockingbird+%5BOfficial+Music+Video%5D.mp4",
    },
    {
      name: "Estopa - El Día Que Tú Te Marches (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Estopa+-+El+D%C3%ADa+Que+T%C3%BA+Te+Marches+(Video+Oficial).mp4",
    },
    {
      name: "JONA - DÉPÊCHE-TOI",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/JONA+-+D%C3%89P%C3%8ACHE-TOI.mp4",
    },
    {
      name: "JONA x PIEZAS - POBRE DIABLO",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/JONA+x+PIEZAS+-+POBRE+DIABLO.mp4",
    },
    {
      name: "Joey Bada$$ -  Christ Conscious  (Official Music Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Joey+Bada%24%24+-++Christ+Conscious++(Official+Music+Video).mp4",
    },
    {
      name: "KYNE - C#ÑØ!! (Videoclip Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/KYNE+-+C%23%C3%91%C3%98!!+(Videoclip+Oficial).mp4",
    },
    {
      name: "KYNE, Jesse Baez - SSHOOTTAZZ (Dispara ya) (Official Video)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/KYNE%2C+Jesse+Baez+-+SSHOOTTAZZ+(Dispara+ya)+(Official+Video).mp4",
    },
    {
      name: "Kaydy Cain Ft. Marko Italia - El infierno de tu gloria Remix (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Kaydy+Cain+Ft.+Marko+Italia+-+El+infierno+de+tu+gloria+Remix+(Video+Oficial).mp4",
    },
    {
      name: "Kendrick Lamar - FEAR. (Subtitulada en Español)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Kendrick+Lamar+-+FEAR.+(Subtitulada+en+Espa%C3%B1ol).mp4",
    },
    {
      name: "Manolo Garcia - Pajaros de Barro",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Manolo+Garcia+-+Pajaros+de+Barro.mp4",
    },
    {
      name: "Moha La Squale - Bienvenue à la Banane",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Moha+La+Squale+-+Bienvenue+%C3%A0+la+Banane.mp4",
    },
    {
      name: "NADAL015 -  STREET SHARK",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/NADAL015+-++STREET+SHARK.mp4",
    },
    {
      name: "PESI - BLUE",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/PESI+-+BLUE.mp4",
    },
    {
      name: "PXXR GVNG ~IMONMAPAPISHIT~",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/PXXR+GVNG+~IMONMAPAPISHIT~.mp4",
    },
    {
      name: "YUNG BEEF - INTRO A.D.R.O.M.I.C.F.M.S",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/YUNG+BEEF+-+INTRO+A.D.R.O.M.I.C.F.M.S.mp4",
    },
    {
      name: "Yung Beef - 27",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Yung+Beef+-+27.mp4",
    },
    {
      name: "PXXR GVNG ~PERROS CALLEJEROS~",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/PXXR+GVNG+~PERROS+CALLEJEROS~.mp4",
    },
    {
      name: "PXXR GVNG ~PIMPIN~ (OFFICIAL VIDEO)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/PXXR+GVNG+~PIMPIN~+(OFFICIAL+VIDEO).mp4",
    },
    {
      name: "Rigoberta Bandini - Directo para el Museo Thyssen",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Rigoberta+Bandini+-+Directo+para+el+Museo+Thyssen.mp4",
    },
    {
      name: "STARKIDS - PARAPULL (Prod. BENXNI) [Official Music Video]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/STARKIDS+-+PARAPULL+(Prod.+BENXNI)+%5BOfficial+Music+Video%5D.mp4",
    },
    {
      name: "Spooky Black -  Without You",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Spooky+Black+-++Without+You.mp4",
    },
    {
      name: "Spooky Black - Pull",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Spooky+Black+-+Pull.mp4",
    },
    {
      name: "Sweater weather - The Neighbourhood (cover)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Sweater+weather+-+The+Neighbourhood+(cover).mp4",
    },
    {
      name: "TRAPANI - DEL AMARGUE - (VIDEOCLIP)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+DEL+AMARGUE+-+(VIDEOCLIP).mp4",
    },
    {
      name: "TRAPANI - ORALE (VIDEOCLIP) -",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+ORALE+(VIDEOCLIP)+-.mp4",
    },
    {
      name: "TRAPANI - RENACER (VIDEOCLIP) -",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+RENACER+(VIDEOCLIP)+-.mp4",
    },
    {
      name: "TRAPANI - SUBESTIMAO (VIDEOCLIP)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+SUBESTIMAO+(VIDEOCLIP).mp4",
    },
    {
      name: "TRAPANI - VENGO (VIDEOCLIP)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+-+VENGO+(VIDEOCLIP).mp4",
    },
    {
      name: "TRAPANI • CARRARA (VIDEOCLIP)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRAPANI+%E2%80%A2+CARRARA+(VIDEOCLIP).mp4",
    },
    {
      name: "TRIANA PURA - DE FIESTA CON TRIANA PURA",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/TRIANA+PURA+-+DE+FIESTA+CON+TRIANA+PURA.mp4",
    },
    {
      name: "Tash Sultana Tiny Desk Concert",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Tash+Sultana+Tiny+Desk+Concert.mp4",
    },
    {
      name: "Tokischa - Twerk (Official Video) ft. Eladio Carrión",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Tokischa+-+Twerk+(Official+Video)+ft.+Eladio+Carri%C3%B3n.mp4",
    },
    {
      name: "Toteking - Mira Cómo Tiemblan (Prod. El Arkeólogo)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Toteking+-+Mira+C%C3%B3mo+Tiemblan+(Prod.+El+Arke%C3%B3logo).mp4",
    },
    {
      name: "Trueno - FEEL ME (Video Oficial)",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Trueno+-+FEEL+ME+(Video+Oficial).mp4",
    },
    {
      name: "spooky black - idle",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/spooky+black+-+idle.mp4",
    },
    {
      name: "spooky black - reason",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/spooky+black+-+reason.mp4",
    },
    {
      name: "Selecto Picasso - BACK IN THE DAYS 3",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Selecto+Picasso+-+BACK+IN+THE+DAYS+3.mp4",
    },
    {
      name: "Selecto Picasso - BACK IN THE DAYS 2 [Audio Oficial] [MADRILES]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Selecto+Picasso+-+BACK+IN+THE+DAYS+2+%5BAudio+Oficial%5D+%5BMADRILES%5D.mp4",
    },
    {
      name: "Selecto Picasso - BACK IN THE DAYS [OneShot] [Inéditos]",
      url: "https://videoclips-sepinaco.s3.eu-north-1.amazonaws.com/Selecto+Picasso+-+BACK+IN+THE+DAYS+%5BOneShot%5D+%5BIn%C3%A9ditos%5D.mp4",
    }
    // {
    //   name: "FUFU - SLOU (OFFICIAL VIDEO)",
    //   url: "https://www.youtube.com/watch?v=JN4gBp3Ss24",
    // },
    // {
    //   name: "Saiko - Supernova (Official Video)",
    //   url: "https://www.youtube.com/watch?v=BbZi8xGMyuM",
    // },
    // {
    //   name: "Saiko, Feid, Quevedo, Mora - Polaris Remix (Video Oficial)",
    //   url: "https://www.youtube.com/watch?v=SkBML8JgD0k",
    // },
    // {
    //   name: "Emilia, Ludmilla, Zecca - No_se_ve.mp3 (Official Video)",
    //   url: "https://www.youtube.com/watch?v=fLzU21ltH4U",
    // },
    // {
    //   name: "Alemán - Maradona (Visualizer)",
    //   url: "https://www.youtube.com/watch?v=4DFxeyPiRkM",
    // },
    // {
    //   name: "D.NADIE - LOS OJOS COMO LUNAS (Visualizer)",
    //   url: "https://www.youtube.com/watch?v=n8OKNX4NpSA",
    // },
    // {
    //   name: "FUFU - PLAYBOY (OFFICIAL VIDEO)",
    //   url: "https://www.youtube.com/watch?v=EN-gtDCFRKM",
    // },
    // {
    //   name: "Chesca x Mariah Angeliq - “Bicha” (Official Music Video)",
    //   url: "https://www.youtube.com/watch?v=lXJqBEp42Zo",
    // },
    // {
    //   name: "TRAPANI - LA ULTIMA CENA (VIDEOCLIP)",
    //   url: "https://www.youtube.com/watch?v=OCAISekVNfo",
    // },
    // {
    //   name: "Moha La Squale - Bienvenue à la Banane",
    //   url: "https://www.youtube.com/watch?v=96h97kNEgXM",
    // },
  ].sort((a, b) => a.name.localeCompare(b.name)), // Reference1 (definida al principio de este fichero)
  selectedVideo: null,
  //selectVideo: (video) => set({ selectedVideo: video }),
  // video: {name: string, url: string}
  selectVideo: (video) => {
    const { selectedVideo } = get();
    console.log(selectedVideo);
    if (selectedVideo?.url !== video.url) {
      set({ selectedVideo: video });
      if (video?.url?.includes("www.youtube.com")) {
        fetchAndPlayYoutubeVideo(video.url);
      } else {
        playLocalVideo(video.url);
      }
    }
  },
}));

function playLocalVideo(localVideoUrl) {
  // Obtener la etiqueta de video
  const videoPlayer = document.getElementById("video");

  console.log(localVideoUrl);

  // Establecer la fuente del video
  videoPlayer.src = localVideoUrl;

  // Reproducir el video (opcional)
  videoPlayer.play();

  // ====== INPUT TEXT YOUTUBE URL ============
  // const inputTextYoutubeUrl = document.getElementById("input-text-youtubeUrl");
  // inputTextYoutubeUrl.value = "";
  // ====== FIN INPUT TEXT YOUTUBE URL ============
}

function fetchAndPlayYoutubeVideo(youtubeUrl) {
  // show Loading
  const loadingEl = document.getElementById("loading");
  loadingEl.style.display = "block";

  // Fetch del video (se hace asi para que funcione en safari)
  fetch(BASE_URL_RENDERER_YT_DL + youtubeUrl)
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      // Crear una URL temporal para el blob del video
      const videoBlobUrl = URL.createObjectURL(blob);

      // Obtener la etiqueta de video
      const videoPlayer = document.getElementById("video");

      // Establecer la fuente del video
      videoPlayer.src = videoBlobUrl;

      // Reproducir el video (opcional)
      videoPlayer.play();

      // hidden Loading
      const loadingEl = document.getElementById("loading");
      loadingEl.style.display = "none";

      // ====== INPUT TEXT YOUTUBE URL ============
      // const inputTextYoutubeUrl = document.getElementById(
      //   "input-text-youtubeUrl"
      // );
      // inputTextYoutubeUrl.value = "";
      // ====== FIN INPUT TEXT YOUTUBE URL ============
    })
    .catch((error) => {
      console.error("Error al cargar el video:", error);
    });
}
