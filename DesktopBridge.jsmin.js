//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//

var jsonbroker=jsonbroker||{};if(console&&console.warn){console.warn("deprecated: use 'jsonbroker.client.DesktopBridge.js'")}
jsonbroker.DesktopBridge=function(){}
jsonbroker.DesktopBridge.prototype.dispatch=function(){var args=Array.prototype.slice.call(arguments);var json=JSON.stringify(args);window.external.dispatch(json);}
