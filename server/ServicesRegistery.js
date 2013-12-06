//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//


ServicesRegistery = function() {

    this._services = {};
}

/**
 *
 * @param {Object} a 'BrokerMessage' request
 * @return {Object} a 'BrokerMessage' response
 */
ServicesRegistery.prototype.process = function( request ) {

    var service = this._services[request.serviceName];

    if( !service ) {

        var fault = request.buildFault();

        var ap = fault.associativeParamaters;
        ap["errorDomain"] =  "jsonbroker.ServicesRegistery.SERVICE_NOT_FOUND";
        ap["faultCode"] =  0x4e554c4c; // 'NULL'
        ap["faultContext"] = {"serviceName":request.serviceName,"methodName":request.methodName};
        ap["faultMessage"] = "!service; serviceName = '"+serviceName+"'";
        ap["originator"] = "ServicesRegistery.js: ServicesRegistery.prototype.process";
        ap["stackTrace"] = [];
        ap["underlyingFaultMessage"] =  null;


        return fault;

    }

    return service.process(request);

}


ServicesRegistery.prototype.addService = function( describedService ) {

    this._services[ describedService.getServiceName() ] = describedService;

}