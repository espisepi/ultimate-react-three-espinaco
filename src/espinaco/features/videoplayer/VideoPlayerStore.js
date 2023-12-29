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
  name: "Critical Pi - John Cena (prod Lasio)",
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
