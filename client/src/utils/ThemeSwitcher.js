export const ThemeSwitcher = ({ theme, setTheme }) => {
    const handleToggle = () => { setTheme(theme === "green" ? "yellow" : "green"); };

    return (<div> <button onClick={handleToggle}>Toggle theme</button> </div>);
};