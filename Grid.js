APP.sheetGrid = (function () {
    var focus = {
        xi: 0,
        xf: 50,
        yi: 0,
        yf: 50
    };
    var grid = {};
    var keepFocus = {};
    return {
        updateCell: function (elem) {
            var c, location = elem.getAttribute("cell-id");
            if (typeof grid[location] === 'undefined') {
                c = new APP.Cell(location, elem.innerHTML);
                c.setElem(elem);
                grid[location] = c;
            } else {
                c = grid[location];
                c.updateContent(elem.innerHTML);
            }
            return c.getvalue();
        },
        createCell: function (elem) {
            var location = elem.getAttribute("cell-id");
            if (typeof grid[location] === 'undefined') {
                c = new APP.Cell(location, elem.innerHTML);
                c.setElem(elem);
                grid[location] = c;
                return c;
            }
            return grid[location];
        },
        getCellHidden: function (location) {
            if (typeof  grid[location] !== 'undefined') {
                return grid[location].getContents();
            } else {
                return '';
            }
        },
        getCell: function (location) {
            return grid[location];
        },
        highlightLocation: function (elem) {
            var id = elem.getAttribute('cell-id');
            var row = document.getElementById("r-" + id.substring(0, id.indexOf(":")));
            var col = document.getElementById("c-" + id.substring(id.indexOf(":") + 1, id.length));
            row.classList.add('highlight');
            col.classList.add('highlight');
        },
        removeHighlightLocation: function (elem) {
            var row, col, id = elem.getAttribute('cell-id');
            row = document.getElementById("r-" + id.substring(0, id.indexOf(":")));
            col = document.getElementById("c-" + id.substring(id.indexOf(":") + 1, id.length));
            row.classList.remove('highlight');
            col.classList.remove('highlight');
        },
        keepFocused: function (elem) {
            var id = elem.getAttribute('cell-id');
            row = document.getElementById("r-" + id.substring(0, id.indexOf(":")));
            col = document.getElementById("c-" + id.substring(id.indexOf(":") + 1, id.length));
            row.classList.add('focused');
            col.classList.add('focused');
        },
        removeFocus: function (elem) {
            var id = elem.getAttribute('cell-id');
            var row = document.getElementById("r-" + id.substring(0, id.indexOf(":")));
            var col = document.getElementById("c-" + id.substring(id.indexOf(":") + 1, id.length));
            row.classList.remove('focused');
            col.classList.remove('focused');
        }
    }
})();