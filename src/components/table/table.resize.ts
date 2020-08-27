import { DM } from "core/domManager";
import { Info } from "./table.info";

export function resizeHandler(elem: HTMLElement) {
    let updatedSize: number;
    const $resizer = DM(event.target as HTMLElement);
    const $parent = $resizer.closest("[data-type='resizable']");

    $resizer.css({
        opacity: "1",
        zIndex: "1000",
    });

    if (elem.dataset.resize == "col") {
        const height = Info.colsHeight + "px";

        document.onmousemove = (e) => {
            const delta = e.pageX - $parent.boundingRect.right;
            const newWidth = $parent.width + delta;

            $resizer.css({
                right: -delta + "px",
                height,
            });

            updatedSize = newWidth;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            $resizer.css({
                right: "0px",
                height: "24px",
                zIndex: "0",
                opacity: "0",
            });

            $parent.setMinWidth(updatedSize, "px");
        };
    } else if (elem.dataset.resize == "row") {
        const width = Info.rowWidth + "px";

        document.onmousemove = (e) => {
            const delta = e.pageY - $parent.boundingRect.bottom;
            const newHeight = $parent.height + delta;

            $resizer.css({
                bottom: -delta + "px",
                width,
            });

            updatedSize = newHeight;
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;

            $resizer.css({
                bottom: "0px",
                width: "38px",
                zIndex: "0",
                opacity: "0",
            });

            $parent.setMinheight(updatedSize, "px");
        };
    }
}
