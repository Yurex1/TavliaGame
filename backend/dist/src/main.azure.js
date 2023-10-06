"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function createApp() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    await app.init();
    return app;
}
exports.createApp = createApp;
//# sourceMappingURL=main.azure.js.map