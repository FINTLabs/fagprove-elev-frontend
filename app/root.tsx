import {json, Link, Links, Meta, Outlet, Scripts, ScrollRestoration} from "@remix-run/react";
import "./tailwind.css";
import '@navikt/ds-css'
import {LoaderFunction, MetaFunction} from "@remix-run/node";
import {Box, Button} from "@navikt/ds-react";
import {LeaveIcon} from "@navikt/aksel-icons";
import {useLoaderData} from "react-router";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export const loader: LoaderFunction = async ({request}) => {
    const username = request.headers.get("x-fullname") || "brukernavn";
    return json({username});
};

export function Layout({children}: { children: React.ReactNode }) {
    const {username} = useLoaderData<typeof loader>();

    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <Meta/>
            <Links/>
        </head>
        <body className="w-screen h-screen flex flex-col">
        <div className="flex flex-col flex-grow">
            <Box shadow="xsmall" className="w-full flex h-20 justify-center">
                <div className="w-3/4 mx-auto flex flex-row items-center p-4 justify-between">
                    <div className="flex flex-row gap-2">
                        <div>
                            <img src={"novari.png"} alt="Novari Logo" className="h-12"/>
                        </div>
                        <Link to="/">
                            <Button>Elever</Button>
                        </Link>
                        <Link to="/log">
                            <Button>Log</Button>
                        </Link>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <div>{username}</div>
                        <Button><LeaveIcon/></Button>
                    </div>
                </div>
            </Box>
            <Box borderRadius="large" shadow="xsmall" className="mx-auto m-10 w-3/4 h-1/2 flex-grow">
                {children}
            </Box>
        </div>
        <footer className="bg-gray-800 text-white py-8 mt-auto">
            <div className="w-3/4 mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <p>&copy; {new Date().getFullYear()} Novari. Alle rettigheter reservert.</p>
                    <p>Tilgjengelighetserklæring (...)</p>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <Link to="/" className="hover:underline">Hjem</Link>
                    <Link to="https://novari.no" className="hover:underline">novari.no</Link>
                    <a href="https://github.com/FINTLabs" target="_blank" rel="noopener noreferrer">
                        <img src="/github.png" alt="Github" className="h-6"/>
                    </a>
                    <a href="https://www.linkedin.com/company/novari-iks" target="_blank" rel="noopener noreferrer">
                        <img src="/linkedin.png" alt="LinkedIn" className="h-6"/>
                    </a>
                </div>
            </div>
        </footer>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}

export default function App() {
    return <Outlet/>;
}
