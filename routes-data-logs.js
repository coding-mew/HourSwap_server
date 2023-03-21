import listEndpoints from "express-list-endpoints";


const canLogRoutingData = process.argv[2] === "true";

export const logRoutesData = (PORT, app) => {
  if (canLogRoutingData) {
    console.log(
      listEndpoints(app).map((route) => {
        const url = `http://localhost:${PORT}${route.path}`;
        delete route.middlewares;
        return { ...route, url };
      })
    );
  } else {
    console.log(`Server running on port ${PORT}, run npm run dev true for logging routes`);
  }
};