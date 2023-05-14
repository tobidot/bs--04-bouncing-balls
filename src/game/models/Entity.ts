import { ImageAsset } from "../../library";
import { Vector2D } from "../../library/math";
import { Rect } from "../../library/math/Rect";
import { PhysicsProxiable, PhysicsProxy } from "../../library/physics/Physics";

export class Entity implements PhysicsProxiable {
    public static next_id = 0;
    public id: number = Entity.next_id++;
    // physics properties
    public hitbox: Rect;
    public velocity: Vector2D = new Vector2D(0, 0);
    public physics_id: number|null = null;
    // rendering properties
    public image: ImageAsset;
    // 

    constructor(
        position: Vector2D,
        image: ImageAsset,
    ) {
        this.image = image;
        this.hitbox = Rect.fromCenterAndSize(position, { x: image.width, y: image.height });
    }

    /**
     * 
     * @param delta_seconds 
     */
    public update(delta_seconds: number) {     
        // do nothing currently handled by the physics engine
    }

    /**
     * 
     * @param other 
     */
    public onCollision(other: PhysicsProxy) {
        // on collision 
    }   
}