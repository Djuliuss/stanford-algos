"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.sortAndCountInversions = void 0;
var promises_1 = require("fs/promises");
function getNumbers() {
    return __awaiter(this, void 0, void 0, function () {
        var data, parsedNumbers, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promises_1["default"].readFile("numbers.txt", { encoding: "utf8" })];
                case 1:
                    data = _a.sent();
                    parsedNumbers = data.split("\n");
                    parsedNumbers.pop();
                    return [2 /*return*/, parsedNumbers];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var sortAndCountInversions = function (numbers) {
    if ([0, 1].includes(numbers.length)) {
        return {
            sortedNumbers: numbers,
            numberInversions: 0
        };
    }
    var midPoint = Math.floor(numbers.length / 2);
    var _a = (0, exports.sortAndCountInversions)(numbers.slice(0, midPoint)), leftNumberInversions = _a.numberInversions, leftSortedNumbers = _a.sortedNumbers;
    var _b = (0, exports.sortAndCountInversions)(numbers.slice(midPoint)), rightNumberInversions = _b.numberInversions, rightSortedNumbers = _b.sortedNumbers;
    var _c = mergeAndCountSplitInversions(leftSortedNumbers, rightSortedNumbers), sortedNumbers = _c.sortedNumbers, splitNumberInversions = _c.numberInversions;
    return {
        sortedNumbers: sortedNumbers,
        numberInversions: leftNumberInversions + rightNumberInversions + splitNumberInversions
    };
};
exports.sortAndCountInversions = sortAndCountInversions;
var mergeAndCountSplitInversions = function (leftSortedNumbers, rightSortedNumbers) {
    var _a = [0, 0, 0, 0], i = _a[0], j = _a[1], k = _a[2], splitInversions = _a[3];
    var sortedNumbers = [];
    var _b = [false, false], leftFinished = _b[0], rightFinished = _b[1];
    while (!leftFinished || !rightFinished) {
        if (!leftFinished &&
            (Number(leftSortedNumbers[i]) < Number(rightSortedNumbers[j]) ||
                rightFinished)) {
            sortedNumbers[k] = leftSortedNumbers[i];
            if (i < leftSortedNumbers.length - 1) {
                i++;
            }
            else {
                leftFinished = true;
            }
        }
        else if (!rightFinished) {
            sortedNumbers[k] = rightSortedNumbers[j];
            if (j < rightSortedNumbers.length - 1) {
                j++;
            }
            else {
                rightFinished = true;
            }
            if (!leftFinished) {
                splitInversions += Math.floor(leftSortedNumbers.length - i);
            }
        }
        k++;
    }
    return {
        sortedNumbers: sortedNumbers,
        numberInversions: splitInversions
    };
};
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var numbers, numbersFixed, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getNumbers()];
            case 1:
                numbers = _a.sent();
                numbersFixed = numbers === null || numbers === void 0 ? void 0 : numbers.map(function (e) { return Number(e).toString(); });
                response = (0, exports.sortAndCountInversions)(numbersFixed);
                console.info("number of inversion is ".concat(response.numberInversions));
                return [2 /*return*/];
        }
    });
}); })();
