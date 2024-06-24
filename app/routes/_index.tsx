import type {MetaFunction} from "@remix-run/node";

export const meta: MetaFunction = () => {
    return [
        {title: "New Remix App"},
        {name: "description", content: "Welcome to Remix!"},
    ];
};

export default function Index() {
    return (
        <div className="w-screen h-screen bg-gray-200 flex flex-col">
            <header className="w-full bg-gray-400 flex h-20 justify-center">
                <div className="w-3/4 mx-auto bg-gray-500 flex flex-row items-center p-4 justify-between">
                    <div className="flex flex-row gap-6">
                        <div>Logo here</div>
                        <h1>Hjem</h1>
                        <h1>Elever</h1>
                        <h1>Logg</h1>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div>Brukernavn</div>
                        <div>Logg ut icon</div>
                    </div>
                </div>
            </header>
            <main className="mx-auto m-10 w-3/4 h-1/2 bg-gray-400 flex">

            </main>
        </div>
    );
}
