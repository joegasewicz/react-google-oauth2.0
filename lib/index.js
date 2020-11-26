(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-bare-lib"] = factory(require("react"));
	else
		root["react-bare-lib"] = factory(root["react"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_react__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/_apiUtils.ts":
/*!**************************!*\
  !*** ./src/_apiUtils.ts ***!
  \**************************/
/*! exports provided: postToExchangeApiUrl, serverResponse, storeAccessToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postToExchangeApiUrl\", function() { return postToExchangeApiUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverResponse\", function() { return serverResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"storeAccessToken\", function() { return storeAccessToken; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\n/** @internal */\nfunction postToExchangeApiUrl(apiUrl, payload) {\n    return __awaiter(this, void 0, void 0, function () {\n        var res;\n        return __generator(this, function (_a) {\n            switch (_a.label) {\n                case 0: return [4 /*yield*/, fetch(apiUrl, {\n                        method: \"POST\",\n                        headers: { \"Content-Type\": \"application/json\" },\n                        body: JSON.stringify(payload),\n                    })];\n                case 1:\n                    res = _a.sent();\n                    return [2 /*return*/, res.json()];\n            }\n        });\n    });\n}\n/** @internal */\nfunction serverResponse(props) {\n    var _a = props.email, email = _a === void 0 ? \"\" : _a, code = props.code, apiUrl = props.apiUrl, scope = props.scope;\n    var payload = { code: code, email: email, scope: scope };\n    postToExchangeApiUrl(apiUrl, payload)\n        .then(function (data) {\n        // update responseState accessToken\n        props.setResponseState({\n            accessToken: data.access_token,\n        });\n    })\n        .catch(function (err) {\n        props.setResponseState({\n            error: err,\n        });\n    });\n}\n/** @internal */\nfunction storeAccessToken(token) {\n    window.localStorage.setItem(\"accessToken\", token);\n}\n\n\n//# sourceURL=webpack://react-bare-lib/./src/_apiUtils.ts?");

/***/ }),

/***/ "./src/authorization.ts":
/*!******************************!*\
  !*** ./src/authorization.ts ***!
  \******************************/
/*! exports provided: GoogleAPIConnectionStrings, Authorization */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GoogleAPIConnectionStrings\", function() { return GoogleAPIConnectionStrings; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Authorization\", function() { return Authorization; });\n/** @internal */\nvar GoogleAPIConnectionStrings;\n(function (GoogleAPIConnectionStrings) {\n    GoogleAPIConnectionStrings[\"GOOGLE_OAUTH_ENDPOINT\"] = \"https://accounts.google.com/o/oauth2/v2/auth\";\n})(GoogleAPIConnectionStrings || (GoogleAPIConnectionStrings = {}));\n/** @internal */\nvar Authorization = /** @class */ (function () {\n    function Authorization(params, scopesStr) {\n        var _this = this;\n        /** @internal */\n        this.redirect = function (e) {\n            if (_this.googleRedirectURL) {\n                window.location.replace(_this.googleRedirectURL);\n            }\n            else {\n                throw new ReferenceError(\"Error creating redirect url to Google's authorization server\");\n            }\n        };\n        this.params = params;\n        this.scopesStr = scopesStr;\n    }\n    Object.defineProperty(Authorization.prototype, \"googleRedirectURL\", {\n        /**\n         * @internal\n         * @property googleRedirectURL Access the url for the initial\n         * browser call to Google's OAuth 2.0 server. Useful for debugging.\n         */\n        get: function () {\n            return this._googleRedirectURL;\n        },\n        set: function (value) {\n            this._googleRedirectURL = value;\n        },\n        enumerable: false,\n        configurable: true\n    });\n    /** @internal */\n    Authorization.prototype.createAuthorizationRequestURL = function () {\n        var _a = this.params, accessType = _a.accessType, _b = _a.includeGrantedScopes, includeGrantedScopes = _b === void 0 ? true : _b, _c = _a.responseType, responseType = _c === void 0 ? \"code\" : _c, _d = _a.state, state = _d === void 0 ? null : _d, redirectUri = _a.redirectUri, clientId = _a.clientId;\n        var domain = GoogleAPIConnectionStrings.GOOGLE_OAUTH_ENDPOINT;\n        var url;\n        url = domain + \"?scope=\" + this.scopesStr + \"&\";\n        url = accessType ? url + \"access_type=\" + accessType + \"&\" : url;\n        url = url + \"include_granted_scopes=\" + includeGrantedScopes + \"&\";\n        url = url + \"response_type=\" + responseType + \"&\";\n        url = state ? url + \"state=\" + state + \"&\" : url;\n        url = url + \"redirect_uri=\" + redirectUri + \"&\";\n        url = url + \"client_id=\" + clientId;\n        this.googleRedirectURL = url;\n    };\n    /** @internal */\n    Authorization.createScopes = function (scopes) {\n        var str = \"\";\n        scopes.map(function (scope, i) {\n            if (scopes.length - 1 === i) {\n                str += \"\" + scope;\n            }\n            else {\n                str += scope + \"%20\";\n            }\n        });\n        return str;\n    };\n    return Authorization;\n}());\n\n\n\n//# sourceURL=webpack://react-bare-lib/./src/authorization.ts?");

/***/ }),

/***/ "./src/components.tsx":
/*!****************************!*\
  !*** ./src/components.tsx ***!
  \****************************/
/*! exports provided: GoogleAuth, GoogleAuthConsumer, InnerButton, GoogleButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GoogleAuth\", function() { return GoogleAuth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GoogleAuthConsumer\", function() { return GoogleAuthConsumer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InnerButton\", function() { return InnerButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GoogleButton\", function() { return GoogleButton; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src */ \"./src/index.ts\");\n/* harmony import */ var _apiUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_apiUtils */ \"./src/_apiUtils.ts\");\nvar __assign = (undefined && undefined.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\n\n\n\n\n/** @internal */\nvar SERVER_RESPONSE_STATE = {};\n/** @internal */\nvar DEFAULT_GOOGLE_AUTH_STATE = { queryParamsCode: false };\n/** @internal */\nvar buttonStyling = {\n    backgroundSize: \"20px 20px\",\n    backgroundRepeat: \"no-repeat\",\n    backgroundPosition: \"12px 10px\",\n    textIndent: \"19px\",\n    border: \"1px solid #bdc3c7\",\n    padding: \"9px 23px\",\n    borderRadius: \"9px\",\n    backgroundColor: \"#bdc3c7\",\n    fontSize: \"18px\",\n};\n/** @internal */\nvar GoogleAuthContext = react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"](DEFAULT_GOOGLE_AUTH_STATE);\nvar GoogleAuth = GoogleAuthContext.Provider;\nvar GoogleAuthConsumer = GoogleAuthContext.Consumer;\n/** @internal */\nvar _getBackgroundImg = function (placeholder, styles) {\n    if (placeholder) {\n        return __assign(__assign({}, styles), { backgroundImage: \"url(\" + placeholder + \")\" });\n    }\n    return styles;\n};\n/** @internal */\nvar InnerButton = function (props) {\n    var _a = props.placeholder, placeholder = _a === void 0 ? \"\" : _a, _b = props.defaultStyle, defaultStyle = _b === void 0 ? true : _b, options = props.options;\n    var scopes = _src__WEBPACK_IMPORTED_MODULE_1__[\"Authorization\"].createScopes(options.scopes);\n    var auth = new _src__WEBPACK_IMPORTED_MODULE_1__[\"Authorization\"](options, scopes);\n    auth.createAuthorizationRequestURL();\n    var styles = defaultStyle ? _getBackgroundImg(placeholder, buttonStyling) : undefined;\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](\"button\", { style: styles, onClick: auth.redirect }, \"Sign in with google\");\n};\n/**\n * @example\n * **Quick Start:**\n *\n * First create an options object that implements an {@link  IAuthorizationOptions} type.\n * Check the {@link  IAuthorizationOptions} and {@link  IAuthorizationBase} types for\n * all required properties. Then, pass the options to the {@link GoogleButton} component.\n *\n * ```IAuthorizationOptions\n *  const options:  = {\n *      clientId: (process.env.CLIENT_ID as string),\n *       redirectUri: \"http://localhost:3000\",\n *       scopes: [\"openid\", \"profile\", \"email\"],\n *       includeGrantedScopes: true,\n *       accessType: \"offline\",\n *   };\n *\n *   <GoogleButton\n *         placeholder=\"demo/search.png\"\n *         options={options}\n *         apiUrl=\"http://localhost:5000/google_login\"\n *   />\n * ```\n * @param props see IGoogleButton\n * @constructor\n */\nvar GoogleButton = function (props) {\n    var callback = props.callback;\n    var _a = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useState\"])(SERVER_RESPONSE_STATE), responseState = _a[0], setResponseState = _a[1];\n    var currentUrl = new URLSearchParams(window.location.search);\n    var queryParamsCode = currentUrl.get(\"code\");\n    var queryParamsError = currentUrl.get(\"error\");\n    if (responseState.accessToken) {\n        Object(_apiUtils__WEBPACK_IMPORTED_MODULE_2__[\"storeAccessToken\"])(responseState.accessToken);\n        console.debug(\"`accessToken` set in local storage.\");\n        return null;\n    }\n    else if (responseState.error) {\n        console.error(\"Error: Api call failed with \" + queryParamsError + \" error.\");\n        return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](InnerButton, __assign({}, props, { error: responseState.error }));\n    }\n    else if (queryParamsCode) {\n        // Get rest of params\n        var queryParamsEmail = currentUrl.get(\"email\") || \"\";\n        var queryParamsScope = currentUrl.get(\"scope\") || \"\";\n        var serverResponseProps = {\n            email: queryParamsEmail,\n            scope: queryParamsScope,\n            code: queryParamsCode,\n            client_id: props.options.clientId,\n            apiUrl: props.apiUrl,\n            responseState: responseState,\n            setResponseState: setResponseState,\n        };\n        Object(_apiUtils__WEBPACK_IMPORTED_MODULE_2__[\"serverResponse\"])(serverResponseProps);\n        console.debug(\"Waiting for remote api response\");\n        return callback ? callback() : react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](react__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], null, \"Loading...\");\n    }\n    else if (queryParamsError) {\n        console.error(\"Error: Google login attempt failed with \" + queryParamsError + \" error.\");\n        return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](InnerButton, __assign({}, props, { error: queryParamsError }));\n    }\n    // Display button with no errors\n    return react__WEBPACK_IMPORTED_MODULE_0__[\"createElement\"](InnerButton, __assign({}, props));\n};\n\n\n//# sourceURL=webpack://react-bare-lib/./src/components.tsx?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Authorization, GoogleAPIConnectionStrings, GoogleButton, GoogleAuth, GoogleAuthConsumer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _authorization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./authorization */ \"./src/authorization.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"Authorization\", function() { return _authorization__WEBPACK_IMPORTED_MODULE_0__[\"Authorization\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GoogleAPIConnectionStrings\", function() { return _authorization__WEBPACK_IMPORTED_MODULE_0__[\"GoogleAPIConnectionStrings\"]; });\n\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components.tsx\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GoogleButton\", function() { return _components__WEBPACK_IMPORTED_MODULE_1__[\"GoogleButton\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GoogleAuth\", function() { return _components__WEBPACK_IMPORTED_MODULE_1__[\"GoogleAuth\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"GoogleAuthConsumer\", function() { return _components__WEBPACK_IMPORTED_MODULE_1__[\"GoogleAuthConsumer\"]; });\n\n\n\n\n\n\n//# sourceURL=webpack://react-bare-lib/./src/index.ts?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://react-bare-lib/external_%22react%22?");

/***/ })

/******/ });
});