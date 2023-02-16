export const corsConfig = {
  origin: [process.env.CLIENT_LOCAL_URL, process.env.CLIENT_PROD_URL],
  credentials: true,
};
