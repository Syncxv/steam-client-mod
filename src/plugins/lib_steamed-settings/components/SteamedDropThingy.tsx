export const DropThingy: React.FC<{}> = () => {
    const [isOpen, setOpen] = steamed.Webpack.Common.React.useState(false);
    return (
        <>
            <div className={`steamedDrop ${isOpen ? 'cool' : 'not-cool'}`} onClick={() => setOpen((prev) => !prev)}>
                <div className="cooldropdown">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#ffffff" viewBox="0 0 256 256">
                        <rect width="256" height="256" fill="none"></rect>
                        <polyline
                            points="48 160 128 80 208 160"
                            fill="none"
                            stroke="#ffffff"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="16"
                        ></polyline>
                    </svg>
                </div>
            </div>
            <div className={`contents ${isOpen ? 'show' : 'hide'}`}>some content eh</div>
        </>
    );
};
