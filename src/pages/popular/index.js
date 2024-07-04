import { Lightning, Router } from '@lightningjs/sdk';
import Content from "./Content";
import { Column } from '@lightningjs/ui-components';

let mockData = null;

export default class Popular extends Lightning.Component {

    static _template() {
        return {
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            List: {
                type: Column,
                items: []
            }
        };
    }

    _init() {
        this._index = 0;

        this.listeners = {
            contentHidden: () => {
                this.widgets.menu.hide();
                Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
            }
        };


    }

    _animate(from, to) {
        if (this._listAnimation) this._listAnimation.stop();
        // getPopularContentv2("movie").then(res => {
        //     res.children[0].patch({
        //         y: this.tag("List").items.length * 500
        //     });
        //     res.columnIndex = parseInt(this.tag("List").items.length);
        //     this.content = [...this.tag("List").items, res];
        // });
        this._listAnimation = this.animation({
            duration: 0.2, actions: [
                { t: 'List', p: 'y', v: { 0: { v: from }, 1: { v: to } } },
            ]
        });

        this._listAnimation.start();
    }

    _attach() {
        ["contentHidden", "readyForNavigate"].forEach((event) => {
            this.application.on(event, this.listeners[event]);
        });
    }

    _detach() {
        ["contentHidden", "readyForNavigate"].forEach((event) => {
            this.application.off(event, this.listeners[event]);
        });
    }

    _active() {
        this.widgets.menu.show();
    }

    set content(v) {
        if (v) {
            this.tag("List").patch({
                items: v,
            });
        }
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.tag('List');
    }


    // get selectedList() {
    //     return this.tag("List").children[this._index];
    // }

    $selectItem({ item }) {
        this._item = item;
        Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
    }

    historyState(params) {
        if (params) {
            this.selectedList.index = params.listIndex;
            this.selectedList.resetConfigIndex();
        } else {
            if (this.tag("List").children[this._index]) {
                return { listIndex: this.tag("List").children[this._index].index };
            }
        }
    }

}