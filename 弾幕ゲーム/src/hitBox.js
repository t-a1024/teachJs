function serchHit(a,b) {
    const distanceSquared = Math.pow(a.position.x - b.position.x, 2) + Math.pow(a.position.y - b.position.y, 2);
    const collisionDistanceSquared = Math.pow(a.size + b.size, 2);
    return distanceSquared <= collisionDistanceSquared;
}