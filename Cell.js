APP.Cell = (function(pid, pcontents){
    var contents, value, elem;
    var listeners = [];
    var id = pid;
    var notifiyListeners = function(){
        var i;
        for(i = 0; i < listeners.length; i+=1){
            listeners[i].updateNotification(cell);
            listeners.pop();
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
            value = APP.stringAnalyzer(s,this);
            notifiyListeners();
        },
        getvalue:function(){
            return value;
        },
        updatevalue:function(s){
            value = s;
        },
        addListener:function(listener){
           listeners.push(listener);
        },
        removeListener:function(listener){
            delete listeners[listener.id];
        },
        storeCell:function(){
           return JSON.stringify({
                contents:contents,
                id:id,
                listeners:listeners,
                value:value
            });
        },
        retreiveCell:function(c){
            var obj = JSON.parse(c);
            listeners = obj.listeners;
            contents = obj.contents;
            id = obj.id;
            value = obj.value;
        },
        updateNotification:function(updatedCell){
            value = APP.stringAnalyzer(contents,this);
            elem.innerHTML = value;
        },
        setElem:function(e){
            elem = e;
        }
    };
    cell.updateContent(pcontents);
    return cell;
});