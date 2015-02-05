(function () {
    APP.cellMethods = {
        removeBox: function () {
            if(this.suggestionBox !== undefined) {
                this.suggestionBox.destroyBox();
                this.suggestionBox = undefined;
            }
        },
        createBox:function(){
            if(this.suggestionBox === undefined) {
                this.suggestionBox = new APP.SuggestionBox();
                this.suggestionBox.createBox(this);
            }
        },
        suggestionToggleOff:function(){
            if(this.suggestionBox !== undefined) {
                APP.cellMethods.removeBox.apply(this);
            }
        },
        updateSuggestions:function(){
          if(this.suggestionBox !== undefined){
              this.suggestionBox.updateSuggestions();
          }
        },
        storeButDontProcess:function(){
            var c = APP.sheetGrid.getCell(this.getAttribute('cell-id'));
            if (typeof c === 'undefined') {
                this.innerHTML = APP.sheetGrid.updateCell(this);
            }
            APP.sheetGrid.getCell(this.getAttribute('cell-id')).storeContents(this.innerHTML);
        },
        revealCellContents:function(){
            var c = APP.sheetGrid.createCell(this);
            this.innerHTML = c.getContents();
        }
    };
})();

