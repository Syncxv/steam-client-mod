export const Settings: React.FC<{ themes: [] }> = () => {
    return <form className="DialogBody"></form>;
};

const Theme: React.FC<{}> = () => {
    return <button className="DialogButton _DialogLayout Secondary Focusable" onClick={() => console.log('well')}></button>;
};
