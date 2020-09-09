import { Value } from "./toolbar.types";
import { State } from "core/stateTypes";

export function createToolbar(state: State) {
    const buttons: Array<{
        icon: string;
        active: boolean;
        value: Value;
    }> = [
        {
            icon: "format_align_left",
            active: state.textAlign === "left",
            value: {
                textAlign: "left",
            },
        },
        {
            icon: "format_align_center",
            active: state.textAlign === "center",
            value: {
                textAlign: state.textAlign === "center" ? "left" : "center",
            },
        },
        {
            icon: "format_align_right",
            active: state.textAlign === "right",
            value: {
                textAlign: state.textAlign === "right" ? "left" : "right",
            },
        },
        {
            icon: "format_bold",
            active: state.fontWeight === "bold",
            value: {
                fontWeight: state.fontWeight === "bold" ? "normal" : "bold",
            },
        },
        {
            icon: "format_italic",
            active: state.fontStyle === "italic",
            value: {
                fontStyle: state.fontStyle === "italic" ? "normal" : "italic",
            },
        },
        {
            icon: "format_underline",
            active: state.textDecoration === "underline",
            value: {
                textDecoration:
                    state.textDecoration === "underline" ? "none" : "underline",
            },
        },
    ];

    const toolBarContent = buttons.map(({ icon, active, value }) => {
        return new ToolBarButton(icon, active, value).toHTML();
    });

    return /*html*/ `
        <div class="buttons">
            ${toolBarContent.join(" ")}
        </div>
   `;
}

class ToolBarButton {
    iconName: string;
    active: boolean;
    value: Value;

    constructor(iconName: string, active: boolean, value: Value) {
        this.iconName = iconName;
        this.active = active;
        this.value = value;
    }

    toHTML() {
        const meta = `
            data-type="button"  
            data-value='${JSON.stringify(this.value)}'
        `;

        return /*html*/ `
            <div 
            class="buttons__btn ${this.active ? "active" : ""}"
            ${meta}
            >
                <i class="material-icons" ${meta} >${this.iconName}</i>
            </div>
        `;
    }
}
