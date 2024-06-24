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
                <div className="w-3/4 mx-auto bg-gray-500 flex flex-row items-center justify-start p-4 gap-6">
                    <div>Logo here</div>
                    <div>Hjem</div>
                    <div>Elever</div>
                    <div>Logg</div>
                </div>
            </header>
            <div className="flex-grow flex items-center justify-center">
                <main className="w-3/4 h-3/4 bg-gray-400 flex">
                    <div>asdf</div>
                </main>
            </div>
        </div>
    );
}
