const main = async () => {
    console.log('what the fuck');
    const windowsApp = (await import('windows-app')).default;
    console.log(windowsApp);
    const { select, close } = await windowsApp('Microsoft.WindowsCalculator_8wekyb3d8bbwe!App'); // Calculator app
    console.log(select);
    await select.name_('One').click();
    await select.name_('Plus').click();
    await select.name_('Two').click();
    await select.name_('Equals').click();
    const result = Number((await select.accessibilityId('CalculatorResults').getText()).replace('Display is', ''));

    console.log(`The result of 1 + 2 is ${result}`);
    //=> "The result of 1 + 2 is 3"

    await close();
};

main().catch((err) => console.error(err));
