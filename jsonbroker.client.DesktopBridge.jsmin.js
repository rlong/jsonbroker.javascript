//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//

if(console&&console.warn){console.warn("deprecated: use 'client/DesktopBridge.js'")}
var jsonbroker=jsonbroker||{};jsonbroker.client=jsonbroker.client||{};jsonbroker.client.DesktopBridge=function(){}
jsonbroker.client.DesktopBridge.prototype.dispatch=function(){var args=Array.prototype.slice.call(arguments);var json=JSON.stringify(args);window.external.dispatch(json);}
