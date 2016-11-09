module.exports=function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(2),o=n(55);e.exports=r.createExpressServer(function(e,t){return console.log("Starting User Import/Export Extension - Version:",config("CLIENT_VERSION")),o(e)})},function(e,t,n){e.exports.ArgumentError=n(42),e.exports.ForbiddenError=n(43),e.exports.HookTokenError=n(44),e.exports.ManagementApiError=n(45),e.exports.NotFoundError=n(46),e.exports.UnauthorizedError=n(47),e.exports.ValidationError=n(48)},function(e,t,n){const r=n(27),o=n(1),i=n(51),s=e.exports={};s.ArgumentError=o.ArgumentError,s.ForbiddenError=o.ForbiddenError,s.HookTokenError=o.HookTokenError,s.ManagementApiError=o.ManagementApiError,s.NotFoundError=o.NotFoundError,s.UnauthorizedError=o.UnauthorizedError,s.ValidationError=o.ValidationError,s.managementApi=n(38),s.FileStorageContext=i.FileStorageContext,s.WebtaskStorageContext=i.WebtaskStorageContext,s.BlobRecordProvider=n(39),s.config=n(40),s.configProvider=n(12),s.createServer=n(41).createServer,s.validateHookToken=n(53),s.SessionManager=n(49),s.createExpressServer=function(e){return r.fromExpress(s.createServer(e))},s.createHapiServer=function(e){return r.fromHapi(s.createServer(e))}},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=require("bluebird")},function(e,t){e.exports=require("jsonwebtoken")},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0}),t.JwksClient=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(8),a=r(u),c=n(9),l=r(c),p=n(14),d=(r(p),n(15)),h=r(d),f=n(17),g=r(f),v=n(62),m=n(64);t.JwksClient=function(){function e(t){var n=this;o(this,e),this.getSigningKey=function(e,t){n.logger("Fetching signing key for '"+e+"'"),n.getSigningKeys(function(r,o){if(r)return t(r);var i=o.find(function(t){return t.kid===e});return i?t(null,i):(n.logger("Unable to find a signing key that matches '"+e+"'"),t(new g.default("Unable to find a signing key that matches '"+e+"'")))})},this.options=i({rateLimit:!1,cache:!1,strictSsl:!0},t),this.logger=(0,a.default)("jwks"),this.options.rateLimit&&(this.getSigningKey=(0,m.rateLimitSigningKey)(this,t)),this.options.cache&&(this.getSigningKey=(0,m.cacheSigningKey)(this,t))}return s(e,[{key:"getKeys",value:function(e){var t=this;this.logger("Fetching keys from '"+this.options.jwksUri+"'"),(0,l.default)({json:!0,uri:this.options.jwksUri,strictSSL:this.options.strictSsl},function(n,r){return n||r.statusCode<200||r.statusCode>=300?(t.logger("Failure:",r&&r.body||n),e(r?new h.default(r.body&&(r.body.message||r.body)||r.statusMessage||"Http Error "+r.statusCode):n)):(t.logger("Keys:",r.body.keys),e(null,r.body.keys))})}},{key:"getSigningKeys",value:function(e){var t=this;this.getKeys(function(n,r){if(n)return e(n);if(!r||!r.length)return e(new h.default("The JWKS endpoint did not contain any keys"));var o=r.filter(function(e){return"sig"===e.use&&"RSA"===e.kty&&e.kid&&(e.x5c&&e.x5c.length||e.n&&e.e)}).map(function(e){return e.x5c&&e.x5c.length?{kid:e.kid,nbf:e.nbf,publicKey:(0,v.certToPEM)(e.x5c[0])}:{kid:e.kid,nbf:e.nbf,rsaPublicKey:(0,v.rsaPublicKeyToPEM)(e.n,e.e)}});return o.length?(t.logger("Signing Keys:",o),e(null,o)):e(new h.default("The JWKS endpoint did not contain any signing keys"))})}}]),e}()},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.SigningKeyNotFoundError=t.JwksRateLimitError=t.JwksError=t.ArgumentError=void 0;var o=n(14),i=r(o),s=n(15),u=r(s),a=n(16),c=r(a),l=n(17),p=r(l);t.ArgumentError=i.default,t.JwksError=u.default,t.JwksRateLimitError=c.default,t.SigningKeyNotFoundError=p.default},function(e,t){e.exports=require("debug")},function(e,t){e.exports=require("request")},function(e,t){e.exports=require("url")},function(e,t,n){const r=n(36),o=n(37),i=n(31);e.exports.createServer=r.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i},function(e,t,n){const r=n(3),o=n(1).ArgumentError;e.exports.fromWebtaskContext=function(e){if(null===e||void 0===e)throw new o("Must provide a webtask context");const t={AUTH0_RTA:"auth0.auth0.com"},n=r.assign(t,{NODE_ENV:"production",CLIENT_VERSION:"1.6.0"},e.params,e.secrets,{NODE_ENV:"production",HOSTING_ENV:"webtask"});return function(e){return n[e]}}},function(e,t,n){function r(e){return e&&"[object Function]"==g.call(e)}function o(e){return function(t,n,r){f.get(e+"/userinfo").set("Authorization","Bearer "+t.body.access_token).end(function(e,o){return e?void n.redirect(n.locals.baseUrl):(t.userInfo=o.body,void r())})}}function i(e,t){return function(n,o,i){var s=e;r(e)&&(s=e(n)),n.apiToken=h.sign(n.userInfo,s,{algorithm:"HS256",issuer:o.locals.baseUrl,expiresIn:t}),delete n.userinfo,i()}}function s(e,t){var n=["html","  head","    script.","      window.location.href = '#{returnTo}';","  body"].join("\n"),r=a.compile(n)({returnTo:e.query&&e.query.returnTo?e.query.returnTo:t.locals.baseUrl});return r}var u=n(22),a=n(72),c=n(23),l=n(10),p=n(28),d=n(21),h=n(5),f=n(26),g={}.toString;e.exports=function(e){var t=864e5,r=u.Router(),f=function(e,t,n){n()},g=[f];return e=e||{},e.clientName=e.clientName||"Auth0 Extension",e.clientId=e.clientId,e.exp=e.exp||t,e.credentialsRequired="undefined"!=typeof e.credentialsRequired&&e.credentialsRequired,e.scopes=e.scopes+" openid profile",e.responseType=e.responseType||"token",e.tokenExpiresIn=e.tokenExpiresIn||"10h",e.rootTenantAuthority=e.rootTenantAuthority||"https://auth0.auth0.com",e.authenticatedCallback=e.authenticatedCallback||function(e,t,n,r){r()},e.apiToken&&!e.apiToken.secret&&(console.log('You are using a "development secret" for API token generation. Please setup your secret on "apiToken.secret".'),e.apiToken.secret=n(69).randomBytes(32).toString("hex")),e.apiToken&&e.apiToken.secret&&(g=[o(e.rootTenantAuthority),e.apiToken.payload||f,i(e.apiToken.secret,e.tokenExpiresIn)]),r.use(function(e,t,n){var r="https",o=l.parse(e.originalUrl).pathname.replace(e.path,"");t.locals.baseUrl=l.format({protocol:r,host:e.get("host"),pathname:o}),n()}),r.use(d.urlencoded({extended:!1})),r.use(c({secret:p(),algorithms:["RS256"],credentialsRequired:e.credentialsRequired}).unless({path:["/login","/callback"]})),r.get("/login",function(t,n){var r=n.locals.baseUrl+"/callback";t.query.returnTo&&(r+="?returnTo="+encodeURIComponent(t.query.returnTo));var o;if("string"==typeof e.audience)o="&audience="+encodeURIComponent(e.audience);else if("function"==typeof e.audience){var i=e.audience(t);"string"==typeof i&&(o="&audience="+encodeURIComponent(i))}var s=[e.rootTenantAuthority+"/i/oauth2/authorize","?client_id="+(e.clientId||n.locals.baseUrl),"&response_type="+e.responseType,"&response_mode=form_post","&scope="+encodeURIComponent(e.scopes),"&expiration="+e.exp,"&redirect_uri="+r,o].join("");n.redirect(s)}),r.get("/logout",function(t,n){var r=["html","  head","    script.","      sessionStorage.removeItem('token')","      sessionStorage.removeItem('apiToken')","      window.location.href = '"+e.rootTenantAuthority+"/v2/logout?returnTo=#{baseUrl}&client_id=#{baseUrl}';","  body"].join("\n"),o=a.compile(r)({baseUrl:n.locals.baseUrl});n.header("Content-Type","text/html"),n.status(200).send(o)}),r.post("/callback",g,function(t,n){var r=t.body.access_token,o=h.decode(r,{complete:!0})||{};p()(t,o.header,o.payload,function(o,i){if(o)return n.status(200).send(s(n,n));try{var u,c=h.verify(r,i,{algorithms:["RS256"]}),l=c.aud;if("string"==typeof e.audience)u=e.audience;else if("function"==typeof e.audience){var p=e.audience(t);"string"==typeof p&&(u=p)}if(l===u||l.indexOf(u)===-1)return n.header("Content-Type","text/html"),n.status(200).send(s(t,n))}catch(e){return n.status(200).send(s(n,n))}e.authenticatedCallback(t,n,t.body.access_token,function(e){if(e)return n.sendStatus(500);var r=["html","  head","    script.","      sessionStorage.setItem('token', '"+t.body.access_token+"');",1===g.length?"":"      sessionStorage.setItem('apiToken', '"+t.apiToken+"');","      window.location.href = '#{returnTo}';","  body"].join("\n"),o=a.compile(r)({returnTo:t.query.returnTo?t.query.returnTo:n.locals.baseUrl});n.header("Content-Type","text/html"),n.status(200).send(o)})})}),r.get("/.well-known/oauth2-client-configuration",function(t,n){n.header("Content-Type","application/json"),n.status(200).send({redirect_uris:[n.locals.baseUrl+"/callback"],client_name:e.clientName,post_logout_redirect_uris:[n.locals.baseUrl]})}),r}},function(e,t){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ArgumentError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksRateLimitError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="SigningKeyNotFoundError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}var o=n(6),i=n(7),s=r(i),u=n(61),a=n(60);e.exports=function(e){return new o.JwksClient(e)},e.exports.ArgumentError=s.ArgumentError,e.exports.JwksError=s.JwksError,e.exports.JwksRateLimitError=s.JwksRateLimitError,e.exports.SigningKeyNotFoundError=s.SigningKeyNotFoundError,e.exports.expressJwtSecret=a.expressJwtSecret,e.exports.hapiJwt2Key=u.hapiJwt2Key},function(e,t){var n=function(e,t,n,r){if(this.bucketSize=e,this.tokensPerInterval=t,"string"==typeof n)switch(n){case"sec":case"second":this.interval=1e3;break;case"min":case"minute":this.interval=6e4;break;case"hr":case"hour":this.interval=36e5;break;case"day":this.interval=864e5}else this.interval=n;this.parentBucket=r,this.content=0,this.lastDrip=+new Date};n.prototype={bucketSize:1,tokensPerInterval:1,interval:1e3,parentBucket:null,content:0,lastDrip:0,removeTokens:function(e,t){function n(){var n=Math.ceil((e-r.content)*(r.interval/r.tokensPerInterval));return setTimeout(function(){r.removeTokens(e,t)},n),!1}var r=this;return this.bucketSize?e>this.bucketSize?(process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds bucket size "+this.bucketSize,null)),!1):(this.drip(),e>this.content?n():this.parentBucket?this.parentBucket.removeTokens(e,function(o,i){return o?t(o,null):e>r.content?n():(r.content-=e,void t(null,Math.min(i,r.content)))}):(this.content-=e,process.nextTick(t.bind(null,null,this.content)),!0)):(process.nextTick(t.bind(null,null,e,Number.POSITIVE_INFINITY)),!0)},tryRemoveTokens:function(e){return!(this.bucketSize&&(e>this.bucketSize||(this.drip(),e>this.content||this.parentBucket&&!this.parent.tryRemoveTokens(e)||(this.content-=e,0))))},drip:function(){if(!this.tokensPerInterval)return void(this.content=this.bucketSize);var e=+new Date,t=Math.max(e-this.lastDrip,0);this.lastDrip=e;var n=t*(this.tokensPerInterval/this.interval);this.content=Math.min(this.content+n,this.bucketSize)}},e.exports=n},function(e,t,n){const r=n(24),o=n(3),i=["max","maxAge","length","dispose","stale"];e.exports=function(e){const t=new r(o.pick(e,i)),n=e.load,s=e.hash,u=e.bypass,a=e.itemMaxAge,c=new Map;if(e.disable)return n;const l=function(){const e=o.toArray(arguments),r=e.slice(0,-1),i=e.slice(-1).pop(),l=this;var p;if(u&&u.apply(l,r))return n.apply(l,e);p=0!==r.length||s?s.apply(l,r):"_";var d=t.get(p);return d?i.apply(null,[null].concat(d)):void(c.get(p)?c.get(p).push(i):(c.set(p,[]),n.apply(l,r.concat(function(e){const n=o.toArray(arguments);if(!e){const s=n.slice(1);a?t.set(p,s,a.apply(l,r.concat(s))):t.set(p,s)}c.get(p).forEach(function(e){e.apply(null,n)}),c.delete(p),i.apply(null,n)}))))};return l.keys=t.keys.bind(t),l},e.exports.sync=function(e){const t=new r(o.pick(e,i)),n=e.load,s=e.hash,u=e.disable,a=e.bypass,c=this,l=e.itemMaxAge;if(u)return n;const p=function(){var e=o.toArray(arguments);if(a&&a.apply(c,arguments))return n.apply(c,arguments);var r=s.apply(c,e),i=t.get(r);if(i)return i;const u=n.apply(c,e);return l?t.set(r,u,l.apply(c,e.concat([u]))):t.set(r,u),u};return p.keys=t.keys.bind(t),p}},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("express")},function(e,t){e.exports=require("express-jwt")},function(e,t){e.exports=require("lru-cache")},function(e,t){e.exports=require("ms")},function(e,t){e.exports=require("superagent")},function(e,t){e.exports=require("webtask-tools")},function(e,t,n){function r(e){return e=e.match(/.{1,64}/g).join("\n"),e="-----BEGIN CERTIFICATE-----\n"+e,e+="\n-----END CERTIFICATE-----\n"}var o=n(24),i=n(9),s=n(3),u={max:5242880,length:function(e){return e.length},maxAge:3e5},a=o(u);e.exports=function(e){return e=e||{},e.strictSSL="undefined"==typeof e.strictSSL||e.strictSSL,function(t,n,o,u){var c=o.iss+"|"+o.aud,l=a.get(c);if(l)return u(null,l);switch(n.alg){case"RS256":var p=o.iss+".well-known/jwks.json";i.get(p,{json:!0,strictSSL:e.strictSSL},function(e,t,i){if(e)return u(e);if(200!==t.statusCode)return u(new Error("Failed to obtain JWKS from "+o.iss));var l=s.find(i.keys,function(e){return e.kid==n.kid});if(!l)return u(new Error("Failed to obtain signing key used by "+o.iss));var p=r(l.x5c[0]);return a.set(c,p),u(null,p)});break;default:return u(new Error("Unsupported JWT algorithm: "+n.alg))}}}},function(e,t,n){const r=n(23),o=n(18),i=n(2).UnauthorizedError;e.exports=function(e,t){return r({secret:o.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return t(e instanceof o.SigningKeyNotFoundError?new i("A token was provided with an invalid kid"):e)}}),audience:t,issuer:"https://"+e+"/",algorithms:["RS256"]})}},function(e,t,n){e.exports=function(e){return function(t,n,r,o){return e&&e(t),t&&t.status?(r.status(t.status),r.json({error:t.code||t.name,message:t.message||t.name})):(r.status(t.status||500),r.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,n){e.exports.authenticateUser=n(29),e.exports.requireUser=n(33),e.exports.errorHandler=n(30),e.exports.managementApiClient=n(32),e.exports.validateHookToken=n(34),e.exports.webtaskConfig=n(35)},function(e,t,n){const r=n(2);e.exports=function(e){return function(t,n,o){const i=t;r.managementApi.getClient(e).then(function(e){return i.auth0=e,o()}).catch(function(e){o(e)})}}},function(e,t,n){const r=n(2).UnauthorizedError;e.exports=function(e,t,n){return e.user?n():n(new r("Authentication required for this endpoint."))}},function(e,t,n){const r=n(2);e.exports=function(e,t,n){if(null===e||void 0===e)throw new r.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new r.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new r.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new r.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===n||void 0===n)throw new r.ArgumentError("Must provide the extensionSecret");if("string"!=typeof n||0===n.length)throw new r.ArgumentError("The provided extensionSecret is invalid: "+n);return function(o){if(null===o||void 0===o)throw new r.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new r.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,u){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const a=i.headers.authorization.split(" ")[1];try{if(r.validateHookToken(e,t,o,n,a))return u()}catch(e){return u(e)}}return u(new r.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,n){const r=n(2);e.exports=function(e){return function(t,n,o){return t.webtaskContext&&e.setProvider(r.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,n){const r=n(2),o=n(27);e.exports.createServer=function(e){return o.fromExpress(r.createServer(e))}},function(e,t,n){const r=n(10),o=function(e,t){var n=r.parse(e).pathname||"";return n=n.replace(t,"").replace(/^\/|\/$/g,""),n.startsWith("/")||(n="/"+n),n.endsWith("/")||(n+="/"),n};e.exports.getBasePath=function(e){return o(e.originalUrl||"",e.path)},e.exports.getBaseUrl=function(e){const t=r.parse(e.originalUrl||"").pathname||"";return r.format({protocol:"https",host:e.get("host"),pathname:t.replace(e.path,"")})}},function(e,t,n){const r=n(25),o=n(5),i=n(68),s=n(4),u=n(20),a=n(26),c=n(1).ArgumentError,l=n(1).ManagementApiError,p=function(e,t,n){return new s(function(r,o){a.post("https://"+e+"/oauth/token").send({audience:"https://"+e+"/api/v2/",client_id:t,client_secret:n,grant_type:"client_credentials"}).set("Accept","application/json").end(function(e,n){return e&&401===e.status?o(new l("unauthorized","Invalid credentials for "+t,e.status)):e&&n&&n.body&&n.body.error?o(new l(n.body.error,n.body.error_description||n.body.error,e.status)):e?o(e):n.ok&&n.body.access_token?r(n.body.access_token):o(new l("unknown_error","Unknown error from Management Api or no access token was provided: "+(n.text||n.status)))})})},d=s.promisify(u({load:function(e,t,n,r){p(e,t,n).then(function(e){return r(null,e)}).catch(function(e){return r(e)})},hash:function(e,t,n){return e+"-"+t+"-"+n},itemMaxAge:function(e,t,n,r){try{const i=o.decode(r),s=new Date(0);s.setUTCSeconds(i.exp);const u=(new Date).valueOf();return s.valueOf()-u-1e4}catch(e){return 1e3}},max:100,maxAge:r("1h")}));e.exports.getAccessToken=p,e.exports.getAccessTokenCached=d,e.exports.getClient=function(e){if(null===e||void 0===e)throw new c("An options object must be provided");if(null===e.domain||void 0===e.domain)throw new c("An options object must contain the domain");if("string"!=typeof e.domain||0===e.domain.length)throw new c("The provided domain is invalid: "+e.domain);if(e.accessToken){if("string"!=typeof e.accessToken||0===e.accessToken.length)throw new c("The provided accessToken is invalid");return s.resolve(new i.ManagementClient({domain:e.domain,token:e.accessToken}))}if(null===e.clientId||void 0===e.clientId)throw new c("An options object must contain the clientId");if("string"!=typeof e.clientId||0===e.clientId.length)throw new c("The provided clientId is invalid: "+e.clientId);if(null===e.clientSecret||void 0===e.clientSecret)throw new c("An options object must contain the clientSecret");if("string"!=typeof e.clientSecret||0===e.clientSecret.length)throw new c("The provided clientSecret is invalid");return d(e.domain,e.clientId,e.clientSecret).then(function(t){return new i.ManagementClient({domain:e.domain,token:t})})}},function(e,t,n){function r(e){if(null===e||void 0===e)throw new s("Must provide a storage context");this.storageContext=e}const o=n(3),i=n(74),s=n(1).ArgumentError,u=n(1).NotFoundError,a=n(1).ValidationError,c=function(e,t){return e.read(t).then(function(e){return e[t]=e[t]||[],e})};r.prototype.getAll=function(e){return c(this.storageContext,e).then(function(t){return t[e]})},r.prototype.get=function(e,t){return this.getAll(e).then(function(n){const r=o.find(n,function(e){return e._id===t});return r?r:Promise.reject(new u("The record "+t+" in "+e+" does not exist."))})},r.prototype.create=function(e,t){const n=this.storageContext;return c(n,e).then(function(r){t._id||(t._id=i.v4());const s=o.findIndex(r[e],function(e){return e._id===t._id});return s>-1?Promise.reject(new a("The record "+t._id+" in "+e+" already exists.")):(r[e].push(t),n.write(r).then(function(){return t}))})},r.prototype.update=function(e,t,n,r){const i=this.storageContext;return c(i,e).then(function(s){const a=o.findIndex(s[e],function(e){return e._id===t});if(a<0&&!r)throw new u("The record "+t+" in "+e+" does not exist.");const c=o.extend({_id:t},a<0?{}:s[e][a],n);return a<0?s[e].push(c):s[e][a]=c,i.write(s).then(function(){return c})})},r.prototype.delete=function(e,t){const n=this.storageContext;return c(n,e).then(function(r){const i=o.findIndex(r[e],function(e){return e._id===t});return!(i<0)&&(r[e].splice(i,1),n.write(r).then(function(){return!0}))})},e.exports=r},function(e,t){e.exports=function(){var e=null;const t=function(t){if(!e)throw new Error("A configuration provider has not been set");return e(t)};return t.setProvider=function(t){e=t},t}},function(e,t,n){const r=n(12);e.exports.createServer=function(e){var t=null;return function(n){if(!t){const o=r.fromWebtaskContext(n);t=e(o,n.storage)}return t}}},function(e,t){function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ArgumentError",this.message=e,this.status=400}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ForbiddenError",this.message=e,this.status=403}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e,t){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="HookTokenError",this.message=e,this.status=401,this.innerError=t}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e,t,n){Error.call(this,t),Error.captureStackTrace(this,this.constructor),this.name="ManagementApiError",this.code=e,this.message=t,this.status=n||400}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="NotFoundError",this.message=e,this.status=404}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="UnauthorizedError",this.message=e,this.status=401}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ValidationError",this.message=e,this.status=400}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,n){function r(e,t,n){if(null===e||void 0===e)throw new u("Must provide a valid domain");if("string"!=typeof e||0===e.length)throw new u("The provided rta is invalid: "+e);if(null===t||void 0===t)throw new u("Must provide a valid domain");if("string"!=typeof t||0===t.length)throw new u("The provided domain is invalid: "+t);if(null===n||void 0===n)throw new u("Must provide a valid clientId");if("string"!=typeof n||0===n.length)throw new u("The provided clientId is invalid: "+n);this.options={rta:e,domain:t,clientId:n},this.jwksClient=s({cache:!0,rateLimit:!0,jwksRequestsPerMinute:10,jwksUri:"https://"+e+"/.well-known/jwks.json"}),this.managementApiAudience="https://"+t+"/api/v2/"}const o=n(5),i=n(4),s=n(18),u=n(1).ArgumentError,a=n(1).UnauthorizedError,c=n(1).ValidationError;r.prototype.createAuthorizeUrl=function(e){if(null===e||void 0===e)return i.reject(new u("Must provide the options"));if(null===e.redirectUri||void 0===e.redirectUri)return i.reject(new u("Must provide the redirectUri"));if("string"!=typeof e.redirectUri||0===e.redirectUri.length)return i.reject(new u("The provided redirectUri is invalid: "+e.redirectUri));var t="openid name email";return e.scopes&&e.scopes.length&&(t+=" "+e.scopes),["https://"+this.options.rta+"/i/oauth2/authorize","?client_id="+encodeURIComponent(this.options.clientId),"&response_type=token","&response_mode=form_post","&scope="+encodeURIComponent(t),"&expiration="+(e.expiration||36e3),"&redirect_uri="+encodeURIComponent(e.redirectUri),"&audience="+encodeURIComponent(this.managementApiAudience)].join("")},r.prototype.validateToken=function(e,t,n){const r=this;return new i(function(e,i){const s=o.decode(n,{complete:!0});return null==s?i(new c("Unable to decoded the token.")):r.jwksClient.getSigningKey(s.header.kid,function(s,u){if(s)return i(s);const c=u.publicKey||u.rsaPublicKey;return o.verify(n,c,{algorithms:["RS256"]},function(n,o){return n?i(n):o.iss!=="https://"+r.options.rta+"/"?i(new a("Invalid issuer: "+o.iss)):o&&(o.aud===t||Array.isArray(o.aud)&&o.aud.indexOf(t)>-1)?e(o):i(new a("Audience mismatch for: "+t))})})})},r.prototype.create=function(e,t,n){if(null===e||void 0===e)return i.reject(new u("Must provide an id_token"));if("string"!=typeof e||0===e.length)return i.reject(new u("The provided id_token is invalid: "+e));if(null===t||void 0===t)return i.reject(new u("Must provide an access_token"));if("string"!=typeof t||0===t.length)return i.reject(new u("The provided access_token is invalid: "+t));if(null===n||void 0===n)return i.reject(new u("Must provide the options"));if(null===n.secret||void 0===n.secret)return i.reject(new u("Must provide the secret"));if("string"!=typeof n.secret||0===n.secret.length)return i.reject(new u("The provided secret is invalid: "+n.secret));if(null===n.audience||void 0===n.audience)return i.reject(new u("Must provide the audience"));if("string"!=typeof n.audience||0===n.audience.length)return i.reject(new u("The provided audience is invalid: "+n.audience));if(null===n.issuer||void 0===n.issuer)return i.reject(new u("Must provide the issuer"));if("string"!=typeof n.issuer||0===n.issuer.length)return i.reject(new u("The provided issuer is invalid: "+n.issuer));const r=this;return i.all([r.validateToken(r.options.clientId,r.options.clientId,e),r.validateToken(r.options.clientId,r.managementApiAudience,t)]).then(function(e){if(e[1].azp!==r.options.clientId)return i.reject(new a("The access_token's azp does not match the id_token"));if(e[0].sub!==e[1].sub)return i.reject(new a("Subjects don't match"));const s={sub:e[0].sub,email:e[0].email,exp:e[0].exp,access_token:t};return o.sign(s,n.secret,{algorithm:"HS256",issuer:n.issuer,audience:n.audience})})},e.exports=r},function(e,t,n){function r(e,t){if(null===e||void 0===e)throw new u("Must provide the path to the file");if("string"!=typeof e||0===e.length)throw new u("The provided path is invalid: "+e);t=t||{mergeWrites:!0},this.path=e,this.mergeWrites=t.mergeWrites,this.defaultData=t.defaultData||{}}const o=n(3),i=n(71),s=n(4),u=n(1).ArgumentError;r.prototype.read=function(){const e=this;return new s(function(t,n){i.readFile(e.path,"utf8",function(r,o){if(r)return"ENOENT"===r.code?t(e.defaultData):n(r);try{return t(o&&o.length?JSON.parse(o):e.defaultData)}catch(e){return n(e)}})})},r.prototype.write=function(e){const t=this;var n=s.resolve(e);return t.mergeWrites&&(n=n.then(function(e){return t.read().then(function(t){return o.extend({},t,e)})})),n.then(function(e){return new s(function(n,r){try{return i.writeFile(t.path,JSON.stringify(e,null,2),"utf8",function(e){return e?r(e):n()})}catch(e){return r(e)}})})},e.exports=r},function(e,t,n){e.exports.FileStorageContext=n(50),e.exports.WebtaskStorageContext=n(52)},function(e,t,n){function r(e,t){if(null===e||void 0===e)throw new i("Must provide the Webtask storage object");t=t||{force:1},this.storage=e,this.options=t,this.defaultData=t.defaultData||{}}const o=n(4),i=n(1).ArgumentError;r.prototype.read=function(){const e=this;return new o(function(t,n){e.storage.get(function(r,o){return r?n(r):t(o||e.defaultData)})})},r.prototype.write=function(e){const t=this;return new o(function(n,r){t.storage.set(e,t.options,function(e){return e?r(e):n()})})},e.exports=r},function(e,t,n){const r=n(5),o=n(1).HookTokenError;e.exports=function(e,t,n,i,s){if(!s)throw new o("Hook token missing");try{return r.verify(s,i,{audience:t+n,issuer:"https://"+e}),!0}catch(e){throw new o("Invalid hook token",e)}}},function(e,t,n){"use strict";var r=n(70),o=n(73),i=n(11).urlHelpers;e.exports=function(){var e='\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <title>User Import / Export Dashboard</title>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/2.0.1/lib/logos/img/favicon.png">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.973/css/index.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/3.8.4/index.css">\n      <% if (assets.version) { %>\n        <link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.css">\n      <% } %>\n    </head>\n    <body>\n      <div id="app"></div>\n      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;</script>\n      <script type="text/javascript" src="//cdn.auth0.com/js/lock-9.0.min.js"></script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/components/ZeroClipboard/ZeroClipboard.js"></script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/js/bundle.js"></script>\n      <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"></script><% } %>\n      <% if (assets.version) { %>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.vendors.<%= assets.version %>.js"></script>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.js"></script>\n      <% } %>\n    </body>\n    </html>\n  ';return function(t,n){var s={HOSTING_ENV:o.get("HOSTING_ENV"),CLIENT_VERSION:o.get("CLIENT_VERSION")||"???",AUTH0_DOMAIN:o.get("AUTH0_DOMAIN"),BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t)};0!==s.BASE_PATH.indexOf("/")&&(s.BASE_PATH="/"+s.BASE_PATH);var u=o.get("CLIENT_VERSION");return u?n.send(r.render(e,{config:s,assets:{version:u}})):n.send(r.render(e,{config:s,assets:{app:"http://localhost:3001/app/bundle.js"}}))}}},function(e,t,n){"use strict";var r=(n(75),n(22)),o=(n(21),n(13),n(9),n(11)),i=n(57),s=n(56),u=n(59),a=n(54),c=n(58);e.exports=function(e){s.setProvider(e);var t=r();return t.use("/meta",function(e,t){t.status(200).send(u)}),t.use(c(s("AUTH0_DOMAIN"),"User Import / Export Extension",s("AUTH0_RTA"))),t.get("*",a()),t.use(o.middlewares.errorHandler(i.error.bind(i))),t}},function(e,t,n){"use strict";e.exports=n(2).config()},function(e,t,n){"use strict";var r=n(76);r.emitErrs=!0;var o=new r.Logger({transports:[new r.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t,n){"use strict";var r=n(10),o=n(13);e.exports=function(e,t,n){if(!e)throw new Error("Domain is required");if(!t)throw new Error("title is required");var i={credentialsRequired:!1,scopes:"create:users read:users read:connections",
clientName:t,audience:function(){return"https://"+e+"/api/v2/"},rootTenantAuthority:n},s=o(i);return function(e,t,n){var o="https",u=r.parse(e.originalUrl).pathname.replace(e.path,""),a=r.format({protocol:o,host:e.get("host"),pathname:u});return i.clientId=a,s(e,t,n)}}},function(e,t){e.exports={title:"User Import / Export",name:"auth0-user-import-export",version:"1.5.0",author:"auth0",description:"This extension allows you to import/export users from/to your account.",type:"application",logoUrl:"https://cdn.rawgit.com/auth0/auth0-user-import-export-extension/master/assets/logo.svg",initialUrlPath:"/login",repository:"https://github.com/auth0/auth0-user-import-export-extension",keywords:["auth0","extension"],auth0:{scopes:"create:users read:users read:connections"}}},function(e,t,n){"use strict";var r=n(7),o=n(6),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null):e?t(e):void 0};e.exports.expressJwtSecret=function(e){if(null===e||void 0===e)throw new r.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),n=e.handleSigningKeyError||i;return function(e,r,o,i){return r&&"RS256"===r.alg?void t.getSigningKey(r.kid,function(e,t){return e?n(e,function(e){return i(e,null)}):i(null,t.publicKey||t.rsaPublicKey)}):i(null,null)}}},function(e,t,n){"use strict";var r=n(7),o=n(6),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null,null,null):e?t(e,null,null):void 0};e.exports.hapiJwt2Key=function(e){if(null===e||void 0===e)throw new r.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),n=e.handleSigningKeyError||i;return function(e,r){return e&&e.header?"RS256"!==e.header.alg?r(null,null,null):void t.getSigningKey(e.header.kid,function(e,t){return e?n(e,function(e){return r(e,null,null)}):r(null,t.publicKey||t.rsaPublicKey,t)}):r(null,null,null)}}},function(e,t){"use strict";function n(e){return e=e.match(/.{1,64}/g).join("\n"),e="-----BEGIN CERTIFICATE-----\n"+e+"\n-----END CERTIFICATE-----\n"}function r(e){var t=e[0];return t<"0"||t>"7"?"00"+e:e}function o(e){var t=e.toString(16);return t.length%2?"0"+t:t}function i(e){if(e<=127)return o(e);var t=o(e),n=128+t.length/2;return o(n)+t}function s(e,t){var n=new Buffer(e,"base64"),o=new Buffer(t,"base64"),s=r(n.toString("hex")),u=r(o.toString("hex")),a=s.length/2,c=u.length/2,l=i(a),p=i(c),d="30"+i(a+c+l.length/2+p.length/2+2)+"02"+l+s+"02"+p+u,h=new Buffer(d,"hex").toString("base64"),f="-----BEGIN RSA PUBLIC KEY-----\n";return f+=""+h.match(/.{1,64}/g).join("\n"),f+="\n-----END RSA PUBLIC KEY-----\n"}Object.defineProperty(t,"__esModule",{value:!0}),t.certToPEM=n,t.rsaPublicKeyToPEM=s},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length<=1||void 0===arguments[1]?options:arguments[1],n=t.cacheMaxEntries,r=void 0===n?5:n,o=t.cacheMaxAge,s=void 0===o?(0,i.default)("10h"):o,a=(0,u.default)("jwks"),l=e.getSigningKey;return a("Configured caching of singing keys. Max: "+r+" / Age: "+s),(0,c.default)({load:function(e,t){l(e,function(n,r){return n?t(n):(a("Caching signing key for '"+e+"':",r),t(null,r))})},hash:function(e){return e},maxAge:s,max:r})};var o=n(25),i=r(o),s=n(8),u=r(s),a=n(20),c=r(a)},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.rateLimitSigningKey=t.cacheSigningKey=void 0;var o=n(63),i=r(o),s=n(65),u=r(s);t.cacheSigningKey=i.default,t.rateLimitSigningKey=u.default},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length<=1||void 0===arguments[1]?options:arguments[1],n=t.jwksRequestsPerMinute,r=void 0===n?10:n,o=(0,i.default)("jwks"),u=e.getSigningKey,c=new s.RateLimiter(r,"minute",!0);return o("Configured rate limiting to JWKS endpoint at "+r+"/minute"),function(e,t){c.removeTokens(1,function(n,r){return n?t(n):(o("Requests to the JWKS endpoint available for the next minute:",r),r<0?(o("Too many requests to the JWKS endpoint"),t(new a.default("Too many requests to the JWKS endpoint"))):u(e,t))})}};var o=n(8),i=r(o),s=n(66),u=n(16),a=r(u)},function(e,t,n){t.RateLimiter=n(67),t.TokenBucket=n(19)},function(e,t,n){var r=n(19),o=function(e,t,n){this.tokenBucket=new r(e,e,t,null),this.tokenBucket.content=e,this.curIntervalStart=+new Date,this.tokensThisInterval=0,this.fireImmediately=n};o.prototype={tokenBucket:null,curIntervalStart:0,tokensThisInterval:0,fireImmediately:!1,removeTokens:function(e,t){function n(n,o){return n?t(n,null):(r.tokensThisInterval+=e,void t(null,o))}if(e>this.tokenBucket.bucketSize)return process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds maximum tokens per interval "+this.tokenBucket.bucketSize,null)),!1;var r=this,o=Date.now();if(o-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=o,this.tokensThisInterval=0),e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval){if(this.fireImmediately)process.nextTick(t.bind(null,null,-1));else{var i=Math.ceil(this.curIntervalStart+this.tokenBucket.interval-o);setTimeout(function(){r.tokenBucket.removeTokens(e,n)},i)}return!1}return this.tokenBucket.removeTokens(e,n)},tryRemoveTokens:function(e){if(e>this.tokenBucket.bucketSize)return!1;var t=Date.now();return t-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=t,this.tokensThisInterval=0),!(e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval)&&this.tokenBucket.tryRemoveTokens(e)},getTokensRemaining:function(){return this.tokenBucket.drip(),this.tokenBucket.content}},e.exports=o},function(e,t){e.exports=require("auth0@2.1.0")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("ejs")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("jade")},function(e,t){e.exports=require("nconf")},function(e,t){e.exports=require("node-uuid")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("winston")}]);