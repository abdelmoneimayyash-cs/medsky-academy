"use strict";
// ملف التشغيل لاستضافة Namecheap (Passenger): يشغّل خادم Express
const app = require("./server/index.js");
app.listen(process.env.PORT || 3000);
