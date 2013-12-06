//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//


/**
 * In the absence of an interface, this class defines what methods an interface should implement
 * in order to function as a 'DescribedService'. See the Java/C#/Objective-C code for reference
 */
DescribedService = new function() {

}

/**
 *
 * @param {Object} request a 'BrokerMessage' request
 * @return {Object} a 'BrokerMessage' response or fault
 */
DescribedService.prototype.process = function( request ) {
}


// public ServiceDescription getServiceDescription();

/**
 *
 * @returns {string} the qualified name of the service, e.g. 'jsonbroker.TestService'
 */
DescribedService.prototype.getServiceName = function( ) {
    return "sample";
}
