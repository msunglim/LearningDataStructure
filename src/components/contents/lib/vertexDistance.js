export function vertexDistance(v, d) {
    this.vertex = v
    this.distance = d

    this.getVertex = function(){
        return this.vertex
    }
    this.getDistance = function(){
        return this.distance
    }
}