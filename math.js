(function(){
    APP.math = {
        sum:function(){
            var num, sum = 0;
            for(var i = 0; i < arguments.length; i++){
                num = APP.stringAnalyzer("=("+arguments[i] + ")");
                sum = sum + num;
            }
            return sum;
        },
        multiply:function(){
            var product = 1;
            for(var i = 0; i < arguments.length; i++){
                num = APP.stringAnalyzer("=("+arguments[i] + ")");
                product = product * Number(arguments[i]);
            }
            return product;
        },
        isOperator:function(c){
            return c==='+'||c==='-'||c==='/'||c==='*'||c==='^';
        },
        append:function(){
            var appended ='';
            for(var i = 0; i < arguments.length; i++){
                appended = appended = arguments[i];
            }
            return appended;
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