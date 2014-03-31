var PEG = require( 'pegjs' );
var fs = require( 'fs' );


function createParser( conf ) {
    conf = conf || {};
    startRule = conf.startRule || "start";

    var code = "{ function makeInteger( o ) { return parseInt( o.join( \"\" ), 10 ); } }\n";

    var grammar = code + "startRule = " + startRule + "\n" + fs.readFileSync( "odata.peg" );
    try {
        var parser = PEG.buildParser( grammar );
    }
    catch ( e ) {
        console.error( 'parser error' );
        console.error( e, e.line );
    }

    return parser;
}

/*
function parse( value ) {
    // var ast = parser.parse( "http://services.odata.org/OData/OData.svc/Categories(1)/Products" );
    var ast = parser.parse( "123451" );
}
*/

exports.createParser = createParser;
