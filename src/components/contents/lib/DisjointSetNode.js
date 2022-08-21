export function DisjointSetNode(data){
    this.parent = this;
    this.data = data;
    this.rank = 0;

    this.getParent= function(){
        return this.parent
    }
    this.getData = function(){
        return this.data
    }
    this.getRank = function(){
        return this.rank
    }

    this.setParent=  function(p){
        this.parent = p
    }
    this.setData = function(d){
        this.data= d
    }
    this.setRank = function(r){
        this.rank = r
    }
}