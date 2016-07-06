var nnb = {
    output: new nnbSvg('svg'),
    autoRedraw: true,
    Network: function(opt){ 
        this.layers = [];
        this.options = Object.assign({
            autoRedraw: true
        }, opt);
    },
    Layer: function (nUnits) {
        this.units = [];
        this.element = null;
        this.drawing = null;
        if(nUnits){            
            for(var i = 0;i<nUnits;i++){
                this.addUnit();
            }
        }
    },
    Unit: function () {
        this.element = null;
        this.parent = null;
    },
    create: function(def){
        if(typeof(def) == 'object'){
            var net = new nnb.Network();
            for(var i in def){
                if(typeof(def[i]) == 'number'){
                    net.addLayer(def[i]);
                }
            }
            return net;
        }
    }
}
nnb.Network.prototype.addLayer = function (nUnits) {      
    var l = new nnb.Layer(nUnits);
    this.layers.push(l);
    if(this.options.autoRedraw)
        l.draw();
};
nnb.Network.prototype.draw = function (startFrom=0) {
    var canvas = this.drawing;
    for(var i = startFrom;i<this.layers.length;i++){
        this.layers[i].draw();
    }
};
nnb.Layer.prototype.addUnit = function () {
    var u = new nnb.Unit();
    u.parent = this;
    this.units.push(u);
    if(nnb.autoRedraw && u.parent.element)
        u.draw();
};
nnb.Layer.prototype.draw = function () {
    this.element = nnb.output.addLane();
    for(var j=0;j<this.units.length;j++){
            this.units[j].draw();
            // if(i > 0){
            //     for(var z=0;z<this.layers[i-1].units.length;z++){
            //         canvas.drawLine(this.layers[i-1].units[z].pos, this.layers[i].units[j].pos)
            //     }
            // }
        }
};

nnb.Unit.prototype.draw = function () {
    this.element = nnb.output.addCircleToLane(this.parent.element);
}
nnb.Unit.prototype.click = function () {
    var menu = document.getElementById('contextMenu');
    menu.setAttribute('style', 'top:'+this.pos.y+'px;left:'+this.pos.x+'px;');
}