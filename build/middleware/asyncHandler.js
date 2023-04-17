'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const asyncHandler = (cb) => (req, res, next) => {
  Promise.resolve(cb(req, res, next)).catch(next);
};
exports.default = asyncHandler;
//# sourceMappingURL=asyncHandler.js.map
