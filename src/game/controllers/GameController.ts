import { KeyboardEvent, KeyboardController, KeyboardHandler, KeyName } from "../../library";
import { Controller } from "../../library/abstract/mvc/Controller";
import { ControllerResponse } from "../../library/abstract/mvc/Response";
import { Game } from "../base/Game";
import { Entity } from "../models/Entity";
import { GameModel } from "../models/GameModel";
import { GameView } from "../views/GameView";

export class GameController implements Controller, KeyboardController {

    public constructor(
        public model: GameModel,
    ) {
    }

    /**
     * Start a new game
     */
    public newGame(): ControllerResponse {
        this.model.restart();
        return null;
    }

    /**
     * @returns true if the game is over
     */
    public isGameOver(): boolean {
        return false;
    }

    /**
     * Update the game state
     * @param delta_seconds 
     * @returns 
     */
    public update(delta_seconds: number): ControllerResponse {
        this.model.update(delta_seconds);
        return null;
    }

    public onKeyUp(event: KeyboardEvent): void {
    }

    public onKeyDown(event: KeyboardEvent): void {
        const kb = window.game.keyboard;
        const is_ctrl_down = kb.getKey(KeyName.Control).is_down;
        if (is_ctrl_down) {
            switch (event.key.name) {
                case KeyName.KeyR:
                    this.newGame();
                    return;
                case KeyName.KeyD:
                    this.model.debug = !this.model.debug;
                    return;
            }
        }
        if (event.key.name === KeyName.Space) {
            const entity = this.model.createEntity("O");
            entity.color = ["red", "green", "blue", "yellow", "orange", "purple"][Math.floor(Math.random() * 6)];
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 100 + 50;
            entity.velocity.x = Math.cos(angle) * speed;
            entity.velocity.y = Math.sin(angle) * speed;
        }
    }
}