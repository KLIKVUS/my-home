import { Outlet, useMatches } from "react-router-dom";

import Header from "../../components/Header";
import Main from "../../components/Main";
import Footer from "../../components/Footer";


function UserPage() {
    const matches = useMatches();
    const handle = matches[matches.length - 1].handle;

    return (
        <>
            <Header headerTitle={handle.headerTitle} headerSubtitle={handle.headerSubtitle} panelIcon={handle.panelIcon} />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    );
}

export default UserPage;
