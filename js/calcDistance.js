/**
 * fucntion takes six paramaters
 * poisiton of one object X1,Y1
 * positon of other objects X2,Y2
 * distance form the center of the objects to their border R1,R2(radius)
 * calculate the distance between two objects and determine either they are touching one another or not
 * dX = distance between x co-ordinates of the two objects
 * dy = distance between y co-ordinates of the two objects
 * dist = distance between the two objects
 * R1+R2 = sum of the distance of radius of the two objects
 */
calcDistance = (X1, Y1, X2, Y2, R1, R2) => {
    let dX = X1 - X2;
    let dY = Y1 - Y2;
    let dist = Math.sqrt((dX * dX) + (dY * dY));

    if (R1 + R2 > dist) { return true; }
    return false;
}
