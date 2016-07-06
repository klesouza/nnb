var nnbCanvas = function(element){
    this.target = document.getElementById(element);
    this.context = this.target.getContext('2d');
    this.options = {
        laneHeight: 100,
        circleRadius: 15,
        circleMarginLeft: 10
    }
};

nnbCanvas.prototype.addCircle = function (laneIdx, circleIdx, totalCircles) {
    var startX = ((this.target.width)-(totalCircles*(2*this.options.circleRadius + this.options.circleMarginLeft)))/2;
    var centerX = startX + circleIdx*2*this.options.circleRadius + (circleIdx+1)*this.options.circleMarginLeft + this.options.circleRadius;
    var centerY = (laneIdx)* this.options.laneHeight + this.options.circleRadius+10;
    this.context.beginPath();
    this.context.arc(centerX, centerY, this.options.circleRadius, 0, 2 * Math.PI, false);
    this.context.fillStyle = 'green';
    this.context.fill();
    this.context.lineWidth = 1;
    this.context.strokeStyle = '#003300';
    this.context.stroke();
    return {'x': centerX, 'y': centerY};
}

nnbCanvas.prototype.drawLine = function (circle1, circle2){
    this.context.beginPath();
    this.context.moveTo(circle1.x, circle1.y);
    this.context.lineTo(circle2.x, circle2.y);
    this.context.stroke();
}