import { DisjointSetNode } from "./DisjointSetNode";
import { HashTable } from "./hashtable";

export function DisjointSet(list) {
    this.ds = new HashTable();
    for (let e of list) {
        this.ds.add(e, new DisjointSetNode(e))
    }

    //find parent of data
    this.find = function (data) {
        return this.findHelper(this.ds.getValue(data)).getData()
    }
    this.findHelper = function (curr) {
        let parent = curr.getParent()
        if (parent === curr) {
            return curr
        } else {
            parent = this.findHelper(curr.getParent())
            curr.setParent(parent)
            return parent
        }
    }
    //s1,s2: set1 and 2
    this.union = function (s1, s2) {
        let f = this.ds.getValue(s1)
        let s = this.ds.getValue(s2)
        let fp = this.findHelper(f)
        let sp = this.findHelper(s)
       
        if (fp !== sp) {
            
            if (fp.getRank() < sp.getRank()) {
                fp.setParent(sp)
            } else {
                sp.setParent(fp)
                if (sp.getRank() === fp.getRank()) {
                    fp.setRank(fp.getRank() + 1)
                }
            }
        }
    }
}