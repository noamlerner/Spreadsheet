APP.sheetGrid = (function(){
    var focus ={
        xi:0,
        xf:50,
        yi:0,
        yf:50
    };
    var grid = {};
    return {
        updateCell:function(elem){
            var c, location = elem.getAttribute("cell-id");
            if(typeof grid[location] === 'undefined') {
                c = new APP.Cell(location, elem.innerHTML);
                c.setElem(elem);
                grid[location] = c;
            } else {
                c = grid[location];
                c.updateContent(elem.innerHTML);
            }
            return c.getvalue();
        },
        getCellHidden:function(location){
            if (typeof  grid[location] !== 'undefined') {
                return grid[location].getContents();
            } else {
                return '';
            }
        },
        getCell:function(location){
            return grid[location];
        }
    }
})();