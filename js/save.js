let save={
    install(vue,params){
        vue.prototype.save=function(attr,val){
            sessionStorage[attr]=JSON.stringify(val);
        };
        vue.prototype.del=function(attr){
            sessionStorage.removeItem(attr);
        };
        vue.prototype.get=function(attr1,attr2){
           if(attr2){
               return sessionStorage[attr1]?JSON.parse(sessionStorage[attr1])[attr2]:"";
           }else{
            return sessionStorage[attr1];
           }
        }
    }
};