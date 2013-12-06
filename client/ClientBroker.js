//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//



var client = client || {};
client.ClientBroker = client.ClientBroker || {};


client.ClientBroker.buildBridge = function() {

    if( 0 === location.protocol.indexOf("http") ) {
        return new client.BrowserBridge();
    }

    if( client.MobileBridge ) {
        return new client.MobileBridge();
    }

    if( client.DesktopBridge ) {
        return new client.DesktopBridge();
    }

    throw "Could not Find Appropriate Bridge";

};


client.ClientBroker.onFault = function () {if( console && console.error ) { console.error(arguments) } };
client.ClientBroker.onResponse = function () {};

client.ClientBroker.proxies = {};

client.ClientBroker.registerProxy = function(proxyName,proxy) {

    client.ClientBroker.proxies[proxyName] = proxy;
};


client.ClientBroker.forwardFault = function() {

    var proxy = client.ClientBroker.proxies[arguments[2]];

    if( proxy ) {

        arguments[2] = proxy;

        var method = proxy[arguments[5]];

        if( method ) {

            arguments[5] = method;

            var methodOnFault = method.onFault;
            if(  methodOnFault  ) {
                methodOnFault.apply(methodOnFault,arguments);
                return;
            }
        }

        var proxyOnFault = proxy.onFault;
        if( proxyOnFault  ) {
            proxyOnFault.apply(proxyOnFault,arguments);
            return;
        }
    }

    client.ClientBroker.onFault.apply(client.ClientBroker.onFault,arguments);

};

client.ClientBroker.forwardResponse = function() {

    var proxy = client.ClientBroker.proxies[arguments[2]];
    if( proxy  ) {

        arguments[2] = proxy; // replace the service-name with the associated proxy

        var method = proxy[arguments[5]];

        if( method  ) {

            arguments[5] = method;

            var methodOnResponse = method.onResponse;
            if(  methodOnResponse ) {
                methodOnResponse.apply(methodOnResponse,arguments);
                return;
            }
        }

        var proxyOnResponse = proxy.onResponse;
        if( proxyOnResponse ) {
            proxyOnResponse.apply(proxyOnResponse,arguments);
            return;
        }
    }

    client.ClientBroker.onResponse.apply(client.ClientBroker.onResponse,arguments);
};


