//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license (http://opensource.org/licenses/MIT)
//

var jsonbroker=jsonbroker||{};if(console&&console.warn){console.warn("deprecated: use 'client/MobileBridge.js'")}
jsonbroker.MobileBridge=function(){}
jsonbroker.MobileBridge.prototype.dispatch=function(){var args=Array.prototype.slice.call(arguments);var jsonArgs=JSON.stringify(args);if(-1!==jsonArgs.indexOf('\\')){jsonArgs=jsonArgs.replace(/\\/g,"%5C");}
var call="jsonbroker:"+jsonArgs;var iframe=document.createElement("IFRAME");iframe.setAttribute("src",call);document.documentElement.appendChild(iframe);iframe.parentNode.removeChild(iframe);iframe=null;}
