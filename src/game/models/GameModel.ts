import { Rect } from "../../library/math/Rect";
import { AABBCollisionProxy, AABBPhysicsEngine } from "../../library/physics/AABBPhysicsEngine";
import { Entity } from "./Entity";

export class GameModel {
    public physics: AABBPhysicsEngine;
    public entities: Entity[] = [];
    public debug: boolean = false;

    constructor(
        public context: CanvasRenderingContext2D,
    ) {
        const screen_box = new Rect(0, 0, context.canvas.width, context.canvas.height);
        this.physics = new AABBPhysicsEngine({
            world_box: screen_box,
            simple_collisions: false,
        });
    }

    /**
     * Reset the game
     */
    public restart() {
        this.physics = new AABBPhysicsEngine({
            world_box: this.physics.options.world_box,
            simple_collisions: false,
        });
        this.entities = [];
        this.debug = false;
    }

    /**
     * Update the logic of the game
     * @param delta_seconds 
     */
    public update(delta_seconds: number) {
        this.physics.update(delta_seconds);
        this.entities.forEach((entity) => {
            entity.update(delta_seconds);
        });
    }

    /**
     * Create a new entity with the given label
     * @param label 
     * @returns 
     */
    public createEntity(label: string): Entity {
        let entity: Entity;
        const position = this.physics.options.world_box.center.cpy();
        const color = ["red", "green", "blue", "cyan"][Math.floor(Math.random() * 4)];
        const image_name = `ball-${color}`;
        this.entities.push(entity = new Entity(
            position,
            window.game.assets.getImage(image_name)
        ));
        entity.physics_id = this.physics.add(new AABBCollisionProxy(
            entity.hitbox,
            entity.velocity,
            entity,
        )).id;
        return entity;
    }
}