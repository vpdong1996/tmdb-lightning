import { Img, Lightning, Router, Utils } from "@lightningjs/sdk";
import { getImgUrl } from "../../lib/tools";

export default class Item2 extends Lightning.Component {

    static _template() {
        return {
            w: Item2.width, h: Item2.height, alpha: 1,
            transitions: {
                alpha: { duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)' }
            },
            Image: {
                w: Item2.width, h: Item2.height,
                transitions: {
                    alpha: { duration: 0.3 }
                }
            },
        };
    }

    _init() {
    }

    set focusedItem(v) {
        this._focusedItem = v;
    }

    set item(v) {
        this._item = v;

        const content = this.tag("Image");
        if (this._item.poster !== null) {
            const image = getImgUrl(this._item.poster, 500);
            content.texture = Img(image).contain(342, 513);
        } else {
            content.src = Utils.asset("images/placeholder.png");
        }
    }

    set index(v) {
        this._index = v;
    }

    get configIndex() {
        return this.parent.configIndex;
    }

    _handleEnter() {
        this.fireAncestors("$selectItem", { item: this._item });
    }

    static get width() {
        return 342;
    }

    static get height() {
        return 513;
    }

    static get offset() {
        return 0;
    }

}