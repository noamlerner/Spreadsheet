(function(){
    APP.math = {
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
        },
        isOperator:function(c){
            return c==='+'||c==='-'||c==='/'||c==='*'||c==='^';
        }
    };
    APP.math["+"] = function(){
        var sum = 0;
        for(var i = 0; i < arguments.length; i++){
            sum = sum + Number(arguments[i]);
        }
        return sum;
    };
    APP.math["*"] = function(){
        return Number(arguments[0]) * Number(arguments[1]);
    };
    APP.math["/"] = function(){
        return Number(arguments[0]) / Number(arguments[1]);
    };
    APP.math["-"] = function(){
        return Number(arguments[0]) - Number(arguments[1]);
    };
    APP.math["^"] = function(){
        return Math.pow(Number(arguments[0]), Number(arguments[1]));
    };
})();