import * as FileManager from './util/file';

const main = async () => {
    FileManager.isFriendsJsBackedUp();
};

main().catch((err) => console.error(err));
