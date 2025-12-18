class SegmentTree {
    constructor(prices) {
        this.n = prices.length;
        this.tree = new Array(4 * this.n).fill(Infinity);
        this.prices = prices;
        this._build(0, 0, this.n - 1);
    }

    _build(node, start, end) {
        if (start === end) {
            this.tree[node] = this.prices[start];
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;
            
            this._build(leftChild, start, mid);
            this._build(rightChild, mid + 1, end);
            
            this.tree[node] = Math.min(this.tree[leftChild], this.tree[rightChild]);
        }
    }

    query(l, r) {
        return this._queryHelper(0, 0, this.n - 1, l, r);
    }

    _queryHelper(node, start, end, l, r) {
        if (r < start || end < l) return Infinity; 
        if (l <= start && end <= r) return this.tree[node]; 

        const mid = Math.floor((start + end) / 2);
        const p1 = this._queryHelper(2 * node + 1, start, mid, l, r);
        const p2 = this._queryHelper(2 * node + 2, mid + 1, end, l, r);
        
        return Math.min(p1, p2);
    }
}

module.exports = SegmentTree;