var nnbSvg = function(element){
    this.target = document.getElementById(element);
    this.options = {
        laneHeight: 100,
        circleRadius: 15,
        circleMarginLeft: 10
    }
};

nnbSvg.prototype.addCircle = function (laneIdx, circleIdx, totalCircles, clickFn) {
    var startX = ((this.target.clientWidth)-(totalCircles*(2*this.options.circleRadius + this.options.circleMarginLeft)))/2;
    var centerX = startX + circleIdx*2*this.options.circleRadius + (circleIdx+1)*this.options.circleMarginLeft + this.options.circleRadius;
    var centerY = (laneIdx)* this.options.laneHeight + this.options.circleRadius+10;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centerX);
    circle.setAttribute("cy", centerY);
    circle.setAttribute("r",  this.options.circleRadius);
    circle.setAttribute("fill", 'blue');    
    this.target.appendChild(circle);   
    //return {'x': centerX, 'y': centerY};
    return circle;
}

nnbSvg.prototype.addLane = function () {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", "g");
    var y = this.target.getElementsByTagNameNS("http://www.w3.org/2000/svg", "g").length;;
    rect.setAttribute("transform", "translate(0 "+(y*this.options.laneHeight)+")");
    rect.setAttribute("idx", y);
    this.target.appendChild(rect);
    return rect;
}

nnbSvg.prototype.addCircleToLane = function (lane){
    var circles = lane.getElementsByTagNameNS("http://www.w3.org/2000/svg","circle");
    var totalCircles = circles.length;
    var startX = ((this.target.clientWidth)-((totalCircles+1)*2*this.options.circleRadius + totalCircles*this.options.circleMarginLeft))/2;
    for(var circleIdx=0;circleIdx<totalCircles;circleIdx++){
        var centerX = startX + circleIdx*2*this.options.circleRadius + (circleIdx+1)*this.options.circleMarginLeft + this.options.circleRadius;
        circles[circleIdx].setAttribute("cx", centerX);
    }
    var centerX = startX + circleIdx*2*this.options.circleRadius + (circleIdx+1)*this.options.circleMarginLeft + this.options.circleRadius;
    var centerY = this.options.circleRadius+10;
    var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centerX);
    circle.setAttribute("cy", centerY);
    circle.setAttribute("r",  this.options.circleRadius);
    circle.setAttribute("fill", 'blue');    
    lane.appendChild(circle);   
    return circle;
}

nnbSvg.prototype.drawLine = function (circle1, circle2){
    var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1",circle1.x);
    line.setAttribute("y1",circle1.y);
    line.setAttribute("x2",circle2.x);
    line.setAttribute("y2",circle2.y);
    line.setAttribute("stroke",'black');
    line.setAttribute("stroke-width",'1');
    this.target.appendChild(line);
}