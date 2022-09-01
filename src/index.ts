import * as FileManager from './util/file';

const main = async () => {
    FileManager.backupFriendJs();
};

main().catch((err) => console.error(err));
