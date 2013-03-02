//  Copyright (c) 2013 Richard Long & HexBeerium
//
//  Released under the MIT license ( http://opensource.org/licenses/MIT )
//
// vvv 20F6A984-B4D1-45B4-9312-0CA7FD888FE7 file_preprocessor.application.j2se.jsmin.JavascriptMinify


var actuator = actuator || {};


actuator.touchSupported = true

//http://www.2c2d.co.uk/articles/jquery-and-mobile-safari-touch-events
// http://modernizr.github.com/Modernizr/touch.html
try {
    document.createEvent("TouchEvent");
} catch(e) {
    actuator.touchSupported = false;
}

actuator.startEvent = "mousedown";
actuator.commitEvent = "click";

if( actuator.touchSupported ) {
    actuator.startEvent = "touchstart";
    actuator.commitEvent = "touchend";
}


// vvv iOS 4 WebView does not support HTMLElement.classList

actuator.ClassList = function(htmlElement) {
    this._htmlElement = htmlElement;
}

actuator.ClassList.prototype.remove = function( activeClass ) {

    activeClass = " " + activeClass; // padding

    var clazz = this._htmlElement.getAttribute( "class");
    if( !clazz ) {
        return;
    }

    clazz = clazz.replace( activeClass, "" );
    this._htmlElement.setAttribute( "class", clazz );

}

actuator.ClassList.prototype.add = function( activeClass ) {

    activeClass = " " + activeClass; // padding

    var clazz = this._htmlElement.getAttribute( "class");
    if( !clazz ) {
        this._htmlElement.setAttribute( "class", activeClass );
        return;
    }
    clazz = clazz + activeClass;
    this._htmlElement.setAttribute( "class", clazz );

}

// ^^^ iOS 4 WebView does not support HTMLElement.classList


actuator.currentTarget = null;


actuator.updateCurrentTarget = function(nextTarget, activeClass) {

    if( nextTarget == actuator.currentTarget ) {
        return;
    }

    // switching away from actuator.currentTarget
    if( null != actuator.currentTarget ) {
        actuator.currentTarget.classList.remove( activeClass );
    }

    if( null != nextTarget ) {
        nextTarget.classList.add( activeClass );
    }

    actuator.currentTarget = nextTarget;

}


actuator.setupActuator = function( listSpecifier, activeClass, onActuateStart, onActuateCommit ) {

    // vvv iOS 4 WebView does not support HTMLElement.classList

    // selector.selectAllAndApply = function( listSpecifier, func, root ) {
    listSpecifier = selector.selectAllAndApply( listSpecifier, function(){
        if( !this.classList) {
            this.classList = new actuator.ClassList(this);
        }
    });

    // ^^^ iOS 4 WebView does not support HTMLElement.classList



    ///////////////////////////////////////////////////////////////////////////
    // Starting Actuation

    //listSpecifier, eventName, func, root
    listSpecifier = selector.addEventListener( listSpecifier, actuator.startEvent, function(e){

        actuator.updateCurrentTarget( e.currentTarget, activeClass );

        if( onActuateStart ) {
            onActuateStart.call( this, e);
        }

        if( actuator.touchSupported ) {
            //e.currentTarget.startActuationX = e.touches[0].clientX;
            e.currentTarget.startActuationY = e.touches[0].clientY;

            e.stopPropagation();
        }

    } );

    ///////////////////////////////////////////////////////////////////////////
    // Committing Actuation
    listSpecifier = selector.addEventListener( listSpecifier, actuator.commitEvent, function(e){

        if( null == actuator.currentTarget ) {
            return;
        }

        actuator.updateCurrentTarget( null, activeClass );

        if( onActuateCommit ) {
            onActuateCommit.call( this, e );
        }

    } );

    ///////////////////////////////////////////////////////////////////////////
    // Cancelling Actuation
    if( actuator.touchSupported ) {

        listSpecifier = selector.addEventListener( listSpecifier, "touchmove", function(e){


            if( null == actuator.currentTarget ) {
                return;
            }

//            var horizontalTravel = actuator.currentTarget.startActuationX - e.pageX;
//
//            if( -20 > horizontalTravel || 20 < horizontalTravel ) {
//                actuator.updateCurrentTarget( null, activeClass );
//                return;
//            }

//        e.currentTarget.startActuationY = e.touches[0].clientY;

            var verticalTravel = actuator.currentTarget.startActuationY - e.touches[0].clientY;


            if( -15 > verticalTravel || 15 < verticalTravel ) {
                actuator.updateCurrentTarget( null, activeClass );
                return;
            }

        });


    } else { // browser ?

        listSpecifier = selector.addEventListener( listSpecifier, "mouseout", function(e){

            actuator.updateCurrentTarget( null, activeClass );

        });
    }


};


// ^^^ 20F6A984-B4D1-45B4-9312-0CA7FD888FE7 file_preprocessor.application.j2se.jsmin.JavascriptMinify
