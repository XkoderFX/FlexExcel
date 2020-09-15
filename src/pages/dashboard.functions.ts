import { DB, records } from "@/index";
import { State } from "core/stateTypes";
import { Store } from "core/store";

export function toHTML({
    id,
    title,
    creationDate,
}: {
    id?: string;
    title: string;
    creationDate?: string;
}) {
    const parsedId = id.split(":")[1];

    return /*html*/ `
        <li class="dashboard__table-item">
            <a href="#excel/${parsedId}" class="dashboard__table-item-name">
                <img src="favicon.svg" alt="" />
                ${title}
            </a>
            <time class="dashboard__table-item-time">${creationDate}</time>
        </li>
    `;
}

export function createRecordsTable(records: State[]) {
    try {
        records.length;
    } catch (error) {
        return /*html*/ `<p> You have not create any table</p>`;
    }

    return /*html*/ `         
    <div class="dashboard__list-info">
        <p>Name</p>
        <p>Creation date</p>
    </div>

    <ul class="dashboard__table-list">
        ${records.map(toHTML).join("")}
    </ul>`;
}
