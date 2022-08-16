export function edge(u, v, w) {
    this.u = u
    this.v = v
    this.w = w
    this.visited = false;
    this.getU = function () {
        return this.u
    }
    this.getV = function () {
        return this.v
    }
    this.getWeight = function () {
        return this.w
    }
    this.setVisited = function (tf) {
        this.visited = tf
    }
    this.getVisited = function () {
        return this.visited
    }
}