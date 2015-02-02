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
    APP.stringAnalyzer = function (contents,cell) {
        if (contents.substr(0, 1) !== '=') {
            return contents
        }
        //TODO currently just for show, need to actually make this functional
        //account for: no command (just operations) and linking other cells
        var command, vals, i, subContents, index;
        index = contents.indexOf("(");
        command = contents.substring(1,index);
        subContents = contents.substring(index+1,contents.indexOf(")"));
        vals = subContents.split(",");
        for(i = 0; i < vals.length; i++){
            index = vals[i].indexOf(":");
            if(index !== -1){
                c = APP.sheetGrid.getCell(vals[i]);
                if(typeof c !== 'undefined'){
                    c.addListener(cell);
                    vals[i] = c.getvalue();
                }
            }
        }
        return commands[command].apply(this,vals);
    };
})();