import "./scss/main.scss";

const timeout = (ms) => {
    return new Promise((r) => {
        setTimeout(r, ms);
    });
};

const log = async () => {
    await timeout(4000);

    console.log("after 4 seconds");
};

log();
