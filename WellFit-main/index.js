const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const port = process.env.PORT || 3000;
const DATABASE_URI = process.env.MONGODB_URI;

const app = express();

const allergyRoute = require("./Routes/allergyRoute");
const careplansRoute = require("./Routes/careplansRoute");
const conditionsRoute = require("./Routes/conditionsRoute");
const devicesRoute = require("./Routes/devicesRoute");
const patientsRoute = require("./Routes/patientsRoute");
const encountersRoute = require("./Routes/encountersRoute");
const observationsRoute = require("./Routes/observationsRoute");
const medicationsRoute = require("./Routes/medicationsRoute");
const immunizationsRoute = require("./Routes/immunizationsRoute");
const hospitalsRoute = require("./Routes/hospitalsRoute");

app.use(cors());
// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/", allergyRoute);
app.use("/api/", careplansRoute);
app.use("/api/", conditionsRoute);
app.use("/api/", devicesRoute);
app.use("/api/", patientsRoute);
app.use("/api/", encountersRoute);
app.use("/api/", observationsRoute);
app.use("/api/", medicationsRoute);
app.use("/api/", immunizationsRoute);
app.use("/api/", hospitalsRoute);

// if (process.env.NODE_ENV === "production") {
app.use(express.static(path.join(__dirname, "frontend", "build")));

app.get("/*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
});
// }

mongoose
	.connect(DATABASE_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		console.log("Connected to database successfully!");
		app.listen(port, () => {
			console.log(`Server is listening on port: ${port}`);
		});
	})
	.catch((err) => console.log(err));
