"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const PORT = process.env.PORT || 8000;
const app = express_1.default();
// Set up origin to avoid CORS issue when requesting the API
// And not using '*' to fit the OWASP recommandations
const corsOptions = {
    origin: [String(process.env.CLIENT)]
};
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('<h1>Hello from TypeScript server</h1>');
});
app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
//# sourceMappingURL=index.js.map