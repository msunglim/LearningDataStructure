export function vertex(value) {
    this.value = value
    this.x = 0
    this.y = 0
    this.visited = false
    this.getValue = function () {
        return this.value
    }
    this.setX = function (x) {
        this.x = x
    }
    this.setY = function (y) {
        this.y = y
    }
    this.getX = function () {
        return this.x
    }
    this.getY = function () {
        return this.y
    }
    this.setVisited = function(tf){
        this.visited = tf
    }
    this.getVisited = function(){
        return this.visited
    }
}