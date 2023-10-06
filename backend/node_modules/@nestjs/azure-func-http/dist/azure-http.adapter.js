"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureHttpAdapter = exports.AzureHttpAdapterStatic = void 0;
const azure_adapter_1 = require("./adapter/azure-adapter");
let handler;
class AzureHttpAdapterStatic {
    handle(createApp, context, req) {
        if (handler) {
            return handler(context, req);
        }
        this.createHandler(createApp).then((fn) => fn(context, req));
    }
    async createHandler(createApp) {
        const app = await createApp();
        const adapter = app.getHttpAdapter();
        if (this.hasGetTypeMethod(adapter) && adapter.getType() === 'azure-http') {
            return adapter.handle.bind(adapter);
        }
        const instance = app.getHttpAdapter().getInstance();
        handler = (0, azure_adapter_1.createHandlerAdapter)(instance);
        return handler;
    }
    hasGetTypeMethod(adapter) {
        return !!adapter.getType;
    }
}
exports.AzureHttpAdapterStatic = AzureHttpAdapterStatic;
exports.AzureHttpAdapter = new AzureHttpAdapterStatic();
