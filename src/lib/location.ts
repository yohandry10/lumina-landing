export const MAP_SECTION_ID = "ubicacion";
export const MAP_COORDS = "-13.63986037360912,-72.88881202309943";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.294185421253!2d-72.88881202309943!3d-13.63986037360912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x916d02da0e371713%3A0x777e935f88c87613!2spiso%203%2C%20Av%20Circunvalacion%2012%2C%20Abancay%2003001!5e0!3m2!1ses-419!2spe!4v1776909871524!5m2!1ses-419!2spe";

export const GOOGLE_MAPS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  MAP_COORDS,
)}&travelmode=driving`;

export const WAZE_URL = `https://waze.com/ul?ll=${encodeURIComponent(
  MAP_COORDS,
)}&navigate=yes&zoom=17`;
