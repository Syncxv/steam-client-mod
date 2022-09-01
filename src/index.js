import * as FileManager from './util/file.js';

const main = async () => {
    FileManager.isFriendsJsBackedUp();
};

main().catch((err) => console.error(err));
