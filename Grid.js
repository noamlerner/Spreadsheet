APP.sheetGrid = (function(){
    var focus ={
        xi:0,
        xf:50,
        yi:0,
        yf:50
    };
    var grid = {};
    return {
        updateCell:function(location, contents){
            var c;
            if(typeof grid[location] === 'undefined') {
                c = new APP.Cell(location, contents);
                grid[location] = c;
            } else {
                c = grid[location];
                c.updateContent(contents);
            }
            return c.getShownText();
        },
        getCellHidden:function(location){
            return grid[location].getContents();
        }
    }
})();