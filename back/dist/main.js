"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const HttpException_filter_1 = require("./filters/HttpException.filter");
const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalFilters(new HttpException_filter_1.HttpExceptionFilter());
        app.enableCors();
        await app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server listens on PORT=${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=main.js.map