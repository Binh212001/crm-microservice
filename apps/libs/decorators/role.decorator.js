"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.IS_ROLE_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_ROLE_KEY = 'isRole';
const Role = (...roles) => (0, common_1.SetMetadata)(exports.IS_ROLE_KEY, roles);
exports.Role = Role;
//# sourceMappingURL=role.decorator.js.map