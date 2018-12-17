function calcDistance(X1, Y1, X2, Y2, R1, R2) {

    var dX = X1 - X2;
    var dY = Y1 - Y2;
    var dist = Math.sqrt((dX * dX) + (dY * dY));
    if (R1 + R2 > dist) {
        return true;
    }
    return false;
}