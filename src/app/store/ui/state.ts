export default <UiState>{
    darkMode: false,
    navbarVariant: 'navbar-light',
    sidebarSkin: 'sidebar-light-success',
    menuSidebarCollapsed: true,
    controlSidebarCollapsed: true
    // screenSize: calculateWindowSize(window.innerWidth)
};

export interface UiState {
    darkMode: boolean;
    menuSidebarCollapsed: boolean;
    controlSidebarCollapsed: boolean;
    navbarVariant: string;
    sidebarSkin: string;
    screenSize: any;
}