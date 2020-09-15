export type State = {
    colState: {
        [index: number]: number;
    };
    rowState: {
        [index: number]: number;
    };

    dataState: {
        [index: string]: string;
    };

    fontWeight?: string;
    fontStyle?: string;
    textDecoration?: string;
    textAlign?: "left" | "center" | "right";
    currentText?: string;
    title: string;
    id?: string;
    creationDate?: string;
    [prop: string]: any;
};
