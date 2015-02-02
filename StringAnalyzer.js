(function() {
    var commands = {
        sum:function(){
            var sum = 0;
            for(var i = 0; i < arguments.length; i++){
                sum = sum + Number(arguments[i]);
            }
            return sum;
        },
        multiply:function(){
            var product = 1;
            for(var i = 0; i < arguments.length; i++){
                product = product * Number(arguments[i]);
            }
            return product;
        }
    };
    APP.stringAnalyzer = function (contents) {
        if (contents.substr(0, 1) !== '=') {
            return contents
        }
        var command = contents.substring(1,contents.indexOf("("));
        var vals, subContents = contents.substring(
            contents.indexOf("(")+1,contents.indexOf(")"));
        vals = subContents.split(",");
        return commands[command].apply(this,vals);
    };
})();