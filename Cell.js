APP.Cell = (function(pid, pcontents){
    var contents;
    var shownText;
    var listeners = {};
    var id = pid;
    var notifiyListeners = function(){
        var keys = Object.keys(listeners);
        var i;
        for(i = 0; i < keys.length; i+=1){
            listeners[keys[i]].updateNotification(cell);
        }
    };
    var cell = {
        isCell:true,
        setID:function(i){
            id = i;
        },
        getID:function(){
          return id;
        },
        getContents:function(){
            return contents;
        },
        updateContent:function(s){
            contents = s;
            notifiyListeners();
            shownText = APP.stringAnalyzer(s);
        },
        getShownText:function(){
            return shownText;
        },
        updateShownText:function(s){
            shownText = s;
        },
        addListener:function(listener){
            listeners[listener.getID()]= listener;
        },
        removeListener:function(listener){
            delete listeners[listener.id];
        },
        storeCell:function(){
           return JSON.stringify({
                contents:contents,
                id:id,
                listeners:listeners,
                shownText:shownText
            });
        },
        retreiveCell:function(c){
            var obj = JSON.parse(c);
            listeners = obj.listeners;
            contents = obj.contents;
            id = obj.id;
            shownText = obj.shownText;
        },
        updateNotification:function(updatedCell){
            //TODO
        }
    };
    cell.updateContent(pcontents);
    return cell;
});