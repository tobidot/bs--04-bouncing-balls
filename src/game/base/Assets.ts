import { AssetManager } from "../../library";
import * as assets from "../../../assets";

export function registerAssets(asset_manager: AssetManager) {
    asset_manager.addImage("ball-blue", assets.ball_blue);
    asset_manager.addImage("ball-red", assets.ball_red);
    asset_manager.addImage("ball-green", assets.ball_green);
    asset_manager.addImage("ball-cyan", assets.ball_cyan);
}