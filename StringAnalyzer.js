(function() {
    var commandsHandler = function(contents, cell){
        var command, vals, i, subContents, index;
        index = contents.indexOf("(");
        command = contents.substring(1,index);
        subContents = contents.substring(index+1,contents.indexOf(")"));
        vals = subContents.split(",");
        for(i = 0; i < vals.length; i++){
            index = vals[i].indexOf("|");
            if(index !== -1){
                c = APP.sheetGrid.getCell(vals[i].substring(1,vals[i].length-1));
                if(typeof c !== 'undefined'){
                    c.addListener(cell);
                    vals[i] = c.getvalue();
                }
            }
        }
        return APP.math[command].apply(this,vals);
    };
    var noCommandsHandler = function(contents, cell){
        return decomposeString(contents,cell)
    };
    APP.stringAnalyzer = function (contents,cell) {
        if (contents.substr(0, 1) !== '=') {
            return contents
        }
        if(contents.substr(1,1) === '('){
            return noCommandsHandler(contents,cell);
        } else {
            return commandsHandler(contents,cell);
        }

        //TODO currently just for show, need to actually make this functional
        //account for: no command (just operations) and linking other cells

    };
    var decomposeString = function (contents,cell) {
        var parens = [], numbers = {},operators = [], i, j;
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
            } else if(APP.math.isOperator(contents[i])){
                operators.push({
                    index: i,
                    operator: contents.substr(i, 1)
                });
            } else if(contents[i] ==='|'){
                var ind = contents.indexOf('|',i+1);
                c = APP.sheetGrid.getCell(contents.substring(i+1,ind));
                if(typeof c !== 'undefined'){
                    c.addListener(cell);
                    numbers[i] = {num:Number(c.getvalue())};
                }
                i = ind;
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
        return numbers[Object.keys(numbers)[0]].num;

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
                };
                numbers[index] = {
                    num: APP.math[operators[i].operator].apply(this,args),
                    length:len
                };
                operators.splice(i, 1);
                i = i -1;
                args = [];
            }
        }
    };
})();