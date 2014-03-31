var assert = require('assert');
var odata = require("../odata");

describe('odata.parser', function () {
    /*
    it( 'should NOT parse binary with X', function() {
        var ast = parser.parse("X'1a2B3c4D");

        assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
        assertDeepEqual( ast.toJSON(), [1,10,2,11,3,12,4,13], 'Binary values should return a Buffer with the correct values' );
    } );
    */
    describe( 'rule binary', function() {
        var parser = odata.createParser( { startRule: "binary" } );
        it( 'should parse empty binary', function() {
            var ast = parser.parse("binary''");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), '', 'Empty binary value should return empty Buffer' );
        } );
        it( 'should parse binary "f"', function() {
            var ast = parser.parse("binary'Zg=='");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'f', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "f" without pad', function() {
            var ast = parser.parse("binary'Zg'");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'f', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "fo"', function() {
            var ast = parser.parse("binary'Zm8='");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'fo', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "foo" without pad', function() {
            var ast = parser.parse("binary'Zm9v'");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'foo', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "foob"', function() {
            var ast = parser.parse("binary'Zm9vYg=='");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'foob', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "fooba"', function() {
            var ast = parser.parse("binary'Zm9vYmE='");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'fooba', 'Binary values should return a Buffer with base64 decoded values' );
        } );
        it( 'should parse binary "foobar"', function() {
            var ast = parser.parse("binary'Zm9vYmFy'");

            assert( ast instanceof Buffer, 'Binary values should return instance of Buffer' );
            assert.equal( ast.toString(), 'foobar', 'Binary values should return a Buffer with base64 decoded values' );
        } );
    } );
    describe( "rule dateValue", function() {
        var parser = odata.createParser( { startRule: 'dateValue' } );
        it( 'should parse date in URL or body', function() {
            var ast = parser.parse("2012-09-03");

            console.log( 'ast', ast );
            assert( ast instanceof Date, 'Date values should return instance of Date' );
            assert.equal( ast.toISOString(), '2012-09-03T00:00:00.000Z' );
        } );
        it( 'should parse date', function() {
            var ast = parser.parse("2012-09-20");

            console.log( 'ast', ast );
            assert( ast instanceof Date, 'Date values should return instance of Date' );
            assert.equal( ast.toISOString(), '2012-09-20T00:00:00.000Z' );
        } );
        it( 'should parse date with year zero', function() {
            var ast = parser.parse("0000-01-01");

            console.log( 'ast', ast );
            assert( ast instanceof Date, 'Date values should return instance of Date' );
            assert.equal( ast.toISOString(), '0000-01-01T00:00:00.000Z' );
        } );
        it( 'should parse negative date', function() {
            var ast = parser.parse("-1000-04-01");

            console.log( 'ast', ast );
            assert( ast instanceof Date, 'Date values should return instance of Date' );
            assert.equal( ast.toISOString(), '-001000-04-01T00:00:00.000Z' );
        } );
    } );
} );
