interface EnvConfig {
  PATH_MY_SERVER_MEDIA: string;
  BASE_URL_YT_DL_SERVER: string;
}

export const env: EnvConfig = {
  // PATH_MY_SERVER_MEDIA: "http://192.168.1.130:3000",
  PATH_MY_SERVER_MEDIA: "https://sepinaco.com:3000",
  // PATH_MY_SERVER_MEDIA: "https://188.26.206.195:3000",

  // Esta url ya no existe
  BASE_URL_YT_DL_SERVER: "https://video-dl-esp.herokuapp.com/video/video?url=",
};
