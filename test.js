(function() {
   var decomposeString = function () {
       var parens = [], numbers = {},operators = [], i, j;
       parens.push({indexOpen:-1,indexClosed:contents.length});
       for (i = 0; i < contents.length; i++) {
           if (contents[i] === '(') {
               parens.unshift({indexOpen: i});
           } else if (contents[i] === ')') {
               for (j = 0; j < parens.length; j++) {
                   if (!parens[j].hasOwnProperty("indexClosed")) {
                       parens[j].indexClosed = i;
                       j = parens.length;
                   }
               }
           } else if (!isNaN(Number(contents[i]))) {
               j = 1;
               while (!isNaN(Number(contents[i + j]))) {
                   j++;
               }
               numbers[i] = {
                   num: Number(contents.substr(i, j)),
                   length: j
               };
               i = i + j - 1;
           } else {
               operators.push({
                   index: i,
                   operator: contents.substr(i, 1)
               });
           }
       }
       operators.sort(function(a,b){
           var assignVal = function(v) {
               switch (v) {
                   case "-":
                       return 0;
                       break;
                   case "+":
                       return 0;
                       break;
                   case "*":
                       return 2;
                       break;
                   case "/":
                       return 2;
                       break;
               }
           };
           return assignVal(b.operator) - assignVal(a.operator);
       });
        for(i = 0; i < parens.length; i++){
            solveExp(parens[i].indexOpen,parens[i].indexClosed,numbers,operators);
        }
       console.log(numbers[Object.keys(numbers)[0]].num);

   };
    var solveExp = function(startIndex, endIndex, numbers,operators){
        var i, j,args =[];
        for (i = 0; i < operators.length;i++){
            if(operators[i].index >= startIndex && operators[i].index <= endIndex){
                var index, len;
                for(j = operators[i].index; j >= startIndex; j-- ){
                    if(typeof numbers[j] !== 'undefined'){
                        args.push(numbers[j].num);
                        index = j;
                        delete numbers[j];
                        j = startIndex-1;
                    }
                }
                for(j = operators[i].index+1; j <= endIndex; j++) {
                    if(typeof numbers[j] !== 'undefined') {
                        args.push(numbers[j].num);
                        len =(j + numbers[j].length) - index;
                        delete numbers[j];
                        j = endIndex+1;
                    }
                }
                numbers[index] = {
                    num:APP.math[operators[i].operator].apply(this,args),
                    length:len
                };
                operators.splice(i, 1);
                i = i -1;
                args = [];
            }
        }
    };
    decomposeString();
})();